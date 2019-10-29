<template>
  <div class="quick-drawer">
    <div class="trigger" :style="{ right: visible ? '256px' : 0 }" @click="() => visible = !visible">
      <a-icon type="link" />
    </div>
    <a-drawer placement="right" :closable="false" :visible="visible" @close="onClose">
      <a-row :gutter="24">
        <a-col v-for="item in drawer" :key="item.title" span="12" style="display: flex; flex-direction: column; align-items: center">
          <a-icon :type="item.icon" />
          <span>{{ item.app }}</span>
          <a @click="jump(item.link)">{{ item.title }}</a>
          <a-divider />
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'QuickDrawer',
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters(['drawer'])
  },
  methods: {
    onClose() {
      this.visible = false
    },
    jump(link) {
      this.$router.push(link)
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.trigger {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 36px;
  height: 36px;
  // right: 256px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;
  transition: all 0.3s ease;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
