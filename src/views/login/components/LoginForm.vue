<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item>
      <a-input
        v-decorator="[
          'tenant',
        ]"
        placeholder="企业"
        size="large"
      >
        <a-icon slot="prefix" type="team" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item :validate-status="usernameError() ? 'error' : ''" :help="usernameError() || ''">
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: '请输入用户名!' }]}
        ]"
        placeholder="用户名"
        size="large"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
      <a-input
        v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入密码!' }]}
        ]"
        type="password"
        placeholder="密码"
        size="large"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        block
        size="large"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
        :loading="loading"
        style="margin-top: 24px"
      >登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 按钮置灰
      this.form.validateFields()
    })
  },
  methods: {
    ...mapActions('user', ['login']),
    usernameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('username') && getFieldError('username')
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = {
            delay: 500
          }
          this.login(values)
            .then(res => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(err => {
              this.$message.error('登录失败，请稍后再试')
              this.loading = false
            })
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
