import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { HOT_RECOMMEND_LIMIT as limit } from "@/common/contants";

import ThemeHeaderRCM from '@/components/theme-header-rcm'

import { HotRecommendWrapper } from "./style";
import { getHotRecommendAction } from '../../store/actionCreators';

export default memo(function HotRecommend() {
  // 内部state

  // redux hooks
  const { hotRecommend } = useSelector(state => ({
    hotRecommend: state.getIn(['recommend','hotRecommend'])
  }),shallowEqual)
  const dispatch = useDispatch();

  // 其他hooks
  useEffect(()=>{
    dispatch(getHotRecommendAction(limit))
  },[dispatch])
  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title="热门推荐" keywords={["华语",'流行','摇滚','民谣','电子']} />
      <div className="recommend-list">
        {
          hotRecommend.map((item,index)=>{
            return (
              <div>
                {item.name}
              </div>
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
