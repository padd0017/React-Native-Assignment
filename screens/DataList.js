import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const API = "https://random-data-api.com/api/v2/beers?size=10";


export default function Home() {
const [beerData, setBeerData] = useState([]);
const [reload, setReload] = useState(false);

const nav = useNavigation()
 const hanldePress = (routeName, id)=>{;
  nav.navigate(routeName, {id: id.uid});

}

useFocusEffect(useCallback(()=>{

data()
}, []))


 async function data () {
  console.log("data is working")
    const data = await AsyncStorage.getItem("data_beer");
    if(!data){ 
      console.log("Work work")
      fetchBeers()
    }
    let parsedData = JSON.parse(data);

    setBeerData(parsedData); 
    setTimeout(()=> setReload(false), 800) 
  }


function refreshing() {
    setReload(true);
        fetchBeers()
        data()
}


  async function fetchBeers() {
    try {
      const response = await fetch(API);
        const dataJson = await response.json();
        let jsonData = JSON.stringify(dataJson);
        await AsyncStorage.setItem("data_beer", jsonData);
        setBeerData(dataJson);
        console.log(response.status)
   
      
     
    } catch (e) {
      console.log("fetch failed", e);
    }
  }



  return (
    <View>
      <FlatList  
      refreshControl={<RefreshControl refreshing={reload} onRefresh={refreshing}/>}
      data={beerData}
      renderItem={({item})=>(
      <ListItem onPress={()=>hanldePress("DetailsScreen", item)}
        title ={item.brand}
        subTitle ={item.name}
        />
    )}>
  
      </FlatList>
    
    
    </View>

    
  )
  }


  function ListItem({title, subTitle='',onPress}) {
    return (
    <Pressable onPress={onPress}>
      <View style={styles.main}>
        <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subTitle}</Text>
        </View>

      <Ionicons style={styles.arrow} name="arrow-forward" size={24} color="black" />
      </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  tail: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});

