import React from 'react';
import { 
  KeyboardAvoidingView, 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Platform, 
  ScrollView 
} from 'react-native';

export default function SEMI_ACT1() {
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Image 
            source={require('./assets/fayepic.jpg')} 
            style={styles.image} 
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to React Native</Text>
          <Text style={styles.subtitle}>Edit App.js to start building your app</Text>
          <TextInput style={styles.input} placeholder="Input 1" />
          <TextInput style={styles.input} placeholder="Input 2" />
          <TextInput style={styles.input} placeholder="Input 3" />
          <TextInput style={styles.input} placeholder="Input 4" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '      
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
