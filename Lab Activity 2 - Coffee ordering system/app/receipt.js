import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ReceiptScreen() {
  const { coffeeCount: coffeeCountParam } = useLocalSearchParams();
  const coffeeCount = Number.parseInt(
    Array.isArray(coffeeCountParam) ? coffeeCountParam[0] : coffeeCountParam,
    10,
  ) || 1;
  const totalBill = coffeeCount * 150;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order received!</Text>
      <View style={styles.receipt}>
        <Text style={styles.receiptTitle}>Campus Coffee Receipt</Text>
        <View style={styles.line} />
        <Text style={styles.price}>Coffee Price: {'\u20B1'}150.00</Text>
        <Text style={styles.item}>Cups ordered: {coffeeCount}</Text>
        <Text style={styles.total}>Total Bill: {'\u20B1'}{totalBill}</Text>
      </View>
      <Link href="/" style={styles.orderAgain}>Order again</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#FFF8F1', flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#4A2C1A', fontSize: 30, fontWeight: '700', marginBottom: 24 },
  receipt: { backgroundColor: '#FFFFFF', borderRadius: 16, elevation: 2, padding: 22, width: '100%' },
  receiptTitle: { fontSize: 20, fontWeight: '700' },
  line: { backgroundColor: '#D8C8BA', height: 1, marginVertical: 16 },
  price: { fontSize: 17, marginBottom: 8 },
  item: { fontSize: 17 },
  total: { fontSize: 21, fontWeight: '700', marginTop: 18 },
  orderAgain: { backgroundColor: '#6F4E37', borderRadius: 8, color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginTop: 28, overflow: 'hidden', paddingHorizontal: 28, paddingVertical: 14, textAlign: 'center', width: '100%' },
});
