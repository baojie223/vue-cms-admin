<template>
  <div style="height: 100vh; background: red">
    {{ $t('New') }}
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
    console.log(this.$t('New'))
  }
}
</script>

<style lang="less" scoped>

</style>
