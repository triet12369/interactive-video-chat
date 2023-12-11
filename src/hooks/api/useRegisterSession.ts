import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { RegisterSessionRequest, RegisterSessionResult } from '@/pages/api/room/register';
import { generateHeaders } from '@/src/utils/generateHeaders';

const API_ENDPOINT = "/api/room/register";

const registerSession = async (request: RegisterSessionRequest) => {

  const res = await axios.post<RegisterSessionResult>(API_ENDPOINT, request,
    {
      headers: { ...generateHeaders()}
    }
  );
  return res.data;
};

const useRegisterSession = (request: RegisterSessionRequest, options?: UseMutationOptions<RegisterSessionResult>) => useMutation<RegisterSessionResult>({
  mutationFn: async () => registerSession(request),
  ...options
})

export default useRegisterSession;