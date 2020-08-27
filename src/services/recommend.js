import request from './request';

export function getTopBanners() {
  return request({
    url: "/banner"
  })
}

export function getHotRecommend(limit) {
  return request({
    url: "/personalized?",
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit) {
  return request({
    url: "/top/album",
    params: {
      limit
    }
  })
}

export function getTopList(idx) {
  return request({
    url: "/top/list",
    params: {
      idx
    }
  })
}

// 获取入住歌手+s
export function getSettleSinger(limit,cat) {
  return request({
    url: '/artist/list',
    params: {
      cat,
      limit
    }
  })
}