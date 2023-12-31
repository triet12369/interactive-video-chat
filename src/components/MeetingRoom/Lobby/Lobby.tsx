import React, { FC } from 'react';
import { Stack } from '@mantine/core';
import { MeetingInfo } from '@/src/types/meeting';
import UserList from '../UserList/UserList';
import styles from './Lobby.module.scss';
import VideoCall from '../../Video/VideoCall/VideoCall';
import { useVideoStreamControl } from '@/src/providers/VideoStreamProvider';

type LobbyProps = MeetingInfo;

const Lobby: FC<LobbyProps> = (props) => {
  const { userIds } = props;
  const { isInitialized } = useVideoStreamControl();

  return (
    isInitialized ? <div className={styles['lobby-wrapper']}>
      <VideoCall {...props}/>
      <Stack className={styles["user-list"]}>
        <UserList userIds={userIds} />
      </Stack>
    </div> : <></>
  );
};

export default Lobby;
