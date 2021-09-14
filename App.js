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

import CameraScreen from "./camera";

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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
