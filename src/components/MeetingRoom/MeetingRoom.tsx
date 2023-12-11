import React, { useEffect, useState } from 'react'
import { VideoStreamProvider } from '@/src/providers/VideoStreamProvider';
import Lobby from './Lobby/Lobby';
import { MeetingInfo } from '@/src/types/meeting';
import Meeting from './Meeting/Meeting';
import classes from "./MeetingRoom.module.scss";
import useGetRoomInfo from '@/src/hooks/api/useGetRoomInfo';
import useRegisterSession from '@/src/hooks/api/useRegisterSession';

const MeetingRoom = (props: MeetingInfo) => {
  const { roomId } = props;
  const [isLobby, setIsLobby] = useState(true);
  const { data } = useGetRoomInfo(roomId);
  const { mutate: deregister } = useRegisterSession({ roomId, deregister: true });

  useEffect(() => {
    const handleDeregister = () => deregister();
    window.addEventListener("beforeunload", handleDeregister);
    return () => window.removeEventListener("beforeunload", handleDeregister)
  }, [deregister]);

  if (!data) return <>Loading...</>;

  return (
    <VideoStreamProvider>
      <div className={classes.layout}>
        {isLobby ?
          <Lobby
            roomId={roomId}
            userIds={data.userIds}
            onJoinMeeting={() => setIsLobby(false)}/> :
          <Meeting
            roomId={roomId}
            userIds={data.userIds}
          />}
      </div>
    </VideoStreamProvider>
  )
}

export default MeetingRoom;