<template>
  <a-dropdown>
    <!-- <a class="ant-dropdown-link action">
      <a-avatar class="avatar" size="small" :src="avatar || require('@/assets/images/avatar.jpg')" />
      <span style="color: #fff">{{ name }}</span>
    </a>-->
    <span class="action" style="display: flex; align-items: center">
      <img :src="avatar || require('@/assets/images/avatar.jpg')" class="avatar">
      <span style="color: #fff; font-size: 16px; padding-left: 8px">{{ name }}</span>
    </span>
    <a-menu slot="overlay">
      <a-menu-item>
        <a @click.prevent="logout">
          <a-icon type="logout" />
          <span style="padding-left: 8px">退出登录</span>
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  computed: {
    ...mapGetters(['avatar', 'name'])
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
