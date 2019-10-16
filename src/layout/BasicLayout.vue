<template>
  <a-layout style="height: 100%">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider>
        <sider />
      </a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Sider } from './components/index'
export default {
  name: '',
  components: {
    Sider
  }
}
</script>

<style lang="less" scoped>
</style>
