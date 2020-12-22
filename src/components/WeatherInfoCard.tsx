import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  FormFactor
} from '@youi/react-native-youi'

import { City } from '../types/types'

import WeatherIcon from './WeatherIcon'


export type WeatherInfoCardProps = {
  id: number,
  city: string
  weather: number
  weatherIcon: string
  description: string
  onItemPress: (city: City) => void
}

export default function WeatherInfoCard({ 
  city, 
  weather, 
  weatherIcon, 
  description,
  onItemPress
}: WeatherInfoCardProps) {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={styles.cardContainer}>
        <Text style={styles.cityName}>{city}</Text>
        <View style={styles.weatherInfo}>
          <WeatherIcon iconCode={weatherIcon} />
          <Text>{weather}°C</Text>
        </View>
        <Text style={styles.weatherDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    cardContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      width: 150,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 5,
      backgroundColor: '#f8f8f8',
      borderWidth: 2,
      borderColor: '#ebedeb',
      borderRadius: 5
    },
    cityName: {
      color: '#020307',
      fontSize: 20
    },
    weatherInfo: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    weatherDescription: {
      color: '#020307',
      fontSize: 15
    }
  })
})