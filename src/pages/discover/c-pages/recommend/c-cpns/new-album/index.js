import React, { memo, useEffect } from 'react'

import ThemeHeaderRCM from '@/components/theme-header-rcm'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { getNewAlbumAction } from '../../store/actionCreators'

export default memo(function NewAlbum() {

  const { newAlbum } = useSelector(state => ({
    newAlbum: state.getIn(['recommend', "newAlbum"])
  }), shallowEqual)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewAlbumAction(6))
  }, [dispatch])

  return (
    <div>
      <ThemeHeaderRCM title="新碟上架" />

      <div>
        {
          newAlbum.map((item, index) => {
            return <div key={item.id}>{item.name}</div>
          })
        }
      </div>
    </div>
  )
})
