import { Map } from "immutable";
import * as actionTypes from './contants'
const defaultState = Map({
  currentSong: {},
  palyList: [],
  currentSongIndex: 0
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong)
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.palyList)
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.index)
    default:
      return state;
  }
}

export default reducer;