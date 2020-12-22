import React, { PureComponent } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { weatherImages } from '../constants/weatherIcons';


type WeatherIconProps = {
  iconCode: string
}

export default class WeatherIcon extends PureComponent<WeatherIconProps> {
  render() {
    return (
      <View>
        <Image style={{width: 100, height: 100}} source={{ uri: `res://drawable/weather/${weatherImages[this.props.iconCode]}` }} />
      </View>
    )
  }
}