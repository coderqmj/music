import React, { memo } from 'react'
import { Provider } from "react-redux";

import { renderRoutes } from 'react-router-config'
import store from '@/store'

import routes from './router'

import AppHeader from 'components/app-header'
import AppFooter from 'components/app-footer'
import { HashRouter } from 'react-router-dom'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        {renderRoutes(routes)}
        <AppFooter />
      </HashRouter>
    </Provider>

  )
})
