import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';

export default function App() {
  
  const [score, setScore] = useState(0);

  const handleWin = () => {
    setScore(score + 1);
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Ordering App</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>

      <TouchableOpacity style={styles.button} onPress={handleWin}>
        <Text style={styles.buttonText}>Add Coffee</Text>
      </TouchableOpacity>

      <Pressable 
        onPress={handleWin}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed 
        ]}
      >
        <Text style={styles.buttonText}>Add Point</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6F4E37',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});