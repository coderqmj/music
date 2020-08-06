import { Map } from "immutable";

import * as actionTypes from './constants';

const defaultState = Map({
  topBanners: []
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      // return {...state,topBanners: action.topBanners} 原有的修改方式性能低
      return state.set("topBanners",action.topBanners)
    default:
      return state;
  }
}

export default reducer;