
import { Alert, StyleSheet, Text, View, Pressable } from "react-native";
// import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";




const API = "https://random-data-api.com/api/v2/beers?size=10";

export default function Home() {
  const [beers, setBeers] = useState(null)
  useEffect(() => {
    checkSavedData();
  }, []);


  async function checkSavedData() {
    const getData = await AsyncStorage.getItem("data_beer");
    try {
      if (!getData) {
        console.log("fetchDone")
        await fetchBeers();
      }
    } catch (e) {
      console.log("Failed fetch", e);
    }
  }

  async function fetchBeers() {
    console.log("working")
    try {
      const response = await fetch(API);
      console.log(response.statusText)
      const dataJson = await response.json();
      // console.log({DATAHome: dataJson})
      let jsonData = JSON.stringify(dataJson);
      setBeers(jsonData)
      const storeData = await AsyncStorage.setItem("data_beer", jsonData);
      Alert.alert("New Fetch DOne")
    } catch (e) {
      console.log("Fetch failed1", e);
    }
  }

  async function clearData() {
    const removeData = await AsyncStorage.removeItem("data_beer")
    Alert.alert("List is Empty")

    console.log({harsh:await AsyncStorage.getItem("data_beer")});
    
  }

  return (
  <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.title}>BEER STORE</Text>
      <View style={styles.buttonContainer}>
  <Pressable onPress={clearData} style={[styles.button, styles.deleteButton]}>
    <Text style={styles.deleteText}>Clear List</Text>
  </Pressable>
</View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  welcomeText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2c1a0d", 
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
  },
  fetchButton: {
    backgroundColor: 'white',
    borderColor: '#ddd',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    borderColor: '#cc0000',
  },
  fetchText: {
    color: '#333',
    fontWeight: '600',
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  }
});
