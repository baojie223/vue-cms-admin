<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      lang: state => state.i18n.lang
    }),
    locale() {
      switch (this.lang) {
        case 'zh-CN':
          return zh_CN
        case 'en-US':
          return en_US
        default:
          return zh_CN
      }
    }
  }
}
</script>
