import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux";


import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
import { getSongDetailAction } from '../store/actionCreators';

import {
  Slider
} from "antd";
import { PlaybarWrapper, Control, Operator, PlayInfo } from "./style";
export default memo(function AppPlayerBar() {

  // props & state
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // redux hooks
  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"])
  }), shallowEqual)
  const dispatch = useDispatch()

  // 其他hooks
  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
  },[currentSong])

  const audioRef = useRef()

  // 处理函数
  const picUrl = currentSong.al && currentSong.al.picUrl
  const singerName = (currentSong.ar && currentSong.ar[0].name) || 'qmj'
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss")
  const showCurrentTime = formatDate(currentTime, "mm:ss")

  // 经常发生改变，不能定义常量
  // const progress = (currentTime / duration) * 100

  // 处理函数

  // 播放函数
  const playMusic = useCallback(() => {
    isPlaying?audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  },[isPlaying])

  // 监听播放
  const timeUpdate = (e) => {
    setCurrentTime(e.target && e.target.currentTime * 1000)
    if(!isChange) {
      setProgress((currentTime / duration) * 100)
    }
  }

  // 监听滑块
  const sliderChange = useCallback((value) => {
    setIsChange(true)
    setProgress(value)
  }, [])

  // 监听滑块
  const sliderAfterChange = useCallback((value) => {
     const currentTime = value*duration/100/1000
    audioRef.current.currentTime = currentTime
    setCurrentTime(currentTime*1000)
    setIsChange(false)

    if(!isPlaying) {
      playMusic()
    }
  }, [duration,isPlaying,playMusic])

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_player prev"></button>
          <button className="sprite_player play" onClick={e => playMusic()}></button>
          <button className="sprite_player next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <a href="/todo">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </a>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a className="singer-name" href="/todo">{singerName}</a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop"></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>

      <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} />
    </PlaybarWrapper>
  )
})
