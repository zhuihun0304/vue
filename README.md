### 依赖

- vue,vuex,vue-router,vue-resource,element-ui

-  webpack

-  node 6.0.0以上版本

###  目录结构
-  build   webpack配置文件

-  config  定义开发环境和生成环境,通过proxyConfig.js  文件解决开发时的跨域问题

-  dist   webpack打包后的文件 用于部署到生产环境

-  node_modules  一些依赖包

-  src  前端代码



# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
