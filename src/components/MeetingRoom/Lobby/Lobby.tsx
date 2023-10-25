import React, { FC } from 'react';
import { Button, Grid, Stack } from '@mantine/core';
import { MeetingInfo } from '@/src/types/meeting';
import { useVideoStreamControl } from '@/src/providers/VideoStreamProvider';
import VideoFrame from '../../VideoFrame/VideoFrame';
import UserList from '../UserList/UserList';

type LobbyProps = MeetingInfo & {
  onJoinMeeting: () => void;
};

const Lobby: FC<LobbyProps> = (props) => {
  const { onJoinMeeting, userIds } = props;
  const controls = useVideoStreamControl();
  return (
    <Grid w="100%" h="100%" grow>
      <Grid.Col span={8}>
        <VideoFrame {...controls} />
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack>
          <UserList userIds={userIds} />
          <Button onClick={onJoinMeeting}>Join Room</Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Lobby;
