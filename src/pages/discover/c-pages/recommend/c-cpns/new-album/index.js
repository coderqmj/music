import React, { memo, useEffect, useRef } from 'react'

import { Carousel } from "antd";
import ThemeHeaderRCM from '@/components/theme-header-rcm'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { getNewAlbumAction } from '../../store/actionCreators'

import { AlbumWrapper } from "./style";
import AlbumCover from '@/components/album-cover'

export default memo(function NewAlbum() {

  const { newAlbum } = useSelector(state => ({
    newAlbum: state.getIn(['recommend', "newAlbum"])
  }), shallowEqual)

  const dispatch = useDispatch();


  // 其他hooks
  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])

  const pageRef = useRef();

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架" />

      <div className="content">
        <button className="arrow arrow-left sprite_02" onClick={e => pageRef.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {
              [0, 1].map(item => {
                return(
                  <div key={item} className="page">
                    {
                      newAlbum.slice(item*5,(item+1)*5).map(iten => {
                        return (
                          <AlbumCover key={iten.id} info={iten} size={100} width={118} bgp="-570px">
                            {iten.name}
                          </AlbumCover>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02"  onClick={e => pageRef.current.next()}></button>
        {/* {
          newAlbum.map((item, index) => {
            return <div key={item.id}>{item.name}</div>
          })
        } */}
      </div>
    </AlbumWrapper>
  )
})
