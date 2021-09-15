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

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);

import CameraScreen from "./camera";
import IngredientScreen from "./IngredientScreen";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



function HomeScreen({navigation}) { //passing the navigation prop
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      /> 

    </View>
  );
}

function LoginScreen({navigation}) { //passing the navigation prop
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior:'web',
        iosClientId: '203152648176-5e7i9r1j4n952eni9o6eeseoena65av8.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        // navigation.navigate("Home", { user });
        navigation.navigate("Home");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Sign In With Google"
        onPress={() => this.signInWithGoogleAsync()} 
      />

    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="IngredientScreen" component={IngredientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
