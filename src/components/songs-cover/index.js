import React, { memo } from 'react'
import { SongsCoverWrapper } from "./style";
export default memo(function SongsCover(props) {

  const { info } = props;

  return (
    <SongsCoverWrapper>
      <div className="cover-top">
        <img src={info.picUrl} alt=""/>
      </div>
      <div className="cover-bottom"></div>
      <div className="cover-source"></div>
    </SongsCoverWrapper>
  )
})
