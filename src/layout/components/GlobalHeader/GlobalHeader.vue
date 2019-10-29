<template>
  <div class="global-header">
    <a-layout-header style="padding: 0">
      <a-row>
        <a-col span="12">
          <logo />
          <breadcrumb />
        </a-col>
        <a-col span="12" style="display: flex; justify-content: flex-end; align-items: center">
          <app-menu />
          <notice />
          <full-screen />
          <user-menu />
          <lang-select />
        </a-col>
      </a-row>
    </a-layout-header>
  </div>
</template>

<script>
import LangSelect from './components/LangSelect'
import UserMenu from './components/UserMenu'
import Notice from './components/Notice'
import Logo from './components/Logo'
import Breadcrumb from '@/components/Breadcrumb'
import AppMenu from './components/AppMenu'
import FullScreen from './components/FullScreen'
export default {
  name: 'GlobalHeader',
  components: {
    LangSelect,
    UserMenu,
    Notice,
    Logo,
    Breadcrumb,
    AppMenu,
    FullScreen
  }
}
</script>

<style lang="less">
.global-header {
  .action {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 12px;
    // display: inline-block;
    transition: all 0.3s;
    height: 64px;
    line-height: 64px;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    .anticon {
      color: #fff;
      font-size: 20px;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    a {
      color: #fff;
    }
  }
}
</style>
