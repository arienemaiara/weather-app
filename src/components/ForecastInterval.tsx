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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <WeatherIcon iconCode={item.icon} />
              <Text style={[styles.text, styles.temperature]}>
                {item.temperature}°C
              </Text>
              <Text style={[styles.text, styles.humidity]}>
                Humidity: {item.humidity}%
              </Text>
              <Text style={[styles.text]}>{item.weatherDescription}</Text>
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
      marginHorizontal: 10,
      marginVertical: 10
    },
    title: {},
    cardContainer: {
      alignItems: 'center',
      margin: 5,
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderWidth: 2,
      borderColor: '#ebedeb',
      borderRadius: 5
    },
    text: {
      fontSize: 13,
      marginTop: 5
    },
    temperature: {
      fontSize: 18
    },
    humidity: {
      fontSize: 11,
      color: '#999999'
    }
  })
})
