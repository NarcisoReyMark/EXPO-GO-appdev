import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  ImageBackground
} from 'react-native';

export default function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using DummyJSON quotes API as a reliable alternative
      const response = await fetch('https://dummyjson.com/quotes/random');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote. Please try again.');
      }
      
      const data = await response.json();
      setQuote({
        text: data.quote,
        author: data.author,
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Daily Inspiration</Text>

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#4F46E5" />
          </View>
        )}

        {error && !loading && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <ScrollView 
            style={styles.quoteScrollContainer} 
            contentContainerStyle={styles.quoteScrollContent}
          >
            <Text style={styles.quoteText}>"{quote.text}"</Text>
            <Text style={styles.authorText}>— {quote.author}</Text>
          </ScrollView>
        )}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={fetchQuote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>New Quote</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053698',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '90%',
    maxWidth: 500,
    height: 350, // Fixed height keeps the card sized correctly for the ScrollView
    backgroundColor: '#6558b6',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  quoteScrollContainer: {
    marginVertical: 10,
    maxHeight: 260, // Restricts scroll area height so it sits nicely between the header and button
  },
  quoteScrollContent: {
    justifyContent: 'center',
    paddingVertical: 10,
  },
  quoteText: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
  },
  authorText: {
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 'auto', 
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});