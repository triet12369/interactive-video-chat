import { GetServerSideProps } from 'next';
import { useState } from 'react';
import registerSession from '@/src/service/sessionManager/registerSession';
import Lobby from '@/src/components/MeetingRoom/Lobby/Lobby';
import Meeting from '@/src/components/MeetingRoom/Meeting/Meeting';
import { MeetingInfo } from '@/src/types/meeting';
import useVideoStream from '@/src/hooks/useVideoStream';

export const getServerSideProps: GetServerSideProps<MeetingInfo> = async (context) => {
  const { roomId, userIds } = registerSession(context);

  return {
    props: {
      roomId,
      userIds,
    },
  };
};

export default function MeetingRoom(props: MeetingInfo) {
  const [isLobby, setIsLobby] = useState(true);
  const { stream } = useVideoStream();
  return (
    <>
      {isLobby ? <Lobby {...props} stream={stream} /> : <Meeting {...props} />}
    </>
  );
}
