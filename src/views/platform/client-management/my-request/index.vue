<template>
  <blank-view>
    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      :loading="loading"
      :pagination="false"
    >
      <span slot="desc" slot-scope="text">{{ text | tableEmpty }}</span>
      <span slot="status" slot-scope="text">
        <a-badge v-if="text === 'Waiting_for_response'" status="processing" />
        <span>{{ text | i18n }}</span>
      </span>
      <span slot="date" slot-scope="text">{{ text | dayjs }}</span>
      <span slot="action" slot-scope="record">
        <a href="javascript:;" @click="onDelete(record)">删除</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="onReapply(record)">重新申请</a>
      </span>
    </a-table>
    <div class="pagination" style="text-align: right; margin: 8px 0">
      <a-pagination
        v-model="params.pageIndex"
        :page-size.sync="params.pageSize"
        show-quick-jumper
        show-size-changer
        size="small"
        :total="total"
        :show-total="total => `共计 ${total} 条`"
      />
    </div>
  </blank-view>
</template>

<script>
import { clientManagement } from '@/api/platform'
const columns = [
  {
    title: '客户编号',
    dataIndex: 'consumerTenantCode'
  },
  {
    title: '客户名称',
    dataIndex: 'consumerTenantName'
  },
  {
    title: '备注',
    dataIndex: 'cooperationDesc',
    scopedSlots: { customRender: 'desc' }
  },
  {
    title: '状态',
    dataIndex: 'cooperationState',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '申请日期',
    dataIndex: 'applicationTime',
    scopedSlots: { customRender: 'date' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: '',
  data() {
    return {
      params: {
        pageSize: 10,
        pageIndex: 1
      },
      columns,
      data: void 0,
      loading: false,
      total: 0
    }
  },
  watch: {
    params: {
      handler: 'getData',
      deep: true,
      immediate: true
    }
  },
  methods: {
    getData(params) {
      this.loading = true
      clientManagement
        .myApply(params)
        .then(res => {
          this.data = res.items
          this.total = res.totalCount
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onDelete({ id }) {
      clientManagement.deleteApply(id).then(() => {
        this.$message.success('删除成功')
        this.getData(this.params)
      })
    },
    onReapply({ id, cooperationDesc }) {
      const body = {
        id: id,
        desc: cooperationDesc
      }
      clientManagement.apply(body).then(() => {
        this.$message.success('重新申请成功')
        this.getData(this.params)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
