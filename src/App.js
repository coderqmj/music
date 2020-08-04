import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'

import routes from './router'

import AppHeader from 'components/app-header'
import AppFooter from 'components/app-footer'
import { HashRouter } from 'react-router-dom'

export default memo(function App() {
  return (
    <HashRouter>
      <AppHeader />
      {renderRoutes(routes)}
      <AppFooter/>
    </HashRouter>
  )
})
