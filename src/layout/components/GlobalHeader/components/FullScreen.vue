<template>
  <span class="action" @click="() => isFull = !isFull">
    <a-icon :type="!isFull ? 'fullscreen' : 'fullscreen-exit'" />
  </span>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isFull: false
    }
  },
  watch: {
    isFull(val, oldVal) {
      if (val) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
