import { combineReducers } from "redux-immutable";

import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";

import {reducer as playReducer} from '../pages/palyer/store'

const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playReducer
})

export default cReducer;