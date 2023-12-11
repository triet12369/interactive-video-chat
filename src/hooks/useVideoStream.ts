import { useEffect, useState } from 'react';

type UseVideoStreamOptions = {
  mediaStreamOptions?: MediaStreamConstraints;
  displayMediaStreamOptions?: DisplayMediaStreamOptions;
};

const mediaStreamDefaults: MediaStreamConstraints = {
  video: true,
  audio: false
}

const displayMediaStreamDefaults: DisplayMediaStreamOptions = {
  video: true,
  audio: false
}

const useVideoStream = (options: UseVideoStreamOptions = {}) => {
  const { mediaStreamOptions = mediaStreamDefaults, displayMediaStreamOptions = displayMediaStreamDefaults } = options;
  const [type, setType] = useState<'camera' | 'screen'>('camera');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (type && navigator) {
      switch (type) {
      case 'camera':
        navigator.mediaDevices?.getUserMedia({ ...mediaStreamOptions })
          .then((mediaStream) => setStream(mediaStream));
        break;
      case 'screen':
        navigator.mediaDevices?.getDisplayMedia({ ...displayMediaStreamOptions })
          .then((displayStream) => setStream(displayStream));
        break;
      }
    }
  }, [displayMediaStreamOptions, mediaStreamOptions, type]);
  return { stream, setType };
};

export default useVideoStream;
