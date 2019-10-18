<template>
  <div>
    <div>图片上传</div>
    <div class="clearfix">
      <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
        <a-button>
          <a-icon type="upload" />Select File
        </a-button>
      </a-upload>
      <a-button
        type="primary"
        @click="handleUpload"
        :disabled="fileList.length === 0"
        :loading="uploading"
        style="margin-top: 16px"
      >{{uploading ? 'Uploading' : 'Start Upload' }}</a-button>
    </div>
    <avatar-upload></avatar-upload>
  </div>
</template>

<script>
import AvatarUpload from '@/views/components-demo/avatar-upload'
export default {
  name: '',
  components: {
    AvatarUpload
  },
  data() {
    return {
      fileList: [],
      uploading: false
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true

      // You can use any AJAX library you like
      // reqwest({
      //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.fileList = [];
      //     this.uploading = false;
      //     this.$message.success('upload successfully.');
      //   },
      //   error: () => {
      //     this.uploading = false;
      //     this.$message.error('upload failed.');
      //   },
      // });
    }
  }
}
</script>

<style lang="less" scoped>
</style>
