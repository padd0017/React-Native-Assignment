import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from '@react-navigation/native'

export default function DetailsScreen({ route }) {
  const [bottleData, setBottleData] = useState({});
  
  const nav = useNavigation()
  let id = route.params.id;
  // console.log({ id });

  useFocusEffect(useCallback(() => {
      getBottleData();
  }, [id]));


  async function getBottleData() {
    try {
      const storedData = await AsyncStorage.getItem("data_beer");
      if(!storedData){
        setTimeout(()=>nav.goBack(), 100)
      }
      const jsonData = JSON.parse(storedData);
      const findBottle = jsonData.find((item) => item.uid === id);
      console.log(findBottle);
      setBottleData(findBottle);
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>{bottleData.name}</Text>
      <Text style={styles.subtitle}>{bottleData.brand}</Text>
    </View>

    <View style={styles.detailsContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identification</Text>
        <DetailCard label="ID" value={bottleData.id} />
        <DetailCard label="UID" value={bottleData.uid} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brew Details</Text>
        <View style={styles.detailGrid}>
          <DetailCard label="Style" value={bottleData.style} />
          <DetailCard label="Hop" value={bottleData.hop} />
          <DetailCard label="Yeast" value={bottleData.yeast} />
          <DetailCard label="Malts" value={bottleData.malts} />
        </View>
      </View>
    </View>
  </ScrollView>
  );
}

const DetailCard = ({ label, value }) => (
  <View style={styles.detailCard}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 24,
    backgroundColor: "#2B2D42",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#8D99AE",
    fontWeight: "600",
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2D42",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8D99AE",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2B2D42",
  },
});