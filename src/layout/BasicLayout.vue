<template>
  <a-layout style="height: 100%" class="basic-layout">
    <global-header />
    <a-layout style="overflow-x: hidden">
      <sidebar v-if="!noSidebar" />
      <a-layout-content>
        <tags-view v-if="false" class="tags" />
        <app-main />
        <div
          style="text-align: center; padding-bottom: 16px; line-height: 1; color: rgba(0,0,0,.45)"
        >Copyright &copy; 2019 无锡微茗智能科技有限公司</div>
      </a-layout-content>
      <quick-drawer />
    </a-layout>
  </a-layout>
</template>

<script>
import { Sidebar, GlobalHeader, AppMain, TagsView } from './components/index'
import { QuickDrawer } from '@/components/index.js'
export default {
  name: '',
  components: {
    Sidebar,
    GlobalHeader,
    AppMain,
    TagsView,
    QuickDrawer
  },
  data() {
    return {
      collapsed: false,
      visible: false
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
