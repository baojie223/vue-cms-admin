<template>
  <a-layout-sider v-model="collapsed" :collapsible="true" :trigger="null" theme="light" width="256">
    <div class="collapse" @click="toggleCollapsed">
      <img v-show="!collapsed" src="~@/assets/images/收起.png">
      <img v-show="collapsed" src="~@/assets/images/展开.png">
    </div>

    <a-menu v-model="activeMenu" mode="inline" :inline-collapsed="collapsed" style="height: 100%">
      <template v-for="route in currentPermissionRoutes.children">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.path">
            <span slot="title">
              <a-icon :type="route.meta.icon" />
              <span>{{ route.meta.title }}</span>
            </span>
            <a-menu-item v-for="child in route.children" :key="child.path" class="item">
              <router-link :to="child.path" style="display: inline-block">{{ child.meta.title }}</router-link>
              <a-icon
                v-if="!isInDrawer(child.path)"
                type="star"
                class="icon"
                @click.stop="putInDrawer({ app: route.meta.title, icon: route.meta.icon, route: child })"
              />
              <a-icon
                v-else
                type="star"
                theme="filled"
                class="icon"
                style="display: block; color: #1890ff"
                @click.stop="takeFromDrawer(child.path)"
              />
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="route.path" class="item">
            <a-icon :type="route.meta.icon" />
            <span v-if="collapsed">
              <router-link :to="route.path" style="display: inline-block">{{ route.meta.title }}</router-link>
            </span>
            <router-link
              v-else
              :to="route.path"
              style="display: inline-block"
            >{{ route.meta.title }}</router-link>
            <template v-if="!collapsed">
              <a-icon
                v-if="!isInDrawer(route.path)"
                type="star"
                class="icon"
                @click.stop="putInDrawer({ app: route.meta.title, icon: route.meta.icon, route: route })"
              />
              <a-icon
                v-else
                type="star"
                theme="filled"
                class="icon"
                style="display: block; color: #1890ff"
                @click.stop="takeFromDrawer(route.path)"
              />
            </template>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    ...mapGetters(['permissionRoutes', 'drawer']),
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
    },
    isInDrawer() {
      return function(path) {
        return this.drawer.filter(item => item.link === path).length > 0
      }
    }
  },
  methods: {
    ...mapActions('user', ['putInDrawer', 'takeFromDrawer']),
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
.collapse {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);
  z-index: 10;
  cursor: pointer;
}
.item {
  position: relative;
  .icon {
    display: none;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    .icon {
      display: inline;
      color: #1890ff;
    }
  }
}
</style>
