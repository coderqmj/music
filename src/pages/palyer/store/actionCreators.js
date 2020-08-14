import { getSongDetail } from '@/services/player'

import * as actionTypes from "./contants";

// 负责放入reducer

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})
// 歌曲列表
const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
})

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
})
// 负责拿到数据
export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {

    // 1.根据id去查找playlist是否有该歌曲,找到了songIndex有值，没找到-1
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(song => song.id === ids)

    // 2.判断是否找到歌曲
    if (songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex));
      const song = playList[songIndex];
      dispatch(changeCurrentSongAction(song))
    } else { //没找到歌曲
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0]
        if(!song) return;

        // 1.将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList]
        newPlayList.push(song)

        // 2.更新redux值
        dispatch(changePlayListAction(newPlayList));
        dispatch(changeCurrentSongIndexAction(newPlayList.length-1));

        dispatch(changeCurrentSongAction(song))
      })
    }



  }
}



