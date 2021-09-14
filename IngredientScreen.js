import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import CameraScreen from "./camera";



export default function App({route}) {

  const {calories, foodItem} = route.params;

  return (
    <View style={styles.container}>
      <Text>The # of calories in {foodItem} is {calories} </Text>
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
});
