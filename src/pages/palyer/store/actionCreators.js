import {getSongDetail} from '@/services/player'

import * as actionTypes  from "./contants";

// 负责放入reducer

const changeCurrentSongAction = (currentSong) =>( {
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})

// 负责拿到数据
export const getSongDetailAction = (ids) => {
  return dispatch => {
    getSongDetail(ids).then(res => {
      console.log(res)
      dispatch(changeCurrentSongAction(res.songs[0]))
    })
  }
}