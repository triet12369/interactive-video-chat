import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { v4 } from 'uuid';
import { RoomID } from '@/src/types/room';
import { USER_TYPE, User } from '@/src/types/user';
import Memory from '../memoryManager';

export type RegisterSessionResult = {
  roomId: RoomID | null;
  userIds: string[];
};

const registerSession = (context: GetServerSidePropsContext): RegisterSessionResult => {
  const { query } = context;
  const roomId = query.id;
  const cookies = nookies.get(context);

  if (!roomId || typeof roomId !== 'string') {
    return {
      roomId: null,
      userIds: [],
    };
  }

  // check if deviceId exists, if not asign a random uuidv4
  const { deviceId } = cookies;
  let newDeviceId = deviceId;
  if (!deviceId) {
    newDeviceId = v4();
    nookies.set(context, 'deviceId', newDeviceId);
  }

  const user: User = {
    id: deviceId || newDeviceId,
    type: USER_TYPE.PRIMARY, // all users are primary for now
  };

  Memory.userManager.set(user.id, user);

  // check if room already exists
  // if room exists, join current room
  // if room does not exists, create new
  const room = Memory.roomManager.getOrCreateRoom(roomId);
  room.addUser(user.id);

  return { roomId: room.id, userIds: [...room.userIds] };
};

export default registerSession;
