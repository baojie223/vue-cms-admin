## 使用方法

Props

| 名称     | 类型    | 默认  | 说明                       |
| -------- | ------- | ----- | -------------------------- |
| advanced | boolean | false | 决定时普通搜索还是高级搜索 |

Events

| 名称             | 接受参数                                            | 说明                                                         |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| onSearch         | 无                                                  | 非高级搜索模式时点击搜索按钮的回调                           |
| onAdvancedSearch | 无                                                  | 高级搜索模式时点击搜索按钮的回调                             |
| onViewSelect     | { id: string, title: string, data: 自己存储的内容 } | 选择视图后的回调                                             |
| onSave           | { id: string, title: string }                       | 点击保存按钮的回调，在此回调函数中调用view/saveView来保存视图 |
| onCreate         | { id: string, title: string }                       | 点击新建按钮的回调，在此回调函数中调用view/createView来保存视图 |
| onReset          | 无                                                  | 点击重置按钮的回调                                           |

vuex相关actions,位于view模块

| 名称       | 接受参数                                                     | 说明         |
| ---------- | ------------------------------------------------------------ | ------------ |
| saveView   | { route: 当前路由name, view: { id: string, title: string, (自定义内容) } } | 用于保存视图 |
| createView | { route: 当前路由name, view: { id: string, title: string, (自定义内容) } } | 用于新建视图 |

