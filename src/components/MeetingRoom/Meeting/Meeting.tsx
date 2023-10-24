import React, { FC } from 'react';
import { MeetingInfo } from '@/src/types/meeting';

type MeetingProps = MeetingInfo;

const Meeting: FC<MeetingProps> = (props) => {
  const { roomId, userIds } = props;
  return <div>Meeting</div>;
};

export default Meeting;
