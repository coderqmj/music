import React, { memo } from 'react'

import { RecommendWrapper } from "./style";
import TopBanner from './c-cpns/top-banner'


// t通过redux hooks
function Recommend(props) {


  return (
    <RecommendWrapper>
      <TopBanner></TopBanner>
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