import { RegisterSessionResult } from '../service/sessionManager/registerSession';

export type MeetingInfo = RegisterSessionResult;

export type MeetingStreamInfo = {
  stream?: MediaStream
};
