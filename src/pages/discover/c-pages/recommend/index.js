import React, { memo, useEffect } from 'react'
import { connect, useSelector, useDispatch } from "react-redux";

import { getTopBannerAction } from "./store/actionCreators";

// t通过redux hooks
function Recommend(props) {
  // 组件和redux关联：获取数据和进行操作
  const {topBanners} = useSelector(state => ({
    topBanners: state.recommend.topBanners
  }))
  const dispatch = useDispatch();

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch])

  return (
    <div>
      <h2>Recommend Page</h2>
      <h2>数据：{topBanners.length}</h2>
    </div>
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