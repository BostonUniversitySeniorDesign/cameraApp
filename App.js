// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { db } from './firebase';
// //this allows us to get information from the firestore database
// export default function App() {
//   const [examples, setExamples] = useState([]);
//   useEffect(() => {
//     const ref = db.collection('examples');
//     ref.onSnapshot((query) => {
//         const objs = [];
//         query.forEach((doc) => {
//           objs.push({
//             id: doc.id,
//             ...doc.data(),
//           });
//         });
//         setExamples(objs);
//       });
//   }, [])
//   return (
//     <View style={styles.container}>
//       {examples.map((obj) => (
//         <View id={obj.id}>
//           <Text>{obj.name}</Text>
//         </View>
//   ))}
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, alignItems: 'center', justifyContent: 'center'
//   },
// });
// //end of receiving information from the dummy firestore


// everything below includes camera + home screen and navigation

import "react-native-gesture-handler";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase';
import {firebaseConfig} from './config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//screens
import CameraScreen from "./camera";
import IngredientScreen from "./IngredientScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name='Profile'component={ProfileScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="IngredientScreen" component={IngredientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// let preferences = {
//   numberOfRecipe : 1
// }
