import { Stack, Redirect } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

function Rotas() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF0090" />
      </View>
    );
  }

  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom', gestureEnabled: true }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastroUsuario" />
      </Stack>
    );
  }

return (
  <Stack
    screenOptions={{
      headerShown: false,
      animation: 'fade_from_bottom',
      gestureEnabled: true
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