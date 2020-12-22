import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, NativeModules } from 'react-native'
import {
  FormFactor
} from '@youi/react-native-youi'
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux'

import WeatherInfoCard, { WeatherInfoCardProps } from '../components/WeatherInfoCard'
import { City, CityWeather } from '../types/types'
import { ApplicationState } from '../reducers'

import { refreshApp, removeCity, addCity } from '../features/weather/weatherSlicer'

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

class LanderScreen extends Component<LanderScreenProps>  {

  static navigationOptions = () => {
    return {
      headerTitle: () =>  <Text>Youi Weather App</Text>
    }
  }

  onItemPress = (city: City) => {
    this.props.navigation.navigate('Forecast', { city })
  }

  render() {
    console.log(this.props)
    const { citiesWeather, citiesList, lastRefreshed, onCityRemoval, onAddCity, reload } = this.props

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
                onItemPress={(city) => this.onItemPress(city)}
              />
            )
          }}
          keyExtractor={item => item.id!.toString()}
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
      alignSelf: 'center',
      maxHeight: '50%'
    }
  })
})

const mapStateToProps = ({ weather }: ApplicationState) => ({
  error: weather.error,
  citiesList: weather.cities,
  citiesWeather: weather.citiesWeather,
  isLoading: weather.isLoading,
})

const mapDispatchToProps = (dispatch: any) => ({
  reload: () => dispatch(refreshApp()),
  onCityRemoval: (city: City) => dispatch(removeCity(city)),
  onAddCity: (city: City) => dispatch(addCity(city))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanderScreen)