import * as Notifications from 'expo-notifications';

import { useEffect, useState } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import {
  getData,
  saveData,
} from '../lib/storage';

// Configuración de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function AddItem() {
  const [product, setProduct] =
    useState('');

  // Pedir permisos al abrir pantalla
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const addProduct = async () => {
    if (!product.trim()) {
      alert('Ingresá un producto');
      return;
    }

    try {
      // Obtener productos guardados
      const savedProducts =
        await getData('products');

      // Si no hay productos → array vacío
      const products =
        savedProducts || [];

      // Agregar nuevo producto
      products.push(product);

      // Guardar nuevamente
      await saveData(
        'products',
        products
      );

      // Crear canal Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(
          'default',
          {
            name: 'default',
            importance:
              Notifications.AndroidImportance.MAX,
            vibrationPattern: [
              0,
              250,
              250,
              250,
            ],
            lightColor: '#FF231F7C',
          }
        );
      }

      // Programar notificación
      await Notifications.scheduleNotificationAsync(
        {
          content: {
            title: '🛒 Producto agregado',
            body: `No olvides comprar ${product}`,
            sound: true,
          },

          trigger: {
            type:
              Notifications
                .SchedulableTriggerInputTypes
                .TIME_INTERVAL,

            seconds: 5,

            repeats: false,
          },
        }
      );

      alert('Producto agregado');

      // volver al home
      router.back();

    } catch (error) {
      console.log(error);

      alert('Error al guardar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ➕ Agregar Producto
      </Text>

      <TextInput
        placeholder="Producto..."
        style={styles.input}
        value={product}
        onChangeText={setProduct}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addProduct}
      >
        <Text style={styles.buttonText}>
          Guardar Producto
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Pedir permisos
async function registerForPushNotificationsAsync() {
  const { status } =
    await Notifications.getPermissionsAsync();

  let finalStatus = status;

  if (status !== 'granted') {
    const {
      status: newStatus,
    } =
      await Notifications.requestPermissionsAsync();

    finalStatus = newStatus;
  }

  if (finalStatus !== 'granted') {
    alert(
      'No se otorgaron permisos para notificaciones'
    );

    return;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    paddingHorizontal: 25,

    backgroundColor: '#f1f5f9',
  },

  title: {
    fontSize: 34,

    fontWeight: 'bold',

    textAlign: 'center',

    marginBottom: 35,

    color: '#0f172a',
  },

  input: {
    backgroundColor: 'white',

    padding: 16,

    borderRadius: 12,

    marginBottom: 20,

    fontSize: 16,

    borderWidth: 1,

    borderColor: '#cbd5e1',
  },

  button: {
    backgroundColor: '#2563eb',

    padding: 16,

    borderRadius: 12,

    alignItems: 'center',
  },

  buttonText: {
    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',
  },
});