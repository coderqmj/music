import React, { memo } from 'react'

import {
  getCount,
  getSizeImage
} from '@/utils/format-utils.js'

import { SongsCoverWrapper } from "./style";


export default memo(function SongsCover(props) {

  const { info } = props;
  // console.log(info)
  return (
    <SongsCoverWrapper>
      <div className="cover-top">
        <img src={getSizeImage(info.picUrl,140)} alt=""/>
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(info.playCount)}
              {/* {info.playCount} */}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">
        {info.name}
      </div>
      <div className="cover-source text-nowrap">
        by {info.copywriter || info.creator.nickname}
      </div>
    </SongsCoverWrapper>
  )
})
