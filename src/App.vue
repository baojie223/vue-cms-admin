<template>
  <div id="app">
    <!-- <a-locale-provider :locale="zh_CN">
      <router-view />
    </a-locale-provider> -->
    <router-view />
  </div>
</template>

<script>
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  created() {
    console.log(window.SERVER_URL)
    // this.$store.dispatch('user/getConfig').then(res => console.log(res.data))
  }
}
</script>
