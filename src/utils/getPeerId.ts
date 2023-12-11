
export const PEER_ID_PREFIX = "itutor-";
export const getPeerId = (userId: string) => `${PEER_ID_PREFIX}${userId}`;