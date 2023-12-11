import nookies from "nookies";

export const getUserId = () => {
  const cookies = nookies.get();
  return cookies.deviceId;
}