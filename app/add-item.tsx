import * as Calendar from 'expo-calendar';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import { useEffect, useState } from 'react';

import {
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { saveData } from '../lib/storage';
import { Product, useProductStore } from '../store/productStore';
import { checkPermission } from '../utils/permissions';
import { validateProduct } from '../utils/validation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function AddItem() {
  const addProductToStore = useProductStore((state) => state.addProduct);

  const [product, setProduct] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [contact, setContact] = useState<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  
  const pickImage = async () => {
    const ok = await checkPermission(
      ImagePicker.getMediaLibraryPermissionsAsync,
      ImagePicker.requestMediaLibraryPermissionsAsync,
      'galería'
    );

    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  
  const takePhoto = async () => {
    const ok = await checkPermission(
      ImagePicker.getCameraPermissionsAsync,
      ImagePicker.requestCameraPermissionsAsync,
      'cámara'
    );

    if (!ok) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  
  const getLocation = async () => {
    const ok = await checkPermission(
      Location.getForegroundPermissionsAsync,
      Location.requestForegroundPermissionsAsync,
      'ubicación'
    );

    if (!ok) return;

    const current = await Location.getCurrentPositionAsync({});
    setLocation(current.coords);
  };

  
  const selectContact = async () => {
    const ok = await checkPermission(
      Contacts.getPermissionsAsync,
      Contacts.requestPermissionsAsync,
      'contactos'
    );

    if (!ok) return;

    const result = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    setContacts(result.data);
    setShowContacts(true);
  };

  
  const createCalendarEvent = async (productName: string) => {
    const ok = await checkPermission(
      Calendar.getCalendarPermissionsAsync,
      Calendar.requestCalendarPermissionsAsync,
      'calendario'
    );

    if (!ok) return null;

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );

    const calendar = calendars.find(
      (c) => c.isPrimary && c.allowsModifications
    );

    if (!calendar) return null;

    const eventId = await Calendar.createEventAsync(calendar.id, {
      title: `Comprar ${productName}`,
      notes: `Recordatorio para comprar ${productName}`,
      startDate: new Date(),
      endDate: new Date(Date.now() + 3600000),
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    return eventId;
  };

  const addProduct = async () => {
    if (!validateProduct(product)) {
      alert('Ingresá un producto');
      return;
    }

    try {
      const products = useProductStore.getState().products;

      const newProduct: Product = {
        id: Date.now().toString(),
        name: product,
        image,
        location,
        contact: contact
          ? {
              name: contact.name,
              phone: contact.phoneNumbers?.[0]?.number,
            }
          : undefined,
      };

      const eventId = await createCalendarEvent(product);
      newProduct.calendarEventId = eventId ?? undefined;

      addProductToStore(newProduct);

      products.push(newProduct);
      await saveData('products', products);

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🛒 Producto agregado',
          body: `No olvides comprar ${product}`,
          sound: true,
        },
        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
          repeats: false,
        },
      });

      alert('Producto agregado');
      router.back();
    } catch (error) {
      console.log(error);
      alert('Error al guardar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Agregar Producto</Text>

      <TextInput
        placeholder="Producto..."
        style={styles.input}
        value={product}
        onChangeText={setProduct}
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>🖼 Elegir Imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>📷 Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>📍 Obtener Ubicación</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={selectContact}>
        <Text style={styles.buttonText}>👤 Seleccionar Contacto</Text>
      </TouchableOpacity>

      {image !== '' && (
        <Image
          source={{ uri: image }}
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
            marginVertical: 10,
          }}
        />
      )}

      {location && (
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          📍 Latitud {location.latitude}
          {'\n'}
          Longitud {location.longitude}
        </Text>
      )}

      {contact && (
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          👤 {contact.name}
          {'\n'}
          📞 {contact.phoneNumbers?.[0]?.number}
        </Text>
      )}

      <Modal visible={showContacts} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: '#f1f5f9' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Seleccionar Contacto
          </Text>

          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                onPress={() => {
                  setContact(item);
                  setShowContacts(false);
                }}
              >
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
                {item.phoneNumbers?.[0]?.number && (
                  <Text>{item.phoneNumbers[0].number}</Text>
                )}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowContacts(false)}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={addProduct}>
        <Text style={styles.buttonText}>Guardar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();

  let finalStatus = status;

  if (status !== 'granted') {
    const { status: newStatus } =
      await Notifications.requestPermissionsAsync();

    finalStatus = newStatus;
  }

  if (finalStatus !== 'granted') {
    alert('No se otorgaron permisos para notificaciones');
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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});