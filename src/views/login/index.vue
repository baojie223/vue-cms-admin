<template>
  <div class="login">
    <div class="left">
      <div>
        <div class="text">打造最具价值工业互联APP</div>
        <div style="width: 80px; height: 8px; background: #fff; margin: 24px 0 8px" />
        <div class="text" style="font-size: 60px; font-weight: 700">Count for more</div>
      </div>
    </div>
    <div class="right">
      <div class="header">
        <img src="~@/assets/images/login_logo.svg">
      </div>
      <div class="body">
        <login-form />
        <a-divider style="font-size: 14px; color: rgba(0, 0, 0, 0.25)">忘记密码</a-divider>
      </div>
      <div class="footer">
        <div>Copyright &copy; 2019 无锡微茗智能科技有限公司</div>
        <div>苏ICP备19005118号</div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm'
export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100%;
  min-width: 1366px;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 64%;
  height: 100%;
  background: url(~@/assets/images/login_bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .text {
    font-size: 50px;
    color: #fff;
    line-height: 1;
  }
}
.right {
  display: flex;
  width: 36%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 184px;
  padding-bottom: 8px;
  .body {
    width: 100%;
    min-width: 288px;
    max-width: 424px;
    padding-bottom: 48px;
  }
  .footer {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.25);
    text-align: center;
  }
}
</style>
