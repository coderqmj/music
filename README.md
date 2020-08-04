## 一、项目初始化

### 1.1.划分项目结构

### 1.2.样式重置

使用了第三方库：`yarn add normalize`

定义了全局样式：导航栏样式，图标，精灵图

### 1.3.修改webpack，配置别名

#### 方式一（推荐）：craco

- 可以不暴露配置文件的情况下进行想相关配置

安装：`yarn add @craco/craco`

配置：

```js
// 解析路径的方法
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      // 配置别名
      "@": resolve("src"),
      "components" : resolve("src/components")
    }
  }
}
```



#### 方式二(不推荐): yarn eject

## 二、项目的框架搭建

头部(导航栏)和尾部(公司信息)都不变，只有中间的内容会发生改变，点击对应的导航栏中间的内容会发生相应的内容跳转，所以中间进行路由切换

### 2.1路由

安装路由：`yarn add react-router-dom` 会对路由相关进行安装

和vue一样进行映射配置：`yarn add react-router-config`

使用

- 配置映射routes
- 渲染路由renderRoutes(routes)

```js
import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'

import routes from './router'

import AppHeader from 'components/app-header'
import AppFooter from 'components/app-footer'

export default memo(function App() {
  return (
    <div> // 这里需要换成HashRouter，否则会报错
      <AppHeader />
      {renderRoutes(routes)}
      <AppFooter/>
    </div>
  )
})
```

配置：

```js
import Discover from '@/pages/discover'
import Friend from '@/pages/friend'
import Mine from '@/pages/mine'

const routes = [
  { path: '/', exact: true, component: Discover },
  { path: '/friend', component: Friend },
  { path: '/mine', component: Mine },
]

export default routes;
```

## 三、遇到的BUG与解决

## 四、各个模块与页面

### 4.1导航栏

```
导航栏左边：
    设置宽度为 1100px，并且使其居中
    里面开启flex布局，logo使用精灵图，
    前三个文字是路由，后三个是超链接

导航栏右边：
	搜索框，开发中心，登录

```

