import React, { FC, useEffect, useRef } from 'react'
import classes from "./VideoFrame.module.scss";

type VideoFrameProps = {
  stream: MediaStream | null;
  isActive: boolean;
};

const VideoFrame: FC<VideoFrameProps> = (props) => {
  const { stream, isActive } = props;
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current && isActive) {
      ref.current.srcObject = stream;
    }
  }, [isActive, stream]);

  return (
    <div className={classes.wrapper}>
      <video
        ref={ref}
        autoPlay
      >
        <track kind="captions"/>
      </video>
    </div>
  )
}

export default VideoFrame;