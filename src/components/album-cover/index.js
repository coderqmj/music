import React, { memo } from 'react'

import { getSizeImage } from "@/utils/format-utils";

import { AlbumWrapper } from './style'

export default memo(function AblbumCover(props) {

  const {info, size = 130, width = 153, bgp='-845px'} = props;

  return (
    <div>
      <AlbumWrapper size={size} width={width} bgp={bgp}>
        <div className="album-image">
          <img src={getSizeImage(info.picUrl,size)} alt=""/>
          <a href="/todo" className="cover image_cover">邱模建</a>
        </div>
        <div className="album-info">
          <div className="name">{info.name}</div>
          <div className="artist">{info.artist.name}</div>
        </div>
      </AlbumWrapper>
    </div>
  )
})
