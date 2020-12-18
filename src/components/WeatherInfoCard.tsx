import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  FormFactor
} from '@youi/react-native-youi'

export type WeatherInfoCardProps = {
  id: number,
  city: string
  weather: string
  weatherIcon: string
  weatherStatus: string
}

export default function WeatherInfoCard({ 
  city, 
  weather, 
  weatherIcon, 
  weatherStatus 
}: WeatherInfoCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cityName}>{city}</Text>
      <View style={styles.weatherInfo}>
        <Text>{weatherIcon}000</Text>
        <Text>{weather}</Text>
      </View>
      <Text>{weatherStatus}</Text>
    </View>
  )
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 150,
      width: 150,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 5,
      backgroundColor: '#00bcd4',
      borderRadius: 5
    },
    cityName: {
      color: '#071318',
      fontSize: 22
    },
    weatherInfo: {
      flexDirection: 'row'
    }
  })
})