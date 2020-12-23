import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, NativeModules } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import WeatherInfoCard from '../components/WeatherInfoCard'
import HeaderButton from '../components/header/HeaderButton'
import RefreshButton from '../components/RefreshButton'

import { City, CityWeather } from '../types/types'
import { ApplicationState } from '../reducers'

import {
  refreshApp,
  removeCity,
  addCity
} from '../features/weather/weatherSlicer'

type LanderScreenProps = {
  citiesList: City[]
  citiesWeather: CityWeather[]
  lastRefreshed: number
  error?: string
  isLoading: boolean
  onCityRemoval: (city: City) => void
  onAddCity: (city: City) => void
  reload: () => void
} & NavigationScreenProps

class LanderScreen extends Component<LanderScreenProps> {
  static navigationOptions = () => {
    return {
      headerRight: (
        <View style={styles.headerButtonContainer}>
          <HeaderButton title="Add city" icon="add" onPress={() => {}} />
          <RefreshButton />
          <HeaderButton title="About" icon="info" onPress={() => {}} />
        </View>
      )
    }
  }

  onItemPress = (city: City | undefined) => {
    if (city) {
      this.props.navigation.navigate('Forecast', { city })
    }
  }

  render() {
    const {
      citiesWeather,
      citiesList,
      lastRefreshed,
      onCityRemoval,
      onAddCity,
      reload
    } = this.props

    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={citiesWeather}
          horizontal={FormFactor.isTV ? true : false}
          renderItem={({ item }) => {
            const city = citiesList.find((city) => city.name === item.name)
            return (
              <WeatherInfoCard
                id={item.id}
                city={item.name}
                weather={item.main.temp}
                weatherIcon={item.weather[0]?.icon}
                description={item.weather[0]?.main}
                onItemPress={() => this.onItemPress(city)}
              />
            )
          }}
          keyExtractor={(item) => item.id!.toString()}
          style={styles.weatherList}
        />
      </View>
    )
  }
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fcfefe'
    },
    weatherList: {
      alignSelf: 'center'
    },
    headerButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%'
    }
  })
})

const mapStateToProps = ({ weather }: ApplicationState) => ({
  error: weather.error,
  citiesList: weather.cities,
  citiesWeather: weather.citiesWeather,
  isLoading: weather.isLoading
})

const mapDispatchToProps = (dispatch: any) => ({
  reload: () => dispatch(refreshApp()),
  onCityRemoval: (city: City) => dispatch(removeCity(city)),
  onAddCity: (city: City) => dispatch(addCity(city))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanderScreen)
