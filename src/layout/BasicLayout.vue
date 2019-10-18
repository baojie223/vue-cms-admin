<template>
  <a-layout style="height: 100%" class="layout">
    <a-layout-header style="padding: 0">
      <navbar />
    </a-layout-header>
    <tags-view v-if="false"></tags-view>
    <a-layout>
      <sidebar v-show="!noSidebar" />
      <a-layout-content style="padding: 24px 24px 0">
        <app-main></app-main>
        <div
          style="text-align: center; padding: 16px 0; line-height: 1; color: rgba(0,0,0,.45)"
        >Copyright &copy; 2019 无锡微茗智能科技有限公司</div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Sidebar, Navbar, AppMain, TagsView } from './components/index'
export default {
  name: '',
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView
  },
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    noSidebar() {
      return this.$route.meta.noSidebar
    }
  }
}
</script>

<style lang="less">
@import '~@/styles/antd.less';
</style>
