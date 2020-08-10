## 一、项目初始化

### 1.1.划分项目结构

#### 组件内部代码划分

内部数据state -> redux相关 -> 其他hooks -> 其他逻辑 -> 返回JSX 

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

#### 对官网路由进行优化

原官网进入域名时，域名匹配的是发现页面，但这个时候重定向到发现页面的路由会更好点

相关配置

```js
import React from 'react'
import { Redirect } from 'react-router-dom'
{ path:"/", exact:true, render: () =>(  <Redirect  to="/discover" />  ) },

```

### 2.2.axios二次封装

servicces/config.js

```js
const devBaseURL = "http://123.207.32.32:9001/";
const proBaseURL = "https://production.org";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;

```

services/request.js

```js
import axios from 'axios';

import { BASE_URL, TIMEOUT } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

instance.interceptors.request.use(config => {
  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

  // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

  // 3.params/data序列化的操作
  console.log("请求被拦截");

  return config;
}, err => {

});

instance.interceptors.response.use(res => {
  return res.data;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log("请求错误");
        break;
      case 401:
        console.log("未授权访问");
        break;
      default:
        console.log("其他错误信息");
    }
  }
  return err;
});

export default instance;
```

### 2.3使用immutableJS对修改数据进行优化

- 使用Map包裹state
- 使用state.set修改数据
- 通过get取数据

### 2.4合并reducer优化——redux-immutable

- 使用数据也要进行get

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

### 4.2发现页面

#### 子路由

配置：

```js
{
    path: '/discover', 
    component: Discover,
    routes: [
      {
        path: "/discover",
        render: () => (
          <Redirect to="/discover/recommend" />
        )
      },
      {
        path: "/discover/recommend",
        component: Recommend
      },
      {
        path: "/discover/ranking",
        component: Ranking
      },
      {
        path: "/discover/songs",
        component: Songs
      },
      {
        path: "/discover/djradio",
        component: Djradio
      },
      {
        path: "/discover/artist",
        component: Artist
      },
      {
        path: "/discover/album",
        component: Album
      },
    ]
  },
```

拿到路由，在discover页面进行站位

- 通过props可以拿到配置信息route
- 再用renderRoutes站位

```jsx
export default memo(function Discover(props) {
  const { route } = props;
  return (
      <DiscoverWrapper>        
        <div className="top">
          <TopMenu className="wrap-v1">
            {
              discoverMenu.map((item,index)=>{
                return (
                  <div className="item" key={item.title}>
                    <NavLink to={item.link}>{item.title}</NavLink>
                  </div>
                )
              })
            }
          </TopMenu>
        </div>
        {renderRoutes(route.routes)} 
      </DiscoverWrapper>
  )
})
```

### 4.3推荐页面

#### redux整合

- 在每个页面创建属于自己的store，并导出reducer
- 在src/store/reducer.js导入并合并各个页面的reducer
- 在src/store/index.js里面导入合并的reducer，用中间件处理，并且导出store
- 在App.js里面用Provider共享所有数据

store/reducer.js

- 合并reducer

```js
import { combineReducers } from "redux";

import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";

const cReducer = combineReducers({
  recommend: recommendReducer
})

export default cReducer;
```

store/index.js

- 导出store，用于共享数据

```js
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

export default store;
```

App.js

- 数据共享

```js
import store from '@/store'

<Provider store={store}>
      <HashRouter>
        <AppHeader />
        {renderRoutes(routes)}
        <AppFooter />
      </HashRouter>
 </Provider>
```



#### recommend的redux书写

reducer.js:

```js
import * as actionTypes from './constants';

const defaultState = {
  topBanners: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return {...state,topBanners: action.topBanners}
    default:
      return state;
  }
}

export default reducer;
```

store/index.js

```js
import reducer from './reducer'

export {
  reducer
}
```

store/actionCreators.js

```js
import * as actionTypes from './constants';

import { getTopBanners } from '@/services/recommend'

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      console.log(res)
      dispatch(changeTopBannerAction(res))
    })
  }
}
```

recommend/index.js

```js
import React, { memo, useEffect } from 'react'
import {connect, useSelector, useDispatch } from "react-redux";

import { getTopBannerAction } from "./store/actionCreators";

// t通过redux hooks
function Recommend(props) {
  // 组件和redux关联：获取数据和进行操作

  // 第一个参数回调函数，
  const {topBanners} = useSelector(state => ({
    topBanners: state.recommend.topBanners
  }))

  // hook
  const dispatch = useDispatch();

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch])

  return (
    <div>
      <h2>Recommend Page</h2>
      <h2>数据：{topBanners.length}</h2>
    </div>
  )
}

export default memo(Recommend);
```

### 4.4定义工具函数

#### getCount：对播放数量进行格式化

#### getSizeImage：对图片大小进行限制