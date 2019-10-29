import Vue from 'vue'
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Button,
  Divider,
  notification,
  message,
  Popover,
  Layout,
  Menu,
  Breadcrumb,
  Dropdown,
  Avatar,
  Upload,
  Table,
  Tag,
  Modal,
  Popconfirm,
  Drawer,
  LocaleProvider,
  Badge,
  Checkbox,
  DatePicker,
  Pagination,
  Radio,
  Select,
  Alert
} from 'ant-design-vue'

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
Vue.use(Table)
Vue.use(Tag)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Drawer)
Vue.use(LocaleProvider)
Vue.use(Badge)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Alert)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll
