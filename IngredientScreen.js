import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import CameraScreen from "./camera";
import firebase from 'firebase';

import { getDatabase, ref, set } from "firebase/database";
import "firebase/database"

// function getIngredient(recipeNumber,foodItem, calories) {
//   firebase
//     .database()
//     .ref('recipes/firstRecipe/calorieValue')
//     .on('value',(snap)=>{
//       console.log(snap.val());
//     });
// }


export default function App({route}) {

  const {caloriesRoute, foodItemRoute} = route.params;

  // getIngredient('hello', foodItem, calories);

  return (
    <View style={styles.container}>
      <Text>The # of calories in {foodItemRoute}, the last ingredient scanned... is {caloriesRoute} </Text>
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
