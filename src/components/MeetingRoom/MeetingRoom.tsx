import React, { useState } from 'react'
import { VideoStreamProvider } from '@/src/providers/VideoStreamProvider';
import Lobby from './Lobby/Lobby';
import { MeetingInfo } from '@/src/types/meeting';
import Meeting from './Meeting/Meeting';
import classes from "./MeetingRoom.module.scss";

const MeetingRoom = (props: MeetingInfo) => {
  const [isLobby, setIsLobby] = useState(true);

  return (
    <VideoStreamProvider>
      <div className={classes.layout}>
        {isLobby ? <Lobby {...props} onJoinMeeting={() => setIsLobby(false)}/> : <Meeting {...props} />}
      </div>
    </VideoStreamProvider>
  )
}

export default MeetingRoom;