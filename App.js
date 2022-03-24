import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
        pagingEnabled
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
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
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