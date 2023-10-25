import { Group, Text } from '@mantine/core';
import React, { FC } from 'react'

type UserEntryProps = {
  id: string
};

const UserEntry: FC<UserEntryProps> = (props) => {
  const { id } = props;
  return (
    <Group>
      <Text fw="bold">{id}</Text>
    </Group>
  )
}

export default UserEntry;