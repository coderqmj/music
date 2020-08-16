import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { NavLink } from "react-router-dom";


import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
import { getSongDetailAction, changeSequenceAction, changeCurrentSong, changeCurrentLyricIndexAction } from '../store/actionCreators';

import {
  Slider,
  message
} from "antd";
import { PlaybarWrapper, Control, Operator, PlayInfo } from "./style";
export default memo(function AppPlayerBar() {

  // props & state
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // redux hooks
  const { currentSong, sequence, playList, lyricList, currentLyricIndex } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(['player', "sequence"]),
    playList: state.getIn(['player', 'playList']),
    lyricList: state.getIn(['player', 'lyricList']),
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex'])
  }), shallowEqual)
  const dispatch = useDispatch()

  // 其他hooks
  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    });
  }, [currentSong])

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

  const handleEnded = () => {
    if (sequence === 2) { // 单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play()
    } else { // 其他
      dispatch(changeCurrentSong(1))
    }
  }
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])




  // 监听播放
  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    setCurrentTime(currentTime * 1000)
    // setCurrentTime(e.target && e.target.currentTime * 1000)
    if (!isChange) {
      setProgress((currentTime * 1000 / duration) * 100)
    }
    // 获取当前歌词
    let i = 0;
    for (; i<lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime * 1000 < lyricItem.time) {
        break;
      }
    }
    // console.log(lyricList[currentLyricIndex-1])
    if (currentLyricIndex !== i - 1) {
      dispatch(changeCurrentLyricIndexAction(i - 1))
      const content = lyricList[i-1] && lyricList[i-1].content
      message.open({
        key: "lyric",
        content: content,
        duration:0
      })
    }
  }

  // 监听滑块
  const sliderChange = useCallback((value) => {
    setIsChange(true)
    setProgress(value)
  }, [])

  // 监听滑块
  const sliderAfterChange = useCallback((value) => {
    const currentTime = value * duration / 100 / 1000
    audioRef.current.currentTime = currentTime
    setCurrentTime(currentTime * 1000)
    setIsChange(false)

    if (!isPlaying) {
      playMusic()
    }
  }, [duration, isPlaying, playMusic])

  // 监听播放模式
  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence))
  }
  // 切换音乐
  const changeMusic = (tag) => { //-1代表上一首 1代表下一首
    dispatch(changeCurrentSong(tag))
  }
  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_player prev" onClick={e => changeMusic(-1)}></button>
          <button className="sprite_player play" onClick={e => playMusic()}></button>
          <button className="sprite_player next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
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
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_player btn playlist">
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>

      <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} onEnded={handleEnded} />
    </PlaybarWrapper>
  )
})

