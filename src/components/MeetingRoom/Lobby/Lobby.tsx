import React, { FC } from 'react';
import { MeetingInfo, MeetingStreamInfo } from '@/src/types/meeting';

type LobbyProps = MeetingInfo & MeetingStreamInfo;

const Lobby: FC<LobbyProps> = (props) => {
  const { roomId, userIds, stream } = props;
  return (
    <div>
      {stream && (
        <video
          ref={(ref) => {
            if (ref) ref.srcObject = stream;
          }}
          autoPlay
        >
          <track kind="captions"/>
        </video>
      )
      }
    </div>
  );
};

export default Lobby;
