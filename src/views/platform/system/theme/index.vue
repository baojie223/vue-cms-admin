<template>
  <div>
    <div>图片上传</div>
    <a-button type="primary" @click="save">保存</a-button>
    <div class="logo-upload">
      <div class="pic">
        <img :src="imgDataUrl">
      </div>

      <a-button block style="margin-top: 16px" @click="() => cropperShow = true">选择图片</a-button>
      <a-button type="danger" block style="margin-top: 8px" @click="() => imgDataUrl = logo">重置</a-button>
    </div>
    <my-upload
      v-model="cropperShow"
      field="img"
      :width="200"
      :height="64"
      img-format="png"
      no-circle
      no-square
      no-rotate
      @crop-success="cropSuccess"
    />
    <div>
      主题色
    </div>
    <el-color-picker v-model="themeColor" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import myUpload from 'vue-image-crop-upload'
import { setTheme, getTheme } from '@/api/platform'
export default {
  name: '',
  components: {
    MyUpload: myUpload
  },
  data() {
    return {
      cropperShow: false,
      imgDataUrl: '',
      themeColor: ''
    }
  },
  computed: {
    ...mapGetters(['logo', 'settings'])
  },
  created() {
    if (this.logo) {
      this.imgDataUrl = this.logo
    }
  },
  methods: {
    ...mapMutations('user', ['SET_SETTINGS']),
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
    },
    async save() {
      const data = {
        ...this.settings,
        logo: this.imgDataUrl
      }
      try {
        await setTheme(data)
        const { result } = await getTheme()
        this.SET_SETTINGS(result)
        this.$message.success('上传成功')
      } catch {
        this.$message.error('上传失败，请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/dist/antd.less';

.logo-upload {
  width: 218px;
  padding: 8px;
  background-color: #fff;
  border: 1px dashed @border-color-base;
  transition: all 0.3s;
  &:hover {
    border: 1px dashed @primary-color;
  }
  .pic {
    width: 100%;
    height: 64px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
