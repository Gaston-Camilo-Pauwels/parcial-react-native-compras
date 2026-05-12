import { useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { saveData } from '../lib/storage';

export default function Register() {
  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleRegister = async () => {
    const user = {
      username,
      password,
    };

    await saveData('user', user);

    alert('Usuario registrado');

    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📝 Crear Cuenta
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
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          Registrarse
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
});