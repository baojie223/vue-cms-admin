<template>
  <img :src="logo || require('@/assets/images/home_logo.svg')" class="logo">
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Logo',
  computed: {
    ...mapGetters(['logo'])
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 200px;
  height: 64px;
  margin: 0 12px;
  float: left;
}
</style>
