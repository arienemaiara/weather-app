import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import { City, CityWeather } from '../types/types'
import { ApplicationState } from '../reducers'
import {
  loadApp,
  refreshApp,
  removeCity
} from '../features/weather/weatherSlicer'

type SplashScreenProps = {
  citiesList: City[]
  citiesWeather: CityWeather[]
  isLoading: boolean
  error?: string
  loadApp: () => void
} & NavigationScreenProps

class SplashScreen extends Component<SplashScreenProps> {
  componentDidMount() {
    this.props.loadApp()
  }

  componentDidUpdate() {
    if (!this.props.isLoading) {
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: 'res://drawable/weather/sun.png' }}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ weather }: ApplicationState) => ({
  error: weather.error,
  citiesList: weather.cities,
  citiesWeather: weather.citiesWeather,
  isLoading: weather.isLoading
})

const mapDispatchToProps = (dispatch: any) => ({
  loadApp: () => dispatch(loadApp())
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
