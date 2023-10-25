import { GetServerSideProps } from 'next';
import registerSession from '@/src/service/sessionManager/registerSession';
import { MeetingInfo } from '@/src/types/meeting';
import MeetingRoom from '@/src/components/MeetingRoom/MeetingRoom';

export const getServerSideProps: GetServerSideProps<MeetingInfo> = async (context) => {
  const { roomId, userIds } = registerSession(context);

  return {
    props: {
      roomId,
      userIds,
    },
  };
};

export default function Meeting(props: MeetingInfo) {
  return (
    <MeetingRoom {...props}/>
  );
}
