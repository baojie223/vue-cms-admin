import Vue from 'vue'
import i18n from '@/locales/index'
import dayjs from 'dayjs'

// Vue.filter('NumberFormat', function(value) {
//   if (!value) {
//     return '0'
//   }
//   const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
//   return intPartFormat
// })

Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

Vue.filter('tableEmpty', (value) => {
  return value || ' - '
})

Vue.filter('i18n', value => {
  return i18n.t(value)
})
