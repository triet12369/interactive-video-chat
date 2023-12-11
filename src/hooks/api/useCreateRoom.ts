import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CreateRoomResponse } from '@/pages/api/room/create';

const API_ENDPOINT = "/api/room/create";

const createRoom = async () => {
  const res = await axios.post<CreateRoomResponse>(API_ENDPOINT);
  return res.data;
};

const useCreateRoom = (options?: UseMutationOptions<CreateRoomResponse>) => useMutation<CreateRoomResponse>({
  mutationFn: createRoom,
  ...options
})

export default useCreateRoom;