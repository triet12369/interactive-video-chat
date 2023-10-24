import { RoomID, RoomOptions } from '@/src/types/room';
import Logger from '../log';

class Room {
  public id: RoomID;
  public userIds: Set<string>;
  constructor(roomOptions: Partial<RoomOptions>) {
    if (roomOptions.id) {
      this.id = roomOptions.id;
      this.userIds = new Set(roomOptions.userIds ? roomOptions.userIds : []);
    } else {
      const errorMsg = 'Room ID is not provided.';
      Logger.error(errorMsg);
      throw new Error(errorMsg);
    }
  }

  addUser(userId: string) {
    this.userIds.add(userId);
  }

  deleteUser(userId: string) {
    this.userIds.delete(userId);
  }
}

export default Room;
