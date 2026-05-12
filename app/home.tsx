import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';

import {
  useCallback,
  useState,
} from 'react';

import {
  getData,
  saveData,
} from '../lib/storage';

export default function Home() {
  const [products, setProducts] =
    useState<string[]>([]);

  // cargar productos
  const loadProducts = async () => {
    const savedProducts =
      await getData('products');

    if (savedProducts) {
      setProducts(savedProducts);
    } else {
      setProducts([]);
    }
  };

  // eliminar producto
  const deleteProduct = async (
    indexToDelete: number
  ) => {
    const updatedProducts =
      products.filter(
        (_, index) =>
          index !== indexToDelete
      );

    setProducts(updatedProducts);

    await saveData(
      'products',
      updatedProducts
    );
  };

  // cerrar sesión
  const logout = async () => {

    // borrar sesión
    await saveData(
      'isLoggedIn',
      false
    );

    // volver al login
    router.replace('/login');
  };

  // recargar productos
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🛒 Lista de Compras
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push('/add-item')
        }
      >
        <Text style={styles.addButtonText}>
          ➕ Agregar Producto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>
          🔒 Cerrar Sesión
        </Text>
      </TouchableOpacity>

      {products.length === 0 && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 40,
            color: '#64748b',
            fontSize: 16,
          }}
        >
          No hay productos agregados
        </Text>
      )}

      <FlatList
        data={products}
        keyExtractor={(_, index) =>
          index.toString()
        }
        renderItem={({ item, index }) => (
          <View style={styles.item}>

            <Text style={styles.itemText}>
              {item}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteProduct(index)
              }
            >
              <Text style={styles.deleteText}>
                ✕
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,

    backgroundColor: '#f1f5f9',

    paddingTop: 70,
  },

  title: {
    fontSize: 34,

    fontWeight: 'bold',

    color: '#0f172a',

    marginBottom: 25,

    textAlign: 'center',
  },

  item: {
    backgroundColor: 'white',

    padding: 18,

    marginTop: 12,

    borderRadius: 14,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 5,

    elevation: 3,
  },

  itemText: {
    fontSize: 18,

    fontWeight: '600',

    color: '#1e293b',
  },

  addButton: {
    backgroundColor: '#2563eb',

    padding: 16,

    borderRadius: 14,

    alignItems: 'center',

    marginBottom: 12,
  },

  addButtonText: {
    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#ef4444',

    width: 36,

    height: 36,

    borderRadius: 18,

    justifyContent: 'center',

    alignItems: 'center',
  },

  deleteText: {
    color: 'white',

    fontWeight: 'bold',

    fontSize: 18,
  },

  logoutButton: {
    backgroundColor: '#ef4444',

    padding: 14,

    borderRadius: 14,

    alignItems: 'center',

    marginBottom: 20,
  },

  logoutText: {
    color: 'white',

    fontSize: 16,

    fontWeight: 'bold',
  },
});