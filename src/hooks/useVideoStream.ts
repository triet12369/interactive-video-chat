import { useEffect, useState } from 'react';

type UseVideoStreamOptions = {
  mediaStreamOptions?: MediaStreamConstraints;
  displayMediaStreamOptions?: DisplayMediaStreamOptions;
};

const mediaStreamDefaults: MediaStreamConstraints = {
  video: true,
  audio: true
}

const displayMediaStreamDefaults: DisplayMediaStreamOptions = {
  video: true,
  audio: false
}

const useVideoStream = (options: UseVideoStreamOptions = {}) => {
  const { mediaStreamOptions = mediaStreamDefaults, displayMediaStreamOptions = displayMediaStreamDefaults } = options;
  const [type, setType] = useState<'camera' | 'screen'>('camera');
  const [stream, setStream] = useState<MediaStream | undefined>();

  useEffect(() => {
    if (type && navigator) {
      switch (type) {
      case 'camera':
        navigator.mediaDevices.getUserMedia({ ...mediaStreamOptions })
          .then((mediaStream) => setStream(mediaStream));
        break;
      case 'screen':
        navigator.mediaDevices.getDisplayMedia({ ...displayMediaStreamOptions })
          .then((displayStream) => setStream(displayStream));
        break;
      }
    }
  }, [type]);
  return { stream, setType };
};

export default useVideoStream;
