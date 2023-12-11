import type { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes';
import Memory from '@/src/service/memoryManager';
import { HEADER_DEVICE_ID } from '@/src/constants/apiConstants';
import { USER_TYPE, User } from '@/src/types/user';
 
export type RegisterSessionResult = { userIds: string[]; roomId: string };
export type RegisterSessionRequest = { roomId: string, deregister?: boolean };
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterSessionResult>
) {
  switch (req.method) {
  case "POST": {
    const { roomManager, userManager } = Memory;
    const { roomId, deregister = false } = req.body as RegisterSessionRequest;
    const deviceId = req.headers[HEADER_DEVICE_ID.toLowerCase()];
    if (!deviceId || !roomId || typeof deviceId !== "string") return res.status(400).end();
    const user: User = {
      id: deviceId,
      type: USER_TYPE.PRIMARY, // all users are primary for now
    };
  
    userManager.set(user.id, user);
  
    // check if room already exists
    // if room exists, join current room
    // if room does not exists, create new
    const room = roomManager.getOrCreateRoom(roomId);

    if (deregister) {
      room.deleteUser(user.id);
    } else room.addUser(user.id);
    return res.status(StatusCodes.OK).json({ userIds: [...room.userIds], roomId });
  }
  default:
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}