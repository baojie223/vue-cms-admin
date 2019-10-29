<template>
  <div class="blank-view">
    <div v-if="$slots.action" class="action">
      <slot name="action" />
    </div>
    <div class="main" :style="{ padding: padding }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankView',
  props: {
    padding: {
      type: String,
      default: '16px'
    }
  }
}
</script>

<style lang="less" scoped>
.blank-view {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.action {
  margin-bottom: 16px;
}
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // padding: 16px;
  overflow-y: scroll;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
