# vue-project-template

> \"A template developed based on vue-cli\"

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

# use
    1.拉取项目结构之后，使用 npm/cnpm i 下载项目依赖
    2.使用npm run dev/npm run build 命令行进行开发和打包

# Explain
    此项目是基于最新vue-cli的项目模板，包含一些最基本项目功能：
        1.mock 数据 【开关在 config-index.js 开启，已经写好了一个简单的实例】
        2.standard-eslint 规范代码
        3.全局 SCSS 引入【src-assets-scss-common.scss】,用于引入全局变量和 css-mixin
        4.全局变量引入 [build-webpack.dev.conf.js/webpack.prod.conf.js] 写好了一个 BASE_URL例子
        5.本地代理【config-index.js里的proxyTable已经写好了一个实例】
    因为是模板所以把百望云的所有项目的业务逻辑都清除了,保存了一些基础功能,以后还会陆续加入更多更完善的功能
    【基础组件库和基础 JS 类库等】,也欢迎大家补充

# proposal
  使用 vue 开发请大家严格遵守 https://cn.vuejs.org/v2/style-guide/
  里的风格指南,里面都是一些最佳案例，能提高大家的开发效率
  补充规则
    1.请大家把业务组件和基础组件要严格区别开，分别放在 common和components里,方便拓展和维护
    2.编写组件样式时，一些共有样式请更新在src-assets-scss-common.scss里,私有样式请写在组件内部并且采用 scoped 模式，防止样式冲突
    3....后续补充中

# Project architecture
-- src
    -- assets                      # 私有资源
    -- common                      # 通用组件
    -- components                  # 业务组件
    -- mixins                      # 公用mixin
    -- pages                       # 页面维度
        -- PageA                   # 页面A
        -- _pageA                  # 页面A下的子组件夹
            -- components          # 页面A下的一个组件
    -- router                      # 路由
        -- index.js                # 路由入口
        -- routes.js               # 路由配置信息
    -- utils                       # js通用方法
        -- https.js                # 封装网络请求方法
    -- app.vue                     # 顶层单文件
    -- main.js                     # 入口
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
