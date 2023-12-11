import type { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes';
import Memory from '@/src/service/memoryManager';
import getRandomRoomId from '@/src/service/roomManager/getRandomRoomId';
 
export type CreateRoomResponse = { roomId: string};
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateRoomResponse>
) {
  switch (req.method) {
  case "POST": {
    const { roomManager } = Memory;
    
    let newRoomId;
    while (!newRoomId) {
      const roomNum = getRandomRoomId();
      const room = roomManager.getRoom(roomNum);
      if (!room) {
        roomManager.createRoom(roomNum);
        newRoomId = roomNum
      };
    }
    return res.status(StatusCodes.OK).json({ roomId: newRoomId });
  }
  default:
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}