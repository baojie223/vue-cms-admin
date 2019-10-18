import Vue from 'vue'
import { Row, Col, Form, Input, Icon, Button, Divider, notification, message, Popover, Layout, Menu, Breadcrumb, Dropdown, Avatar, Upload } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Popover)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Dropdown)
Vue.use(Avatar)
Vue.use(Upload)
Vue.$message = message
Vue.$notification = notification
