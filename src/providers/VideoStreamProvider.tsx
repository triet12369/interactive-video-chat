import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import useVideoStream from "../hooks/useVideoStream";

const VideoStreamContext = createContext<VideoStreamProviderValues>({
  stream: null,
  setUseCamera: () => {},
  setUseScreen: () => {},
  enableStream: () => {},
  disableStream: () => {},
  toggleStream: () => {},
  initializeStream: () => {},
  isActive: false
});

export type VideoStreamProviderValues = {
  stream: MediaStream | null,
  isActive: boolean,
  setUseCamera: () => void,
  setUseScreen: () => void,
  enableStream: () => void,
  disableStream: () => void,
  toggleStream: () => void,
  initializeStream: () => void
};

function VideoStreamProvider(props: { children: ReactNode }) {
  const { stream, setType, initializeStream } = useVideoStream();
  const [isActive, setIsActive] = useState<boolean>(true);

  const setUseCamera = useCallback(
    () => setType("camera"),
    [setType]
  );
  const setUseScreen = useCallback(
    () => setType("screen"),
    [setType]
  );
  const enableStream = useCallback(
    () => setIsActive(true),
    [setIsActive]
  );
  const disableStream = useCallback(
    () => setIsActive(false),
    [setIsActive]
  );
  const toggleStream = useCallback(
    () => setIsActive((prev) => !prev),
    [setIsActive]
  );

  const providerValue = useMemo<VideoStreamProviderValues>(
    () => ({
      stream: isActive ? stream : null,
      setUseCamera,
      setUseScreen,
      enableStream,
      disableStream,
      toggleStream,
      isActive,
      initializeStream
    }),
    [stream, setUseCamera, setUseScreen, enableStream, disableStream, toggleStream, initializeStream, isActive],
  );

  return <VideoStreamContext.Provider value={providerValue} {...props} />;
}

const useVideoStreamControl = () => useContext(VideoStreamContext);


export { VideoStreamProvider, useVideoStreamControl };

