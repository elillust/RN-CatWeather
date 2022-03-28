import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons, Fontisto } from '@expo/vector-icons';

const {width:SCREEN_WIDTH} = Dimensions.get('window');
const API_KEY = "1839b4273e03af1ed30b8438b0e04f17";

const icons = {
  Clear: "day-sunny",
  Rain: "rain",
  Clouds: "cloudy",
}
export default function App() {
  const [city, setCity] = useState("Loading..."); 
  const [day, setDay] = useState([]); 
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true); 

  const ask = async () => {
    // 위치사용 동의 얻기!!! 
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false); 
      console.log("false");
    }
    // 현재 위치를 가지고 온다 -> accuracy:6 정확도 1-6
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:6}); 
    const cN = await Location.reverseGeocodeAsync(
      {latitude, longitude},  
      {useGoogleMaps:false}
    );
    setCity(cN[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY }&units=metric`);
    const json = await response.json();  
    setDay(json.daily); 

  };
  useEffect(() => {
    ask();
  }, []);

  return ( 
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}> 
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal 
        contentContainerStyle={styles.weather}>
        {day.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator color="white" size="large" style={{ marginTop:200 }} />
          </View> 
         ) : ( 
           day.map((day, index) => 
           <View key={index} style={styles.day}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Fontisto name={icons[day.weather[0].main]} size={54} color="white" />
            </View>
            <Text style={styles.description}>{day.weather[0].main}</Text>
           </View> 
           )
         )}
      </ScrollView>

    </View>
  );
}

// const SCREEN_WIDTH = Dimensions.get('window').width;

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