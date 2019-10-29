<template>
  <a-popover v-model="menuVisible" trigger="click" placement="bottomRight" style="padding: 0 12px">
    <template slot="content">
      <div class="apps">
        <h3 style="font-size: 18px">我的APP</h3>
        <a-divider style="margin: 8px 0" />
        <a-row type="flex">
          <template v-for="(app, i) in appMap">
            <a-col
              :key="i"
              v-permission="[app.acl]"
              span="4"
              style="display: flex; flex-direction: column; align-items: center"
              class="item"
              @click="routerTo(app.link)"
            >
              <img :src="app.icon" style="width: 48px; height: 48px">
              <span style="font-size: 16px">{{ app.name }}</span>
            </a-col>
          </template>
        </a-row>
      </div>
    </template>
    <a class="action" style="display: inline-block; font-size: 20px; color: #fff">
      <a-icon type="appstore" theme="filled" style="padding: 0 12px" />APP
    </a>
  </a-popover>
</template>

<script>
import { mapGetters } from 'vuex'
const picUrl = '/images/menu/'
export default {
  name: '',
  data() {
    return {
      menuVisible: false
    }
  },
  computed: {
    ...mapGetters(['apps']),
    appMap() {
      return [
        {
          acl: 'Platfrom.DashboardHost',
          app: 'DASHBOARD',
          name: this.$t('workbench'),
          icon: picUrl + '4.png',
          link: '/dashboard'
        },
        {
          acl: 'Platfrom.DashboardTenant',
          app: 'DASHBOARD',
          name: this.$t('workbench'),
          icon: picUrl + '4.png',
          link: '/dashboard'
        },
        {
          acl: 'Platform',
          app: 'HOME',
          name: this.$t('Platform'),
          icon: picUrl + '1.png',
          link: '/platform'
        },
        {
          acl: 'MDC',
          app: 'MDC',
          name: this.$t('Acquisiton_and_analysis'),
          icon: picUrl + '8.png',
          link: '/mdc'
        },
        {
          acl: 'DNC',
          app: 'DNC',
          name: this.$t('Process_management'),
          icon: picUrl + '5.png',
          link: '/dnc'
        },
        {
          acl: 'JOB',
          app: 'JOB',
          name: this.$t('Workorder'),
          icon: picUrl + '6.png',
          link: '/job'
        },
        {
          acl: 'ExtraNet',
          app: 'REMOTE',
          name: this.$t('Process_status_maintenance'),
          icon: picUrl + '7.png',
          link: '/remote-diagnose'
        },
        {
          acl: 'Vision.Menu',
          app: 'VISION',
          name: this.$t('Visualization'),
          icon: picUrl + '2.png',
          link: '/vision'
        },
        {
          acl: 'AppStore',
          app: 'STORE',
          name: this.$t('App_market'),
          icon: picUrl + '3.png',
          link: '/app-store'
        }
      ]
    }
  },
  methods: {
    routerTo(link) {
      this.$router.push(link)
      this.menuVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.apps {
  width: 800px;
  // height: 400px;
}

.item {
  padding: 16px 0;
  transition: all 0.3s;
  cursor: pointer;
  span {
    transition: all 0.3s;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
    span {
      color: #1890ff;
    }
  }
}
</style>
