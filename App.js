//import CounterApp from './CounterApp';
//import ColorChangerApp from './ColorChangerApp';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Messenger from './Messenger';
import NewsFeed from './NewsFeed';

const App = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Messenger />
      <NewsFeed />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Matches styles.js default container
  },
  contentContainer: {
    padding: 20,
  },
});

export default App;