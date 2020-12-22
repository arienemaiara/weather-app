import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, NativeModules } from 'react-native'
import { NavigationScreenProps } from 'react-navigation';
import {
  FormFactor
} from '@youi/react-native-youi'

import { City, ForecastDetail } from '../types/types'

type WeatherInfoProps = {
  notifyError: (message: string) => void
} & NavigationScreenProps<{ city: City}>

type WeatherInfoState = {
  weatherForecast: ForecastDetail[]
  loading: boolean
}

export default class WeatherInfoScreen extends Component<WeatherInfoProps, WeatherInfoState> {
  render() {
    return (
      <View></View>
    )
  }
}