import Vue from 'vue'
import { Row, Col, Form, Input, Icon, Button, Divider, notification, message, Popover, Layout } from 'ant-design-vue'

Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Popover)
Vue.use(Layout)

Vue.$message = message
Vue.$notification = notification
