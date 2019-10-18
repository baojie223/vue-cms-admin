<template>
  <a-layout-sider v-model="collapsed" :collapsible="true" :trigger="null" theme="light" width="256">
    <div class="menu-title" :style="{'justify-content': collapsed ? 'center' : 'space-between'}">
      <span v-if="!collapsed">{{ currentPermissionRoutes.meta.title }}</span>
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapsed"
      />
    </div>
    <a-menu
      v-model="activeMenu"
      mode="inline"
      :inline-collapsed="collapsed"
      style="height: calc(100% - 66px)"
    >
      <template v-for="route in currentPermissionRoutes.children">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.path">
            <span slot="title">
              <a-icon :type="route.meta.icon" />
              <span>{{ route.meta.title }}</span>
            </span>
            <a-menu-item v-for="child in route.children" :key="child.path">
              <router-link :to="child.path" style="display: inline-block">{{ child.meta.title }}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="route.path">
            <a-icon :type="route.meta.icon" />
            <span v-if="collapsed">
              <router-link :to="route.path" style="display: inline-block">{{ route.meta.title }}</router-link>
            </span>
            <router-link
              v-else
              :to="route.path"
              style="display: inline-block"
            >{{ route.meta.title }}</router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    ...mapGetters(['permissionRoutes']),
    currentPermissionRoutes() {
      const current = this.permissionRoutes.filter(
        route => route.path === this.primaryPath
      )
      const routes = current[0]
      return routes
    },
    primaryPath() {
      return '/' + this.$route.path.split('/')[1]
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return [path]
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less" scoped>
.menu-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  text-align: center;
  padding: 24px 16px 16px 24px;
  border-right: 1px solid #e8e8e8;
  span {
    color: #1890ff;
    line-height: 1;
  }
}
</style>
