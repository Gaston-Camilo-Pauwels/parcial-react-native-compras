import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

import { Stack } from 'expo-router';

export default function Layout() {

  useEffect(() => {

  async function setupNotifications() {

    
    await Notifications.requestPermissionsAsync();

    
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance:
          Notifications.AndroidImportance.MAX,
      }
    );
  }

  setupNotifications();

}, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="login"
        options={{ title: 'Login' }}
      />

      <Stack.Screen
        name="register"
        options={{ title: 'Registro' }}
      />

      <Stack.Screen
        name="home"
        options={{ title: 'Inicio' }}
      />

      <Stack.Screen
        name="add-item"
        options={{ title: 'Agregar Producto' }}
      />
    </Stack>
  );
}
