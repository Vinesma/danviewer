import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MainMenu from './components/MainMenu';

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [loading, setloading] = useState(true);
  
  return (
    <View style={styles.container}>
      <MainMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#1f202c',
    alignItems: 'center',
  },
});
