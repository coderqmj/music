import React, { memo, useEffect, useRef, useCallback, useState } from 'react'
// import { getTopBannerAction } from "./store/actionCreators";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getTopBannerAction } from "../../store/actionCreators";

import { Carousel } from 'antd';
import {
  BannerWrapper,
  BannerControl,
  BannerLeft,
  BannerRight
} from "./style";

export default memo(function TopBanner() {

  // state
  const [currentIndex, setCurrentIndex] = useState(0);

  // 组件和redux关联：获取数据和进行操作

  // 第一个参数回调函数，
  const { topBanners } = useSelector(state => ({
    // topBanners: state.get("recommend").get("topBanners") 两个get不好
    topBanners: state.getIn(["recommend", "topBanners"])
  }), shallowEqual)

  // hook
  const dispatch = useDispatch();

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch])

  // 其他hooks
  const bannerRef = useRef()

  const bannerChange = useCallback((from,to) => {
    setCurrentIndex(to);
  },[])

  // 业务逻辑
  // 1.取出当前轮播图
  const bgImage = topBanners[currentIndex] && topBanners[currentIndex].imageUrl + "?imageView&blur=40x20"


  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
            {
              topBanners.map((item,index) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>

        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={ e => bannerRef.current.prev() }></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
