import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProductCardProps {
  product: any;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  onDelete,
}: ProductCardProps) {
  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>

        <Text style={styles.itemText}>
          🛒 {product.name}
        </Text>

        {product.image && (
          <Image
            source={{
              uri: product.image,
            }}
            style={styles.image}
          />
        )}

        {product.location && (
          <Text style={styles.info}>
            📍 Latitud {product.location.latitude}
            {'\n'}
            Longitud {product.location.longitude}
          </Text>
        )}

        {product.contact && (
          <Text style={styles.info}>
            👤 {product.contact.name}
            {'\n'}
            📞 {product.contact.phone}
          </Text>
        )}

        {product.calendarEventId && (
          <Text style={styles.info}>
            📅 Recordatorio creado
          </Text>
        )}

      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          onDelete(product.id)
        }
      >
        <Text style={styles.deleteText}>
          ✕
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',

    padding: 18,

    marginTop: 12,

    borderRadius: 14,

    flexDirection: 'row',

    justifyContent:
      'space-between',

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

  image: {
    width: 100,

    height: 100,

    marginTop: 10,

    borderRadius: 10,
  },

  info: {
    marginTop: 10,

    color: '#334155',
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
});