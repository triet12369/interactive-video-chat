import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetRoomInfoByIdResponse } from '@/pages/api/room/[id]';

const API_ENDPOINT = "/api/room";

const getRoomInfo = async (roomId: string) => {
  const res = await axios.get<GetRoomInfoByIdResponse>(`${API_ENDPOINT}/${roomId}`);
  return res.data;
};

const useGetRoomInfo = (roomId: string, options?: UseQueryOptions<GetRoomInfoByIdResponse>) => useQuery<GetRoomInfoByIdResponse>({
  queryFn: () => getRoomInfo(roomId),
  queryKey: ["roomId", roomId],
  refetchInterval: 2000,
  ...options
})

export default useGetRoomInfo;