import { RoomID } from '@/src/types/room';
import Room from './Room';

/**
 * This is the base class of Room Manager
 * We use this class to add/remove/get rooms for video calling
 */
abstract class RoomManagerBase {
  abstract getRoom(roomId: RoomID): Room | null;
  abstract getOrCreateRoom(roomId: RoomID): Room;
  abstract deleteRoom(roomId: RoomID): boolean;
  abstract createRoom(roomId: RoomID): Room;
}

export default RoomManagerBase;
