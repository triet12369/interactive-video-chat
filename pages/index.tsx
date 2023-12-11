import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { Welcome } from '../components/Welcome/Welcome';
import useCreateRoom from '@/src/hooks/api/useCreateRoom';
import { REGEX_ROOM_ID } from '@/src/constants/regexConstants';

export default function HomePage() {
  const router = useRouter();
  const { mutateAsync } = useCreateRoom();
  const form = useForm({
    initialValues: {
      roomId: ""
    },

    validate: {
      roomId: (value) => (REGEX_ROOM_ID.test(value) ? null : 'Invalid room ID format (XXX-XXX-XXX)'),
    },
  });

  const goToRoom = (roomId: string) => {
    router.push(`/meet/${roomId}`);
  }

  const handleClick = async () => {
    const { roomId } = await mutateAsync();
    goToRoom(roomId);
  };

  return (
    <Stack gap="lg">
      <Welcome />
      <Group justify="center" w="100%">
        <Stack>
          <Button onClick={handleClick}>Create A Meeting</Button>
        </Stack>
        <Stack>
          <Text>or</Text>
        </Stack>
        <Stack>
          <TextInput placeholder="123-456-789" description="Enter room ID" {...form.getInputProps("roomId")} />
          <Button onClick={() => goToRoom(form.values.roomId)}>Join</Button>
        </Stack>
      </Group>
    </Stack>
  );
}
