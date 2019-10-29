<template>
  <div class="exception">
    <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg">
    <div class="text">
      <p>抱歉，你访问的页面不存在或仍在开发中</p>
      <a-button type="primary" @click="back">返回首页</a-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="less" scoped>
.exception {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  padding-bottom: 240px;
  .text {
    padding: 24px;
    p {
      font-size: 20px;
    }
  }
}
</style>
