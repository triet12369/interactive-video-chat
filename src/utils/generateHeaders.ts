import { RawAxiosRequestHeaders } from "axios";
import nookies from "nookies";
import { HEADER_DEVICE_ID } from "../constants/apiConstants";

export const generateHeaders = (): RawAxiosRequestHeaders => {
  const cookies = nookies.get();
  const { deviceId } = cookies;
  return {
    [HEADER_DEVICE_ID]: deviceId
  }
}