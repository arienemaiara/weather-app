import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import WeatherInfoCard from '../components/WeatherInfoCard'
import ButtonContainer from '../components/header/ButtonContainer'
import RefreshButton from '../components/RefreshButton'
import AboutButton from '../components/AboutButton'
import AboutModal from '../components/AboutModal'
import AddCityButton from '../components/AddCityButton'
import Alert, { AlertType } from '../components/Alert'

import { City, CityWeather } from '../types/types'
import { ApplicationState } from '../reducers'

import { refreshApp, removeCity } from '../features/weather/weatherSlicer'

type LanderScreenProps = {
  citiesList: City[]
  citiesWeather: CityWeather[]
  lastRefreshed: number
  error?: string
  isLoading: boolean
  onCityRemoval: (city: City) => void
  reload: () => void
} & NavigationScreenProps

type LanderScreenState = {
  modalAboutVisible: boolean
  alert: AlertType
}

class LanderScreen extends Component<LanderScreenProps, LanderScreenState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    const { state } = navigation

    if (state.params) {
      const { isLoading, reload, aboutButtonPress } = state.params
      return {
        headerRight: (
          <ButtonContainer>
            <AddCityButton onPress={() => navigation.navigate('AddLocation')} />
            <RefreshButton onPress={reload} disabled={isLoading} />
            <AboutButton onButtonPress={aboutButtonPress} />
          </ButtonContainer>
        )
      }
    }
  }

  state = {
    modalAboutVisible: false,
    alert: {
      visible: false,
      title: 'Confirm',
      message: '',
      confirmButtonText: 'OK',
      onConfirmPress: () => {},
      cancelButtonText: 'Cancel',
      onCancelPress: () => {}
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      reload: this.props.reload,
      isLoading: this.props.isLoading,
      aboutButtonPress: () =>
        this.setState({ modalAboutVisible: !this.state.modalAboutVisible })
    })
  }

  onItemPress = (cityName: string) => {
    const city = this.props.citiesList.find((city) => city.name === cityName)
    if (city) {
      this.props.navigation.navigate('Forecast', { city })
    }
  }

  onItemLongPress = (cityName: string) => {
    const city = this.props.citiesList.find((city) => city.name === cityName)

    this.setState({
      alert: {
        ...this.state.alert,
        visible: true,
        message: 'Do you really want to remove this city?',
        onConfirmPress: () => {
          if (city) {
            this.props.onCityRemoval(city)
            this.dismissAlert()
          }
        },
        onCancelPress: () => this.dismissAlert()
      }
    })
  }

  dismissAlert = () => {
    this.setState({
      alert: {
        ...this.state.alert,
        visible: false
      }
    })
  }

  render() {
    const { citiesWeather } = this.props

    return (
      <>
        <View style={styles.mainContainer}>
          <FlatList
            data={citiesWeather}
            horizontal={FormFactor.isTV ? true : false}
            renderItem={({ item }) => {
              return (
                <WeatherInfoCard
                  cityWeather={item}
                  onItemPress={() => this.onItemPress(item.name)}
                  onItemLongPress={() => this.onItemLongPress(item.name)}
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
        <Alert {...this.state.alert} />
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
  onCityRemoval: (city: City) => dispatch(removeCity(city))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanderScreen)
