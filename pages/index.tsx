import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { Welcome } from '../components/Welcome/Welcome';
import getRandomRoomId from '@/src/service/roomManager/getRandomRoomId';

export default function HomePage() {
  const router = useRouter();
  return (
    <Stack gap="lg">
      <Welcome />
      <Group justify="center" w="100%">
        <Stack>
          <Button onClick={() => router.push(`/meet/${getRandomRoomId()}`)}>Create A Meeting</Button>
        </Stack>
        <Stack>
          <Text>or</Text>
        </Stack>
        <Stack>
          <TextInput placeholder="123-456-789" description="Enter room ID" />
          <Button onClick={() => {}}>Join</Button>
        </Stack>
      </Group>
    </Stack>
  );
}
