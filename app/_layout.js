import { Stack, Redirect } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Rotas() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastroUsuario" />
      </Stack>
    );
  }

return (
  <Stack
    screenOptions={{
      headerShown: false,
      presentation: 'transparentModal',
      animation: 'fade'
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen name="salas" />
    <Stack.Screen name="cadastro" />
  </Stack>
);
}

export default function Layout() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}