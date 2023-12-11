import React, { FC, useEffect } from 'react';
import { Button, Grid, Stack } from '@mantine/core';
import { MeetingInfo } from '@/src/types/meeting';
import { useVideoStreamControl } from '@/src/providers/VideoStreamProvider';
import usePeerConnection from '@/src/hooks/useVideoConnection';
import VideoFrame from '../../VideoFrame/VideoFrame';

type MeetingProps = MeetingInfo;

const Meeting: FC<MeetingProps> = (props) => {
  const { userIds } = props;
  const controls = useVideoStreamControl();
  const { stream: ownStream } = controls;

  const { peerStream, startVideoCall, stopVideoCall } = usePeerConnection({ ownStream, userIds })

  useEffect(() => {
    window.addEventListener("beforeunload", stopVideoCall);
    return () => window.removeEventListener("beforeunload", stopVideoCall)
  }, [stopVideoCall]);

  return <Grid>
    <Stack>
      <VideoFrame {...controls} />
      {peerStream && <VideoFrame stream={peerStream} isActive />}
      <Button onClick={() => startVideoCall()}>Call</Button>
      <Button onClick={() => stopVideoCall()}>Stop call</Button>
    </Stack>
  </Grid>;
};

export default Meeting;
