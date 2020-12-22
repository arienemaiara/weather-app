import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'

import { GroupedForecastType } from '../screens/WeatherInfoScreen'

import WeatherIcon from './WeatherIcon'

type ForecastIntervalProps = {
  forecast: GroupedForecastType
}

export default function ForecastInterval({ forecast }: ForecastIntervalProps) {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.title}>{forecast.forecastDay}</Text>
      <FlatList 
        data={forecast.data}
        horizontal={FormFactor.isTV ? true : false}
        keyExtractor={item => item.dt.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <View>
                <WeatherIcon iconCode={item.icon} />
                <Text>{item.temperature}°C</Text>
              </View>
              <Text>{item.weatherDescription}</Text>
              <Text>Humidity: {item.humidity}%</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    rowContainer: {

    },
    title: {

    },
    cardContainer: {
      margin: 5,
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderWidth: 2,
      borderColor: '#ebedeb',
      borderRadius: 5
    }
  })
})
