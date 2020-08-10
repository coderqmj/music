// 官方的
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// 自己的变量
import { getTopListAction } from '../../store/actionCreators';

// 组件
import TopRanking from '@/components/top-ranking'
import ThemeHeaderRCM from '@/components/theme-header-rcm'
import { RankingWrapper } from "./style";

export default memo(function RecommendRanking() {



  // redux hooks
  const {upRanking,newRanking,originRanking} = useSelector(state => ({
    upRanking: state.getIn(["recommend","upRanking"]),
    newRanking: state.getIn(["recommend","newRanking"]),
    originRanking: state.getIn(["recommend","originRanking"])
  }),shallowEqual)
  const dispath = useDispatch();
  // 其他hooks
  useEffect(() => {
    dispath(getTopListAction(0));
    dispath(getTopListAction(2));
    dispath(getTopListAction(3));
  }, [dispath])

  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单" />
      <div className="tops">
        <TopRanking info={upRanking}/>
        <TopRanking info={newRanking}/>
        <TopRanking info={originRanking}/>
      </div>
    </RankingWrapper>
  )
})
