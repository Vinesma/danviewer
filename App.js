import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [loading, setloading] = useState(true);

  const logo = require('./assets/danbooruIcon.png');

  return (
    <View style={styles.container}>
      <Image
      style={styles.mainIcon}
      source={logo}
      />
      <Text style={styles.BigText}>danviewer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f202c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    width: 200,
    height: 200,
  },
  BigText: {
    fontSize: 24,
    color: '#CC9B81',
  },
});
