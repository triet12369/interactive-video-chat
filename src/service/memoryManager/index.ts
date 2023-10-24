import { User } from '@/src/types/user';
import InMemoryRoomManager from '../roomManager/InMemoryRoomManager';

class MemoryManager {
  public roomManager: InMemoryRoomManager;
  public userManager: Map<string, User>;
  constructor() {
    this.roomManager = new InMemoryRoomManager();
    this.userManager = new Map();
  }
}

const Memory = new MemoryManager();

export default Memory;
