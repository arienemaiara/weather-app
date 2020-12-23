import React, { PureComponent } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'

import { weatherImages } from '../constants/weatherIcons'

type WeatherIconProps = {
  iconCode: string
}

export default class WeatherIcon extends PureComponent<WeatherIconProps> {
  render() {
    return (
      <Image
        style={styles.weatherPicture}
        source={{
          uri: `res://drawable/weather/${weatherImages[this.props.iconCode]}`
        }}
      />
    )
  }
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    weatherPicture: {
      width: 80,
      height: 80,
      marginHorizontal: 5
    }
  })
})
