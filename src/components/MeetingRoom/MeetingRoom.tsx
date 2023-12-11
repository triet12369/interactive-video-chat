import React, { useEffect } from 'react'
import { VideoStreamProvider } from '@/src/providers/VideoStreamProvider';
import Lobby from './Lobby/Lobby';
import { MeetingInfo } from '@/src/types/meeting';
import classes from "./MeetingRoom.module.scss";
import useGetRoomInfo from '@/src/hooks/api/useGetRoomInfo';
import useRegisterSession from '@/src/hooks/api/useRegisterSession';

const MeetingRoom = (props: MeetingInfo) => {
  const { roomId } = props;
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
        <Lobby
          roomId={roomId}
          userIds={data.userIds}
        /> 
      </div>
    </VideoStreamProvider>
  )
}

export default MeetingRoom;