import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Campus Coffee' }} />
      <Stack.Screen name="receipt" options={{ title: 'Your Receipt' }} />
    </Stack>
  );
}
