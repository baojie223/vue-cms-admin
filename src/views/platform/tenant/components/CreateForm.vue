<template>
  <a-modal
    v-model="visible"
    title="新建租户"
    ok-text="新建"
    :closable="false"
    style="width: 800px"
    @ok="onSubmit"
  >
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="租户编号">
        <a-input
          v-decorator="[
            'code',
            { rules: [{ required: true, message: '请输入租户编号' }] },
          ]"
          placeholder="请输入租户编号"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="租户名称">
        <a-input
          v-decorator="[
            'displayName',
            { rules: [{ required: true, message: '请输入租户名称' }] },
          ]"
          placeholder="请输入租户名称"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="租户描述">
        <a-input v-decorator="['desc']" placeholder="请输入租户描述" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="管理员邮箱">
        <a-input
          v-decorator="[
            'adminEmail',
            { rules: [{ required: true, message: '请输入管理员邮箱' }, { type: 'email', message: '请输入正确的邮箱地址'}] },
          ]"
          placeholder="请输入管理员邮箱"
        />
      </a-form-item>
      <a-form-item v-bind="formTailLayout">
        <a-checkbox :checked="isRandom" @change="onRandomChange">使用随机密码（将以邮件方式发送随机密码）</a-checkbox>
      </a-form-item>
      <a-form-item v-if="!isRandom" v-bind="formItemLayout" label="管理员密码">
        <a-input
          v-decorator="[
            'adminPassword',
            { rules: [{ required: true, message: '请输入管理员密码' }] },
          ]"
          placeholder="请输入管理员密码"
        />
      </a-form-item>
      <a-form-item v-if="!isRandom" v-bind="formItemLayout" label="核对管理员密码">
        <a-input
          v-decorator="[
            'confirm',
            { rules: [{ required: true, message: '请再次输入管理员密码' }, { validator: confirmPassword }] },
          ]"
          placeholder="请再次输入管理员密码"
        />
      </a-form-item>
      <a-form-item v-bind="formTailLayout">
        <a-checkbox
          v-decorator="['shouldChangePasswordOnNextLogin', { valuePropName: 'checked', initialValue: true }]"
        >下次登录需要重置密码</a-checkbox>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="订阅结束时期">
        <a-radio-group v-decorator="['expiryTime', { initialValue: 1000}]">
          <a-radio :value="1000">无期限</a-radio>
          <a-radio :value="expiryTime"><a-date-picker v-model="expiryTime" /></a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-bind="formTailLayout">
        <a-checkbox v-decorator="['isActive', { valuePropName: 'checked', initialValue: true }]">启用租户</a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// import dayjs from 'dayjs'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 6 }
}
export default {
  name: '',
  data() {
    return {
      visible: false,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      expiryTime: null,
      isRandom: false
    }
  },
  watch: {
    expiryTime: {
      handler(val) {
        console.log(val)
      },
      immediate: true
    }
  },
  methods: {
    onSubmit() {},
    toggle() {
      this.visible = !this.visible
    },
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info('success')
        }
      })
    },
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    onRandomChange() {
      this.isRandom = !this.isRandom
    },
    confirmPassword(rule, value, callback) {
      if (!value) {
        callback()
        return
      }
      if (value !== this.form.getFieldValue('adminPassword')) {
        callback('密码不一致')
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
