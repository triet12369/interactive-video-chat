import React, { FC } from 'react';
import { Stack } from '@mantine/core';
import { MeetingInfo } from '@/src/types/meeting';
import UserList from '../UserList/UserList';
import styles from './Lobby.module.scss';
import VideoCall from '../../Video/VideoCall/VideoCall';

type LobbyProps = MeetingInfo;

const Lobby: FC<LobbyProps> = (props) => {
  const { userIds } = props;


  return (
    <div className={styles['lobby-wrapper']}>
      <VideoCall {...props}/>
      <Stack className={styles["user-list"]}>
        <UserList userIds={userIds} />
      </Stack>
    </div>
  );
};

export default Lobby;
