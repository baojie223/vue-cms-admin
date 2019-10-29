<template>
  <div>
    <a-alert message="我们将向您的邮箱发送一封邮件，请打开邮件内的链接修改密码！" type="info" closable />
    <a-form :form="form" style="padding-top: 24px" @submit="handleSubmit">
      <a-form-item :validate-status="emailError() ? 'error' : ''" :help="emailError() || ''">
        <a-input
          v-decorator="[
            'email',
            {rules: [{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱格式!'}]}
          ]"
          placeholder="邮箱"
          size="large"
        >
          <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item style="padding-top: 24px">
        <a-button size="large" style="width: 48%" @click="back">返回</a-button>
        <a-button
          type="primary"
          size="large"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
          :loading="loading"
          style="width: 48%; margin-left: auto; float: right"
        >发送</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { forget } from '@/api/user'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  name: '',
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      loading: false
    }
  },
  methods: {
    emailError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('email') && getFieldError('email')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = {
            delay: 500
          }
          forget(values.email).then(res => {
            this.$message.success('发送邮件成功，请注意查收')
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    back() {
      this.$emit('onBack')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
