import { Group, Text } from '@mantine/core';
import React, { FC } from 'react'
import styles from "./UserEntry.module.scss";

type UserEntryProps = {
  id: string,
  index: number
};

const UserEntry: FC<UserEntryProps> = (props) => {
  const { id, index } = props;
  return (
    <Group>
      <Text fw="bold" className={styles['user-entry-text']}>{`${index + 1}. ${id}`}</Text>
    </Group>
  )
}

export default UserEntry;