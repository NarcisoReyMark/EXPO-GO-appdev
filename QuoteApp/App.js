import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';

export default function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://dummyjson.com/quotes/random'
      );

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
    <ImageBackground
      source={require('./assets/bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>

        <View style={styles.cardContainer}>

          <ImageBackground
            source={require('./assets/card.jpg')}
            style={styles.card}
            imageStyle={styles.cardBackground}
            resizeMode="cover"
          >

            <View style={styles.overlay}>

              <Text style={styles.header}>
                 Daily Quotes 
              </Text>

              {loading && (
                <View style={styles.centerContainer}>
                  <ActivityIndicator
                    size="large"
                    color="#FFFFFF"
                  />
                </View>
              )}

              {error && !loading && (
                <View style={styles.centerContainer}>
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                </View>
              )}

              {!loading && !error && (
                <ScrollView
                  style={styles.quoteScrollContainer}
                  contentContainerStyle={styles.quoteScrollContent}
                >
                  <Text style={styles.quoteText}>
                    "{quote.text}"
                  </Text>

                  <Text style={styles.authorText}>
                    — {quote.author}
                  </Text>
                </ScrollView>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  loading && styles.buttonDisabled,
                ]}
                onPress={fetchQuote}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  New Quote
                </Text>
              </TouchableOpacity>

            </View>

          </ImageBackground>

        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({



  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },

 cardContainer: {
  width: '90%',
  maxWidth: 500,
  height: 400,
  backgroundColor: 'transparent',
  borderRadius: 16,
  overflow: 'hidden',
},

  card: {
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
},

  cardBackground: {
    borderRadius: 16,
  },

 overlay: {
  flex: 1,
  padding: 5,
},
  header: {
  fontStyle: 'italic',
  fontSize: 20,
  fontWeight: '700',
  color: '#030303',
  textAlign: 'center',

  backgroundColor: '#fcfcfc',

  borderWidth: 3,
  borderColor: '#265203',
  borderRadius: 15,

  paddingVertical: 12,
  width: '100%',

  marginBottom: 19,
},

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },

  quoteScrollContainer: {
    marginVertical: 10,
    maxHeight: 260,
  },

  quoteScrollContent: {
    justifyContent: 'center',
    paddingVertical: 10,
  },

  quoteText: {
    fontFamily: 'monoscope',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },

  authorText: {
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  errorText: {
    color: '#b89494',
    fontSize: 16,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#fff5f5',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 'auto',
  },

  buttonDisabled: {
    backgroundColor: '#2279ca',
  },

  buttonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',

  },
});