import React, { memo } from 'react'

import {
  PlayerLeft,
  PlayerRight,
  PlayerWrapper
} from './style'

export default memo(function Player() {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>PlayInfo</h2>
          <h2>Songconetnt</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>Songs</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
