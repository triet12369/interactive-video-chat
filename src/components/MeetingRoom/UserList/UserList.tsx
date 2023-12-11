import { Stack, Text } from '@mantine/core';
import React, { FC } from 'react';
import UserEntry from './UserEntry';
import classes from "./UserList.module.scss";

type UserListProps = {
  userIds: string[]
}
const UserList: FC<UserListProps> = (props) => {
  const { userIds } = props;
  return (
    <Stack gap="md" className={classes.wrapper} ta="center">
      <Text fw="bold" size="xl"> Users in room</Text>
      <Stack gap="sm">
        {userIds.map((id, index) => <UserEntry key={id} id={id} index={index} />)}
      </Stack>
    </Stack>
  )
}

export default UserList;