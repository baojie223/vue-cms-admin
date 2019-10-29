<template>
  <a-dropdown>
    <span class="action">
      <a-icon
        type="global"
      />
    </span>
    <a-menu slot="overlay" @click="switchLang">
      <a-menu-item key="zh-CN">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文
        </a>
      </a-menu-item>
      <a-menu-item key="en-US">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="English">🇬🇧</span> English
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mixin as langMixin } from '@/locales/i18n-mixin'

export default {
  name: 'LangSelect',
  mixins: [langMixin],
  data() {
    return {}
  },
  methods: {
    switchLang(row) {
      this.setLang(row.key)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
