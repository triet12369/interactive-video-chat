import type { NextApiRequest, NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes';
import Memory from '@/src/service/memoryManager';
 
export type GetRoomInfoByIdResponse = {
  userIds: string[]
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetRoomInfoByIdResponse>
) {
  const { id } = req.query;
  if (!id) return res.status(StatusCodes.NOT_FOUND);
  switch (req.method) {
  case "GET": {
    const { roomManager } = Memory;
    const room = roomManager.getRoom(id as string);
    if (room) {
      return res.status(StatusCodes.OK).json({ userIds: [...room.userIds] });
    }
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  default:
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}