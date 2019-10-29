<template>
  <blank-view>
    <div slot="action" style="text-align: right">
      <a-radio-group v-model="params.stateType[0]">
        <a-radio-button :value="0">待处理</a-radio-button>
        <a-radio-button :value="1">已通过</a-radio-button>
        <a-radio-button :value="2">已拒绝</a-radio-button>
      </a-radio-group>
      <a-range-picker v-model="date" style="margin-left: 16px" />
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      :loading="loading"
      :pagination="false"
    >
      <span slot="desc" slot-scope="text">{{ text | tableEmpty }}</span>
      <span slot="status" slot-scope="text">
        <a-badge v-if="text === 'Agreed'" status="success" />
        <span>{{ text | i18n }}</span>
      </span>
      <span slot="date" slot-scope="text">{{ text | dayjs }}</span>
      <span slot="deal" slot-scope="text">{{ text | dayjs }}</span>
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
import dayjs from 'dayjs'
import { clientManagement } from '@/api/platform'
const columns = [
  {
    title: '发起方',
    dataIndex: 'consumerTenantName'
  },
  {
    title: '备注消息',
    dataIndex: 'cooperationDesc',
    scopedSlots: { customRender: 'desc' }
  },
  {
    title: '状态',
    dataIndex: 'cooperationState',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '申请时间',
    dataIndex: 'applicationTime',
    scopedSlots: { customRender: 'date' }
  },
  {
    title: '处理时间',
    dataIndex: 'dealTime',
    scopedSlots: { customRender: 'deal' }
  }
]
export default {
  name: '',
  data() {
    return {
      params: {
        filter: void 0,
        pageIndex: 1,
        pageSize: 10,
        stateType: [0],
        applyDateStart: void 0,
        applyDateEnd: void 0
      },
      date: [],
      data: void 0,
      total: void 0,
      columns,
      loading: false
    }
  },
  watch: {
    date: {
      handler(val, oldVal) {
        this.params.applyDateStart = dayjs(val[0]).valueOf()
        this.params.applyDateEnd = dayjs(val[1]).valueOf()
      },
      deep: true
    },
    params: {
      handler: 'getData',
      deep: true,
      immediate: true
    }
  },
  methods: {
    getData(params) {
      this.loading = true
      clientManagement.clientApply(params).then(res => {
        // console.log(res)
        this.data = res.items
        this.total = res.totalCount
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
