<template>
  <blank-view>
    <div slot="action" style="display: flex; justify-content: space-between">
      <a-button type="primary" @click="onCreate">
        <a-icon type="plus" style="font-size: 16px" />新建账号
      </a-button>
      <advanced-search advanced />
    </div>
    <div>
      <b-table
        ref="table"
        size="middle"
        :row-key="record => record.id"
        :columns="columns"
        :data="loadData"
        :pagination="{ showTotal: total => `共计 ${total} 条`, showQuickJumper: true }"
      >
        <span slot="active" slot-scope="text">
          <a-badge :status="text ? 'success' : 'error'" />
          <span>{{ text ? '已启用' : '已停用' }}</span>
        </span>
        <span slot="expiry" slot-scope="text">{{ text | expiry }}</span>
        <span slot="create" slot-scope="text">{{ text | dayjs }}</span>
        <span slot="action" slot-scope="record">
          <a @click="onEdit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a v-if="record.isActive" @click="onStop(record.id)">停用</a>
          <a v-else @click="onStart(record.id)">启用</a>
        </span>
      </b-table>
    </div>
    <create-form ref="createForm" />
  </blank-view>
</template>

<script>
import { AdvancedSearch, BTable } from '@/components/index.js'
import CreateForm from './components/CreateForm'
import { tenantService } from '@/api/platform'
import dayjs from 'dayjs'
export default {
  name: '',
  components: {
    AdvancedSearch,
    BTable,
    CreateForm
  },
  filters: {
    expiry(val) {
      if (val === 1000) {
        return '无期限'
      } else {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '租户编号',
          dataIndex: 'code'
        },
        {
          title: '租户名称',
          dataIndex: 'name'
        },
        {
          title: '结束订阅日期',
          dataIndex: 'expiryTime',
          scopedSlots: { customRender: 'expiry' }
        },
        {
          title: '启用',
          dataIndex: 'isActive',
          scopedSlots: { customRender: 'active' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'create' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 查询条件参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return tenantService.tenant(Object.assign(parameter, this.queryParam))
      }
    }
  },
  methods: {
    onCreate() {
      console.log(this.$refs)
      this.$refs.createForm.toggle()
    },
    onEdit(id) {

    },
    onStop(id) {},
    onStart(id) {}
  }
}
</script>

<style lang="less" scoped>
</style>
