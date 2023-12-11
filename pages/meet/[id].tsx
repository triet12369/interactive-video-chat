import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import MeetingRoom from '@/src/components/MeetingRoom/MeetingRoom';
import useRegisterSession from '@/src/hooks/api/useRegisterSession';

const Meeting: FC<{roomId: string}> = (props) => {
  const { roomId } = props;
  const { data, mutate } = useRegisterSession({roomId});
  
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (!data) return <>Loading...</>;
  return (
    <MeetingRoom {...data}/>
  );
}

export default function MeetingWrapper() {
  const { query } = useRouter();
  const roomId = query.id;

  if (!roomId || typeof roomId !== "string") return <></>;
  return <Meeting roomId={roomId} />
  
}
