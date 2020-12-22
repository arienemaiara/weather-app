import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import { City, CityWeather } from '../types/types'
import { ApplicationState } from '../reducers'
import { loadApp, refreshApp, removeCity } from '../features/weather/weatherSlicer'

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
      <View style={{backgroundColor: '#458', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>splash</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ weather }: ApplicationState) => ({
  error: weather.error,
  citiesList: weather.cities,
  citiesWeather: weather.citiesWeather,
  isLoading: weather.isLoading,
})

const mapDispatchToProps = (dispatch: any) => ({
  // reload: () => dispatch(refreshApp()),
  loadApp: () => dispatch(loadApp()),
  // onCityRemoval: (city: City) => dispatch(removeCity(city)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)