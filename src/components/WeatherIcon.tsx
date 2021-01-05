import React, { PureComponent } from 'react'
import { Image, StyleSheet } from 'react-native'
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

const styles = StyleSheet.create({
  weatherPicture: {
    width: FormFactor.isTV ? 80 : 30,
    height: FormFactor.isTV ? 80 : 30,
    marginHorizontal: 5
  }
})
