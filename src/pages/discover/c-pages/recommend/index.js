import React, { memo } from 'react'

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";
import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import RecommendRanking from './c-cpns/recommend-ranking'


// t通过redux hooks
function Recommend(props) {


  return (
    <RecommendWrapper>
      <TopBanner></TopBanner>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend/>
          <NewAlbum />
          <RecommendRanking />
        </RecommendLeft>
        <RecommendRight>

        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(Recommend);

// 通过connect，连接组件和redux，请求太多不推荐

// function Recommend(props) {


//   const { getBanners, topBanners } = props;
//   useEffect(() => {
//     getBanners()
//   }, [getBanners])

//   return (
//     <div>
//       <h2>Recommend Page</h2>
//       <h2>数据：{topBanners.length}</h2>
//     </div>
//   )
// }

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// });

// const mapDispatchToPRops = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction())
//   }
// });


// export default connect(mapStateToProps, mapDispatchToPRops)(memo(Recommend));