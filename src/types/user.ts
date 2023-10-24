export enum USER_TYPE {
  // users who will be interacting with each other
  PRIMARY = 'PRIMARY',
  // mainly for watching
  OBSERVER = 'OBSERVER'
}

export type User = {
  id: string
  type: USER_TYPE
};
