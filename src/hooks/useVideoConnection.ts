import { useCallback, useEffect, useState } from 'react'
import { DataConnection, MediaConnection } from "peerjs";
import { getUserId } from '../utils/getUserId';
import { getPeerId } from '../utils/getPeerId';
import { PeerJS } from '../types/peer';
import { useVideoStreamControl } from '../providers/VideoStreamProvider';

type UsePeerConnectionOptions = {
  userIds: string[];
  onStreamReceived?: (stream: MediaStream) => void;
}

export enum CONNECTION_STATUS {
  WAITING = "WAITING",
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

/**
 * Handle P2P connection to the other user in the room
 */
const usePeerConnection = (options: UsePeerConnectionOptions) => {
  const { userIds = [], onStreamReceived } = options;
  const controls = useVideoStreamControl();
  const { stream: ownStream } = controls;
  const currentUserId = getUserId();
  const otherUserIds = userIds.filter((userId) => userId !== currentUserId);

  const [peerManager, setPeerManager] = useState<PeerJS | undefined>();
  const [dataConn, setDataConn] = useState<DataConnection | undefined>();
  const [mediaConn, setMediaConn] = useState<MediaConnection | undefined>();
  const [dataStatus, setDataStatus] = useState<CONNECTION_STATUS>(CONNECTION_STATUS.WAITING);
  const [mediaStatus, setMediaStatus] = useState<CONNECTION_STATUS>(CONNECTION_STATUS.WAITING);
  const [peerStream, setPeerStream] = useState<MediaStream | undefined>();

  const handleReceiveStream = useCallback((stream: MediaStream) => {
    setMediaStatus(CONNECTION_STATUS.OPEN);
    setPeerStream(stream);
    onStreamReceived && onStreamReceived(stream);
  }, [onStreamReceived]);

  const handleCloseStream = useCallback(() => {
    setMediaStatus(CONNECTION_STATUS.CLOSED)
  }, []);

  // setup Peer
  useEffect(() => {
    let peer;
    if (currentUserId || window.navigator) {
      import("peerjs").then(({ default: Peer }) => {
        peer = new Peer(getPeerId(currentUserId));
        setPeerManager(peer);
      })
    }
  }, [currentUserId]);


  // open a data connection with Peer for chatting
  useEffect(() => {
    let connection: DataConnection | undefined;
    if (!otherUserIds[0] || !window.navigator) return;
    const otherPeerId = getPeerId(otherUserIds[0]);
    if (peerManager && !dataConn) {
      connection = peerManager.connect(otherPeerId);
      setDataConn(connection);
      connection?.on("open", () => setDataStatus(CONNECTION_STATUS.OPEN));
      connection?.on("close", () => setDataStatus(CONNECTION_STATUS.CLOSED));

      // on receive call
      peerManager.on("call", (call) => {
        if (ownStream) {
          setMediaConn(call);
          call.answer(ownStream);
          call.on("stream", handleReceiveStream)
          call.on("close", handleCloseStream);
        }
      })
    }
    return () => {
      connection?.close();
    }
  }, [peerManager, otherUserIds, ownStream, handleReceiveStream, dataConn, handleCloseStream]);

  const startVideoCall = () => {
    console.log("startVideoCall", { ownStream, peerManager, userIds, currentUserId });
    if (!otherUserIds[0] || !ownStream || !peerManager) return;
    const otherPeerId = getPeerId(otherUserIds[0]);
    const conn = peerManager.call(otherPeerId, ownStream);
    setMediaConn(conn);
    conn.on("stream", handleReceiveStream);
    conn.on("close", handleCloseStream);
    console.log("startVideoCall connection", conn);
  }

  const stopVideoCall = () => {
    mediaConn?.close();
  }

  
  return {
    dataConn,
    mediaConn,
    startVideoCall,
    stopVideoCall,
    dataStatus,
    mediaStatus,
    peerStream
  }
}

export default usePeerConnection