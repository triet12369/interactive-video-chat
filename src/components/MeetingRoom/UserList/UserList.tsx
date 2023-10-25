import { Stack, Text } from '@mantine/core'
import React, { FC } from 'react'
import UserEntry from './UserEntry'

type UserListProps = {
  userIds: string[]
}
const UserList: FC<UserListProps> = (props) => {
  const { userIds } = props;
  return (
    <Stack gap="md">
      <Text fw="bold" size="xl"> Users in room</Text>
      <Stack gap="sm">
        {userIds.map((id) => <UserEntry key={id} id={id} />)}
      </Stack>
    </Stack>
  )
}

export default UserList;