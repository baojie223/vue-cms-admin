<template>
  <div class="navbar">
    <a-row type="flex" align="middle">
      <a-col span="12" class="left">
        <img :src="logo || require('@/assets/images/home_logo.svg')" class="logo" />
        <breadcrumb />
      </a-col>
      <a-col span="12" style="text-align: right">
        <a-popover placement="bottomRight" style="padding: 0 12px">
          <template slot="content">
            <ul>
              <li v-for="app in apps" :key="app">
                <router-link v-if="app !== 'VISION'" :to="{ path: routerMap[app] }">{{ app }}</router-link>
                <a v-else :href="routerMap[app] + '?token=' + token" target="_blank">{{ app }}</a>
              </li>
            </ul>
          </template>
          <template slot="title">
            <span>所有APP</span>
          </template>
          <a>APP</a>
        </a-popover>
        <a-dropdown style="padding: 0 12px">
          <a class="ant-dropdown-link">
            <a-avatar :src="avatar || require('@/assets/images/avatar.jpg')" />
            <span style="color: #fff">{{ name }}</span>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click.prevent="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <lang-select></lang-select>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
export default {
  name: '',
  components: {
    Breadcrumb,
    LangSelect
  },
  data() {
    return {
      routerMap: {
        Platform: '/platform',
        JOB: '/job',
        MDC: '/mdc',
        DNC: '/dnc',
        ExtraNet: '/remote-diagnosis',
        VISION: window.VISION_URL,
        AppStore: '/app-store'
      }
    }
  },
  computed: {
    ...mapGetters(['apps', 'name', 'avatar', 'token', 'logo'])
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  padding: 0;
}
.left {
  display: flex;
  align-items: center;
}
.logo {
  display: block;
  width: 200px;
  height: 64px;
  margin: 0 12px;
}
</style>
