import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
      title="Go to Camera"
      onPress={() => navigation.navigate('Camera')}
        />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});