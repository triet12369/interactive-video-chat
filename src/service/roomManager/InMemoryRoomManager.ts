import { RoomOptions, RoomID } from '@/src/types/room';
import RoomManagerBase from './RoomManagerBase';
import Logger from '../log';
import Room from './Room';

/**
 * Manage list of rooms in memory instead of database
 */
class InMemoryRoomManager extends RoomManagerBase {
  private roomList: Map<RoomID, Room>;
  constructor() {
    super();
    this.roomList = new Map();
  }
  getRoom(id: RoomID): Room | null {
    return this.roomList.get(id) || null;
  }
  getOrCreateRoom(id: RoomID): Room {
    let room = this.roomList.get(id);
    if (!room) {
      room = this.createRoom(id);
    }
    return room;
  }
  createRoom(roomId: RoomID, roomOptions: Partial<RoomOptions> = {}): Room {
    const newRoom = new Room({
      id: roomId,
      ...roomOptions,
    });
    this.roomList.set(roomId, newRoom);
    return newRoom;
  }
  deleteRoom(roomId: RoomID): boolean {
    try {
      this.roomList.delete(roomId);
      return true;
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }
}

export default InMemoryRoomManager;
