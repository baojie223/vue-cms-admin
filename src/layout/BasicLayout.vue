<template>
  <a-layout style="height: 100%" class="layout">
    <a-layout-header style="padding: 0">
      <navbar />
    </a-layout-header>
    <a-layout>
      <sidebar v-if="!noSidebar" />
      <a-layout-content>
        <tags-view class="tags" />
        <app-main />
        <div
          style="text-align: center; padding: 8px 0; line-height: 1; color: rgba(0,0,0,.45)"
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
      return this.$route.meta.noSidebar || false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
