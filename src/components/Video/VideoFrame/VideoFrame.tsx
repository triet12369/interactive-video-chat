/* eslint-disable react/no-unknown-property */
import React, { FC, LegacyRef, useEffect, useRef } from 'react'
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import classes from "./VideoFrame.module.scss";

type VideoFrameProps = {
  stream: MediaStream | null;
  isActive: boolean;
  className?: string;
};

type Size = {
  width: number;
  height: number;
}

function calculateSize(srcSize: Size, dstSize: Size) {
  const srcRatio = srcSize.width / srcSize.height;
  const dstRatio = dstSize.width / dstSize.height;
  if (dstRatio > srcRatio) {
    return {
      width:  dstSize.height * srcRatio,
      height: dstSize.height
    };
  } 
  return {
    width:  dstSize.width,
    height: dstSize.width / srcRatio
  };
  
}

const VideoFrame: FC<VideoFrameProps> = (props) => {
  const { stream, isActive, className } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, { width, height }] = useMeasure();

  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.srcObject = stream;
    }
  }, [isActive, stream]);

  useEffect(() => {
    let requestID: number;
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const renderFrame = () => {
        if (!window.requestAnimationFrame) return;
        requestID = requestAnimationFrame(renderFrame);
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          // scale and horizontally center the camera image
          const videoSize = { width: video.videoWidth, height: video.videoHeight };
          const canvasSize = { width: canvas.width, height: canvas.height };
          const renderSize = calculateSize(videoSize, canvasSize);
          const xOffset = (canvasSize.width - renderSize.width) / 2;
          const yOffset = (canvasSize.height - renderSize.height) / 2;
          context?.drawImage(video, xOffset, yOffset, renderSize.width, renderSize.height);
        }
      }
      renderFrame();
    }
    return () => {
      requestID && cancelAnimationFrame(requestID);
    }
  }, []);

  return (
    <div className={classNames(classes.wrapper, className)} ref={ref as LegacyRef<HTMLDivElement>}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
      <video
        ref={videoRef}
        autoPlay
        playsInline
      >
        <track kind="captions"/>
      </video>
    </div>
  )
}

export default VideoFrame;