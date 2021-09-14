import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // console.log(data);

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
    // useFetchFromAPI();
    fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Zv3iWDaJzMh05as8UPFgPiy10NWyAMkNiDR80hg7&query='+ data)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json['foods'][0]['foodNutrients'][3]["value"]);
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
