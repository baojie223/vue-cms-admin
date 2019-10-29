<template>
  <blank-view>
    <div slot="action" style="display: flex; justify-content: space-between">
      <a-button type="primary" @click="() => visible = true">
        <a-icon type="plus" style="font-size: 16px" />合作申请
      </a-button>
      <advanced-search
        :advanced="true"
        @onSearch="onSearch"
        @onAdvancedSearch="onAdvancedSearch"
        @onViewSelect="onViewSelect"
        @onSave="onSave"
        @onCreate="onCreate"
        @onReset="onReset"
      >
        <a-row type="flex" align="middle" :gutter="24">
          <a-col span="6" style="text-align: right">
            <label>客户编号:</label>
          </a-col>
          <a-col span="16">
            <a-input v-model="params.consumerCode" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :gutter="24" style="padding-top: 16px;">
          <a-col span="6" style="text-align: right">
            <label>客户名称:</label>
          </a-col>
          <a-col span="16">
            <a-input v-model="params.consumerName" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :gutter="24" style="padding-top: 16px;">
          <a-col span="6" style="text-align: right">
            <label>合作开始日期:</label>
          </a-col>
          <a-col span="16">
            <a-range-picker v-model="date" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :gutter="24" style="padding-top: 16px;">
          <a-col span="6" style="text-align: right">
            <label>状态:</label>
          </a-col>
          <a-col span="16">
            <a-select v-model="params.cooperationState" style="width: 120px">
              <a-select-option value="合作中">合作中</a-select-option>
              <a-select-option value="终止">终止</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </advanced-search>
    </div>
    <a-table size="middle" :columns="columns" :data-source="data" :loading="tableLoading">
      <span slot="desc" slot-scope="text">{{ text | tableEmpty }}</span>
      <span slot="date" slot-scope="text">{{ text | dayjs }}</span>
      <span slot="status" slot-scope="text">
        <a-badge v-if="text === 'In_cooperation'" status="success" />
        <span>{{ text | i18n }}</span>
      </span>
      <span slot="action" slot-scope="record">
        <a-popconfirm
          v-if="record.state === 'In_cooperation'"
          title="你确定要停止合作吗？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handle(record, 0)"
          @cancel="() => void 0"
        >
          <a href="javascript:;">停止合作</a>
        </a-popconfirm>
        <a-popconfirm
          v-else
          title="你确定要停止合作吗？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handle(record, 1)"
          @cancel="() => void 0"
        >
          <a href="javascript:;">重新申请</a>
        </a-popconfirm>
      </span>
    </a-table>
    <a-modal
      title="合作申请"
      :visible="visible"
      :confirm-loading="modalLoading"
      @ok="onApply"
      @cancel="() => visible = false"
    >
      <a-form :form="form">
        <a-form-item label="目标客户编号" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['consumerTenantCode',
                          {
                            rules: [
                              {
                                required: true,
                                message: '请输入目标客户编号',
                              },
                            ],
                          },
            ]"
          />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input v-decorator="['cooprationDesc']" />
        </a-form-item>
      </a-form>
    </a-modal>
  </blank-view>
</template>

<script>
import { mapActions } from 'vuex'
import dayjs from 'dayjs'
import moment from 'moment'
import { clientManagement } from '@/api/platform.js'
import { AdvancedSearch } from '@/components/index.js'

const columns = [
  {
    title: '客户编号',
    dataIndex: 'code'
  },
  {
    title: '客户名称',
    dataIndex: 'name'
  },
  {
    title: '合作开始日期',
    dataIndex: 'cooperationTime',
    scopedSlots: { customRender: 'date' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '备注',
    dataIndex: 'desc',
    scopedSlots: { customRender: 'desc' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    AdvancedSearch
  },
  data() {
    return {
      data: void 0,
      columns,
      visible: false,
      tableLoading: false,
      modalLoading: false,
      form: this.$form.createForm(this),
      params: {
        filter: '',
        pageIndex: 1,
        pageSize: 10,
        cooperationDateStart: void 0,
        cooperationDateEnd: void 0,
        consumerCode: void 0,
        consumerName: void 0,
        cooperationState: void 0
      },
      total: 0,
      date: []
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    }
  },
  watch: {
    date: {
      handler(val, oldVal) {
        console.log(val, oldVal)
        if (val.length < 1) {
          this.params.cooperationDateStart = void 0
          this.params.cooperationDateEnd = void 0
        } else {
          this.params.cooperationDateStart = dayjs(val[0]).valueOf()
          this.params.cooperationDateEnd = dayjs(val[1]).valueOf()
        }
      },
      deep: true
    }
  },
  created() {
    this.getData(this.params)
  },
  methods: {
    ...mapActions('view', ['saveView', 'createView']),
    getData(params) {
      this.tableLoading = true
      clientManagement
        .getCustomer(params)
        .then(res => {
          this.data = res.items
          this.total = res.totalCount
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    handle({ id }, flag) {
      this.tableLoading = true
      clientManagement
        .handle(id, flag)
        .then(() => {
          this.getData(this.params)
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    onApply(e) {
      e.preventDefault()
      console.log(this.form)
      this.form.validateFields((err, values) => {
        if (!err) {
          this.modalLoading = true
          clientManagement
            .apply(values)
            .then(res => {
              console.log(res)
              this.modalLoading = false
            })
            .catch(() => {
              this.modalLoading = false
            })
        }
      })
    },
    onSearch(value) {
      this.params.filter = value
      this.getData(this.params)
    },
    onAdvancedSearch() {
      this.getData(this.params)
    },
    onViewSelect(view) {
      console.log(view)
      const { data } = view
      for (const key in data) {
        this.params[key] = data[key]
      }
      this.date = [
        moment(this.params.cooperationDateStart),
        moment(this.params.cooperationDateEnd)
      ]
    },
    onSave(view) {
      this.saveView({
        route: this.currentRoute,
        view: {
          ...view,
          data: {
            cooperationDateStart: this.params.cooperationDateStart,
            cooperationDateEnd: this.params.cooperationDateEnd,
            consumerCode: this.params.consumerCode,
            consumerName: this.params.consumerName,
            cooperationState: this.params.cooperationState
          }
        }
      })
    },
    onCreate(view) {
      this.createView({
        route: this.currentRoute,
        view: {
          ...view,
          data: {
            cooperationDateStart: this.params.cooperationDateStart,
            cooperationDateEnd: this.params.cooperationDateEnd,
            consumerCode: this.params.consumerCode,
            consumerName: this.params.consumerName,
            cooperationState: this.params.cooperationState
          }
        }
      })
    },
    onReset() {
      this.date = []
      this.params = {
        ...this.params,
        cooperationDateStart: void 0,
        cooperationDateEnd: void 0,
        consumerCode: void 0,
        consumerName: void 0,
        cooperationState: void 0
      }
    }
  }
}
</script>
