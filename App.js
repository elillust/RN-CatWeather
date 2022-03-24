import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true); 

  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false); 
      console.log("false");
    }
    const location = await Location.getCurrentPositionAsync({accuracy:5});
    console.log(location);
  };
  useEffect(() => {
    ask();
  }, []);

  return ( 
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal 
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>

    </View>
  );
}

// const SCREEN_WIDTH = Dimensions.get('window').width;
const {width:SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: "#ef4056",
  },
  city: {
    flex: 0.8, 
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 3,
  },
  cityName: {
    paddingTop:40,
    fontSize: 38,
    fontWeight: "500",
    color: "#fff",
  },
  weather: {
    
  }, 
  day: {
    width: SCREEN_WIDTH,
    paddingLeft:30,
  },
  temp: {
    marginTop: 50,
    fontSize: 120,
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "yellow",
  },
});