import { useState } from 'react';

import {
  getData,
  saveData,
} from '../lib/storage';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

export default function Login() {
  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleLogin = async () => {
    const savedUser = await getData('user');

    if (
      savedUser?.username === username &&
      savedUser?.password === password
    ) {

      // guardar sesión
      await saveData(
        'isLoggedIn',
        true
      );

      // ir al home
      router.replace('/home');

    } else {
      alert('Datos incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🔐 Iniciar Sesión
      </Text>

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Ingresar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push('/register')
        }
      >
        <Text style={styles.link}>
          Ir a registro
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    paddingHorizontal: 25,

    backgroundColor: '#f1f5f9',
  },

  title: {
    fontSize: 36,

    fontWeight: 'bold',

    textAlign: 'center',

    marginBottom: 35,

    color: '#0f172a',
  },

  input: {
    backgroundColor: 'white',

    padding: 16,

    borderRadius: 12,

    marginBottom: 15,

    fontSize: 16,

    borderWidth: 1,

    borderColor: '#cbd5e1',
  },

  button: {
    backgroundColor: '#2563eb',

    padding: 16,

    borderRadius: 12,

    alignItems: 'center',

    marginTop: 10,
  },

  buttonText: {
    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',
  },

  link: {
    marginTop: 20,

    textAlign: 'center',

    color: '#2563eb',

    fontSize: 16,

    fontWeight: '600',
  },
});