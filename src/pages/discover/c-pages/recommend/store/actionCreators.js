import * as actionTypes from './constants';

import {
  getTopBanners,
  getHotRecommend,
  getNewAlbum,
  getTopList
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
      // console.log(res)
      dispatch(changeNewAlbumAction(res))
    })
  }
}

// 排行榜相关
const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist
})
const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})
const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})
export const getTopListAction = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      console.log(res)
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res))
          break;
        case 2:
          dispatch(changeNewRankingAction(res))
          break;
        case 3:
          dispatch(changeOriginRankingAction(res))
          break;
        default:
      }
      // dispatch(changeTopListAction(res))
    })
  }
}