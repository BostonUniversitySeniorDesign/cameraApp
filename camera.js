import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IngredientScreen from "./IngredientScreen";


// import {initializeApp} from "@firebase/app"
import firebase from 'firebase';

import { getDatabase, ref, set } from "firebase/database";
import "firebase/database"

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

// function writeData(recipeNumber,foodItem,calories) {
//   const db = getDatabase();
//   set(ref(db, 'recipes/' + recipeNumber), {
//     food: foodItem,
//     calorieValue: calories,
//   });
// }

// function storeIngredient(userId, score) {
//   firebase
//     .database()
//     .ref('users/' + userId)
//     .set({
//       ingreident: score,
//     });
// }


export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [caloriesRoute, setCaloriesRoute] = useState(null);
  const [foodItemRoute, setFoodItemRoute] = useState(null);
  const [numberOfRecipe, setNumberOfRecipe] = useState(null);
  // console.log(data);

  function storeIngredient(recipeNumber,foodItem, calories) {
    firebase
      .database()
      .ref('recipes/' + recipeNumber)
      .push({
        food: foodItem,
        calorieValue: calories,
      });
      // firebase
      //   .database()
      //   .ref('recipes/' + recipeNumber)
      //   .update({
      //   });

      console.log(calories);
  }

  // useEffect(() => {
  //   fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Zv3iWDaJzMh05as8UPFgPiy10NWyAMkNiDR80hg7&query=028400097659')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (data.length === 13){
      data = data.slice(1);
    }
    console.log(data);
    // useFetchFromAPI();
    fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Zv3iWDaJzMh05as8UPFgPiy10NWyAMkNiDR80hg7&query='+ data)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        //console.log(json['foods'][0]['foodNutrients'][3]["value"]);
        const calories = json['foods'][0]['foodNutrients'][3]["value"];
        const foodItem = json['foods'][0]['lowercaseDescription'];
        setCaloriesRoute(json['foods'][0]['foodNutrients'][3]["value"]);
        setFoodItemRoute(json['foods'][0]['lowercaseDescription']);
        console.log('directly after' + calories)
        // console.log(foodItem)

        //trying to store in database
        const new_num = numberOfRecipe.toString() + "recipe"; //1recipe .. 2recipe.. etc
        storeIngredient(new_num,foodItem,calories);

      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  //first method.. ended up trying another one
  // const useFetchFromAPI = async() =>{
  //   let response = await fetch(
  //     'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Zv3iWDaJzMh05as8UPFgPiy10NWyAMkNiDR80hg7&query=028400097659'
  //   );
  //   let json = await response.json();
  //   return json;
  // }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      <View style = {IngredientScreenButtonStyles.container}>
      <Button
        title="Start new recipe"
        onPress={() => {
          setNumberOfRecipe(numberOfRecipe + 1);
      }}
      />
        <Button
          title="Go to IngredientScreen"
          onPress={() => {
            navigation.navigate('IngredientScreen',{
              caloriesRoute: caloriesRoute,
              foodItemRoute: foodItemRoute,
          });
        }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const IngredientScreenButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
