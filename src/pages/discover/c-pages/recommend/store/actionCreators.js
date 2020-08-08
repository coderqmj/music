import * as actionTypes from './constants';

import { 
  getTopBanners,
  getHotRecommend,
  getNewAlbum
} from '@/services/recommend'


// 1.轮播图数据
const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      // console.log(res)
      dispatch(changeTopBannerAction(res))
    })
  }
}

// 2.热门推荐数据
const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommend: res.result
})

export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommend(limit).then(res => {
      // console.log(res)
      dispatch(changeHotRecommendAction(res))
    })
  }
}

// 3.新碟专辑数据
const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbum: res.albums
})

export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbum(limit).then(res => {
      // const albums = res.albums;
      console.log(res)
      dispatch(changeNewAlbumAction(res))
    })
  }
}