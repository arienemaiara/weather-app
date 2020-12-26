import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, NativeModules } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import WeatherInfoCard from '../components/WeatherInfoCard'
import ButtonContainer from '../components/header/ButtonContainer'
import RefreshButton from '../components/RefreshButton'
import AboutButton from '../components/AboutButton'
import AboutModal from '../components/AboutModal'
import AddCityButton from '../components/AddCityButton'

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
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    const { state } = navigation

    if (state.params) {
      const { isLoading, reload, aboutButtonPress } = state.params
      return {
        headerRight: (
          <ButtonContainer>
            <AddCityButton />
            <RefreshButton onPress={reload} disabled={isLoading} />
            <AboutButton onButtonPress={aboutButtonPress} />
          </ButtonContainer>
        )
      }
    }
  }

  state = {
    modalAboutVisible: false
  }

  componentDidMount() {
    this.props.navigation.setParams({
      reload: this.props.reload,
      isLoading: this.props.isLoading,
      aboutButtonPress: () =>
        this.setState({ modalAboutVisible: !this.state.modalAboutVisible })
    })
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
      onAddCity
    } = this.props

    return (
      <>
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
        <AboutModal
          modalVisible={this.state.modalAboutVisible}
          hideModal={() => this.setState({ modalAboutVisible: false })}
        />
      </>
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
