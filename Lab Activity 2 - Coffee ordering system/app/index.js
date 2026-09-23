import { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderScreen() {
  const [coffeeCount, setCoffeeCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Coffee</Text>
      <Text style={styles.priceNote}>The price of each coffee is {'\u20B1'}150.00</Text>
      <Text style={styles.subtitle}>Cups of Coffee: {coffeeCount}</Text>

      <View style={styles.quantityRow}>
        <TouchableOpacity
          accessibilityLabel="Add one coffee"
          onPress={() => setCoffeeCount(coffeeCount + 1)}
          style={styles.stepButton}
        >
          <Text style={styles.stepButtonText}>+ Add Cup</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{coffeeCount}</Text>

        <TouchableOpacity
          accessibilityLabel="Remove one coffee"
          disabled={coffeeCount === 1}
          onPress={() => {
            if (coffeeCount > 1) {
              setCoffeeCount(coffeeCount - 1);
            }
          }}
          style={[styles.stepButton, coffeeCount === 1 && styles.disabledButton]}
        >
          <Text style={styles.stepButtonText}>- Remove Cup</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cart}>
        <Text style={styles.cartTitle}>Your cart</Text>
        <Text style={styles.cartText}>{coffeeCount} coffee {coffeeCount === 1 ? 'cup' : 'cups'}</Text>
      </View>

      <Link
        href={{ pathname: '/receipt', params: { coffeeCount: String(coffeeCount) } }}
        style={styles.checkoutButton}
      >
        View Receipt
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A2C1A',
    marginBottom: 8,
  },
  priceNote: {
    color: '#6B5749',
    fontSize: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B5749',
    marginBottom: 28,
  },
  quantityRow: {
    alignItems: 'stretch',
    flexDirection: 'column',
    gap: 24,
    marginBottom: 28,
  },
  stepButton: {
    alignItems: 'center',
    backgroundColor: '#6F4E37',
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    width: 220,
  },
  disabledButton: {
    backgroundColor: '#BCA99A',
  },
  stepButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  quantity: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  cart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    width: '100%',
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cartText: {
    fontSize: 17,
  },
  checkoutButton: {
    backgroundColor: '#6F4E37',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 28,
    overflow: 'hidden',
    paddingHorizontal: 28,
    paddingVertical: 14,
    textAlign: 'center',
    width: '100%',
  },
});
