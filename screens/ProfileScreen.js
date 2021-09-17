import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  console.log("user from google", user);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{ fontSize : 20 }}>
          Welcome {user.name} !
      </Text>
      <Button
        title="Go to HomeScreen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});