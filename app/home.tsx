import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

import {
  getData,
  saveData,
} from '../lib/storage';

import ProductCard from '../components/ProductCard';

import {
  useProductStore,
} from '../store/productStore';

export default function Home() {

  const {
    products,
    setProducts,
  } = useProductStore();

  const loadProducts =
    async () => {

      const savedProducts =
        await getData(
          'products'
        );

      if (
        savedProducts &&
        Array.isArray(
          savedProducts
        )
      ) {
        setProducts(
          savedProducts
        );
      } else {
        setProducts([]);
      }
    };

  const deleteProduct =
    async (
      id: string
    ) => {

      const updatedProducts =
        products.filter(
          (product) =>
            product.id !== id
        );

      setProducts(
        updatedProducts
      );

      await saveData(
        'products',
        updatedProducts
      );
    };

  const logout =
    async () => {

      await saveData(
        'isLoggedIn',
        false
      );

      router.replace(
        '/login'
      );
    };

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
          router.push(
            '/add-item'
          )
        }
      >
        <Text
          style={
            styles.addButtonText
          }
        >
          ➕ Agregar Producto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          styles.logoutButton
        }
        onPress={logout}
      >
        <Text
          style={
            styles.logoutText
          }
        >
          🔒 Cerrar Sesión
        </Text>
      </TouchableOpacity>

      {products.length ===
        0 && (
        <Text
          style={{
            textAlign:
              'center',

            marginTop: 40,

            color:
              '#64748b',

            fontSize: 16,
          }}
        >
          No hay productos
          agregados
        </Text>
      )}

      <FlatList
        data={products}
        keyExtractor={(
          item
        ) => item.id}
        renderItem={({
          item,
        }) => (
          <ProductCard
            product={item}
            onDelete={
              deleteProduct
            }
          />
        )}
      />

    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      paddingHorizontal: 20,

      backgroundColor:
        '#f1f5f9',

      paddingTop: 70,
    },

    title: {
      fontSize: 34,

      fontWeight:
        'bold',

      color:
        '#0f172a',

      marginBottom: 25,

      textAlign:
        'center',
    },

    addButton: {
      backgroundColor:
        '#2563eb',

      padding: 16,

      borderRadius: 14,

      alignItems:
        'center',

      marginBottom: 12,
    },

    addButtonText: {
      color: 'white',

      fontSize: 18,

      fontWeight:
        'bold',
    },

    logoutButton: {
      backgroundColor:
        '#ef4444',

      padding: 14,

      borderRadius: 14,

      alignItems:
        'center',

      marginBottom: 20,
    },

    logoutText: {
      color: 'white',

      fontSize: 16,

      fontWeight:
        'bold',
    },
  });