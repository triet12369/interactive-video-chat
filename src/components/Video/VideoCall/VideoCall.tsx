import React, { FC, useEffect } from 'react'
import { ActionIcon } from '@mantine/core';
import { IconPhone, IconX } from '@tabler/icons-react';
import classNames from 'classnames';
import usePeerConnection, { CONNECTION_STATUS } from '@/src/hooks/useVideoConnection';
import { useVideoStreamControl } from '@/src/providers/VideoStreamProvider';
import VideoFrame from '../VideoFrame/VideoFrame';
import { MeetingInfo } from '@/src/types/meeting';
import classes from "./VideoCall.module.scss";

const VideoCall: FC<MeetingInfo> = (props) => {
  const { userIds } = props;
  const controls = useVideoStreamControl();
  const { stream: ownStream } = controls;

  const { peerStream, startVideoCall, stopVideoCall, mediaStatus } = usePeerConnection({ ownStream, userIds });
  const isVideoCalling = mediaStatus === CONNECTION_STATUS.OPEN;

  useEffect(() => {
    window.addEventListener("beforeunload", stopVideoCall);
    return () => window.removeEventListener("beforeunload", stopVideoCall);
  }, [stopVideoCall]);

  return (
    <div className={classes.wrapper}>
      <VideoFrame {...controls} className={classNames(classes['own-stream'], isVideoCalling && classes.active)}/>
      {(peerStream && isVideoCalling) && <VideoFrame stream={peerStream} isActive={isVideoCalling} className={classNames(classes['main-stream'])}/>}
      <div className={classes['action-buttons']}>
        <ActionIcon color="blue" disabled={userIds.length !== 2} onClick={startVideoCall} size="lg">
          <IconPhone stroke={2}/>
        </ActionIcon>
        {isVideoCalling &&
        <ActionIcon color="red" disabled={userIds.length !== 2} onClick={stopVideoCall} size="lg">
          <IconX stroke={2}/>
        </ActionIcon>
        }
      </div>
    </div>
  )
}

export default VideoCall;