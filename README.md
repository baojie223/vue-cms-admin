# master-cloud-vue

## 进度

- [x] 国际化
- [x] 登录
- [x] logo设置
- [x] eslint, commitlint



## 开发流程

1. 在router文件夹下的modules中建立对于的模块路由，并在index中的asyncRoutes中引入，其中路由文件的格式参照platform路由，不一致有可能会导致侧边栏导航出问题
2. 在views文件夹下建立对应的模块view，参照已有的platform模块，与路由文件中的路由一一对应
3. （可选）需要用到vuex则同样在store文件夹的modules下建立对应模块