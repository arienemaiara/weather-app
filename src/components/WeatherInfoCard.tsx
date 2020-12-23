import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'

import { City } from '../types/types'

import WeatherIcon from './WeatherIcon'

export type WeatherInfoCardProps = {
  id: number
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
          <Text style={styles.weather}>{weather}°C</Text>
        </View>
        <Text style={styles.weatherDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
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
      color: '#070602',
      fontSize: 16,
      marginBottom: 5
    },
    weatherInfo: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    weather: {
      color: '#2e2e2e',
      fontSize: 15,
      marginVertical: 10
    },
    weatherDescription: {
      color: '#2e2e2e',
      fontSize: 12
    }
  })
})
