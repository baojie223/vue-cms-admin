<template>
  <div class="advanced-search">
    <template v-if="advanced">
      <a-dropdown>
        <a class="ant-dropdown-link">
          自定义视图
          <a-icon type="down" />
        </a>
        <a-menu v-if="currentViews.length > 0" slot="overlay">
          <a-menu-item
            v-for="view in currentViews"
            :key="view.id"
            style="padding-right: 0"
            @click="onViewSelect(view)"
          >
            {{ view.title }}
            <a-icon
              type="close"
              style="float: right; line-height: 26px; padding-left: 8px"
              @click.stop="onViewDelete(view)"
            />
          </a-menu-item>
        </a-menu>
        <a-menu v-else slot="overlay">
          <a-menu-item key="null">暂无</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a style="line-height: 32px; margin: 0 8px" @click="toggle">
        高级搜索
        <a-icon type="filter" />
      </a>
      <div v-if="visible" class="mask" @click="() => visible = false">
        <div class="slot" @click.stop="() => void 0">
          <div class="header">
            <template v-if="!isEdit">
              <span>{{ currentView.title }}</span>
              <a-icon type="edit" @click="onEdit" />
            </template>
            <template v-else>
              <a-input v-model="editTitle" size="small" style="width: 160px" />
              <a @click="onEditConfirm">确定</a>
              <a @click="onEditCancel">取消</a>
            </template>
            <!-- <a-checkbox :checked="currentView.isDefault" @change="onDefaultChange">设为默认</a-checkbox> -->
            <a-icon type="close" style="margin-left: auto" @click="() => visible = false" />
          </div>
          <a-divider />
          <div class="body">
            <slot />
          </div>
          <a-divider />
          <div class="footer">
            <a-button @click="onCreate">新增</a-button>
            <a-button @click="onSave">保存</a-button>
            <a-button @click="onReset">重置</a-button>
            <a-button type="primary" @click="onAdvancedSearch">查询</a-button>
          </div>
        </div>
      </div>
    </template>

    <a-input-search
      style="width: 400px"
      placeholder="请输入关键词"
      enter-button="查询"
      @search="onSearch"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { generateId } from '@/utils/index'
export default {
  name: 'AdvancedSearch',
  props: {
    advanced: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      currentView: {
        title: '自定义视图',
        isDefault: false,
        id: generateId(1)
      },
      isEdit: false,
      editTitle: ''
    }
  },
  computed: {
    ...mapState({
      views: state => state.view.views
    }),
    currentRoute() {
      return this.$route.name
    },
    currentViews() {
      return this.views[this.currentRoute] || []
    },
    defaultView() {
      const result = this.currentViews.filter(view => view.isDefault)
      if (result.length > 0) {
        return result[0]
      } else {
        return { title: '自定义视图', isDefault: false, id: generateId(1) }
      }
    }
  },
  methods: {
    ...mapActions('view', ['saveView', 'createView', 'deleteView']),
    onInit() {},
    onViewSelect(view) {
      this.currentView.title = view.title
      this.currentView.isDefault = view.isDefault
      this.currentView.id = view.id
      this.$emit('onViewSelect', view)
      this.visible = true
    },
    onViewDelete(view) {
      this.deleteView({ route: this.currentRoute, view: view })
      if (view.id === this.currentView.id) {
        this.onReset()
      }
    },
    onSearch(value) {
      console.log(value)
      this.$emit('onSearch', value)
    },
    toggle() {
      // if (!this.visible) {
      //   this.currentView = this.defaultView
      // }
      this.currentView = {
        title: '自定义视图',
        isDefault: false,
        id: generateId(1)
      }
      this.visible = !this.visible
    },
    onEdit() {
      this.editTitle = this.currentView.title
      this.isEdit = true
    },
    onEditConfirm() {
      this.currentView.title = this.editTitle
      this.isEdit = false
      this.editTitle = ''
    },
    onEditCancel() {
      this.isEdit = false
    },
    onDefaultChange() {
      this.currentView.isDefault = !this.currentView.isDefault
    },
    onSave() {
      this.$emit('onSave', this.currentView)
    },
    onCreate() {
      this.currentView.id = generateId(1)
      this.$emit('onCreate', this.currentView)
    },
    onReset() {
      this.currentView = {
        title: '自定义视图',
        isDefault: false,
        id: generateId(1)
      }
      this.$emit('onReset')
    },
    onAdvancedSearch() {
      this.$emit('onAdvancedSearch')
    }
  }
}
</script>

<style lang="less" scoped>
.advanced-search {
  display: inline;
}
.mask {
  position: absolute;
  top: 48px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  .slot {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 8px;
    right: 8px;
    bottom: 8px;
    width: 480px;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    .ant-divider {
      margin: 16px 0;
    }
    .header,
    .footer {
      flex: none;
    }
    .body {
      height: 100%;
    }
    .header {
      display: flex;
      align-items: center;
      font-size: 16px;
      .anticon {
        margin-left: 8px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
      .ant-checkbox-wrapper {
        margin-left: auto;
      }
      a {
        font-size: 14px;
        padding-left: 8px;
      }
    }
    .footer {
      text-align: right;
      .ant-btn {
        margin-left: 8px;
      }
    }
  }
}
</style>
