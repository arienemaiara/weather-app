import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'

import { City, CityWeather } from '../types/types'

import WeatherIcon from './WeatherIcon'

export type WeatherInfoCardProps = {
  cityWeather: CityWeather
  onItemPress: (city: City) => void
  onItemLongPress: (city: City) => void
}

export default function WeatherInfoCard({
  cityWeather,
  onItemPress,
  onItemLongPress
}: WeatherInfoCardProps) {
  if (cityWeather.error) {
    return (
      <TouchableOpacity onLongPress={onItemLongPress}>
        <View style={[styles.cardContainer, styles.cardContainerError]}>
          <Text style={{ color: '#fff' }}>{cityWeather.message}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onItemPress} onLongPress={onItemLongPress}>
      <View style={styles.cardContainer}>
        <Text style={styles.cityName}>{cityWeather.name}</Text>
        <View style={styles.weatherInfo}>
          <WeatherIcon iconCode={cityWeather.weather[0]?.icon} />
          <Text style={styles.weather}>{cityWeather.main.temp}°C</Text>
          <Text style={styles.weatherDescription}>
            {cityWeather.weather[0]?.main}
          </Text>
        </View>
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
      height: 200,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 5,
      backgroundColor: '#f8f8f8',
      borderWidth: 2,
      borderColor: '#ebedeb',
      borderRadius: 5
    },
    cardContainerError: {
      backgroundColor: '#fa4d4d',
      borderColor: '#c22a2a'
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
  }),
  Handset: StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 5,
      backgroundColor: '#f8f8f8',
      borderWidth: 2,
      borderColor: '#ebedeb',
    },
    cardContainerError: {
      backgroundColor: '#fa4d4d',
      borderColor: '#c22a2a'
    },
    cityName: {
      alignSelf: 'center',
      color: '#070602',
      fontSize: 12,
      marginBottom: 5,
    },
    weatherInfo: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    weather: {
      color: '#2e2e2e',
      fontSize: 12,
      marginBottom: 5
    },
    weatherDescription: {
      color: '#2e2e2e',
      fontSize: 11
    }
  })
})
