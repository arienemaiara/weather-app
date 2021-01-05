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
  onCityRemoval: (city: City, cityWeather: CityWeather) => void
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
            {FormFactor.isTV && <AddCityButton onPress={() => navigation.navigate('AddLocation')} />}
            <RefreshButton onPress={reload} disabled={isLoading} />
            {FormFactor.isTV && <AboutButton onButtonPress={aboutButtonPress} />}
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
      aboutButtonPress: () => this.aboutButtonPress()
    })
  }

  aboutButtonPress = () => this.setState({ modalAboutVisible: !this.state.modalAboutVisible })

  onItemPress = (cityWeather: CityWeather) => {
    let city = {
      name: cityWeather.name
    }

    if (city) {
      this.props.navigation.navigate('Forecast', { city })
    }
  }

  onItemLongPress = (cityWeather: CityWeather) => {
    const city = this.props.citiesList.find(
      (city) =>
        city.name === cityWeather.name ||
        (city.lat === cityWeather.coord.lat &&
          city.lon === cityWeather.coord.lon)
    )

    this.setState({
      alert: {
        ...this.state.alert,
        visible: true,
        message: 'Do you really want to remove this city?',
        onConfirmPress: () => {
          if (city) {
            this.props.onCityRemoval(city, cityWeather)
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
                  onItemPress={() => this.onItemPress(item)}
                  onItemLongPress={() => this.onItemLongPress(item)}
                />
              )
            }}
            keyExtractor={(item) => item.id!.toString()}
            style={styles.weatherList}
          />
          {FormFactor.isHandset && 
            <View style={styles.buttonsContainer}>
              <AddCityButton onPress={() => this.props.navigation.navigate('AddLocation')} />
              <AboutButton onButtonPress={this.aboutButtonPress} />
            </View>
          }
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfefe'
  },
  weatherList: {
    alignSelf: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  }
})

const mapStateToProps = ({ weather }: ApplicationState) => ({
  error: weather.error,
  citiesList: weather.cities,
  citiesWeather: weather.citiesWeather,
  isLoading: weather.isLoading
})

const mapDispatchToProps = (dispatch: any) => ({
  reload: () => dispatch(refreshApp()),
  onCityRemoval: (city: City, cityWeather: CityWeather) =>
    dispatch(removeCity(city, cityWeather))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanderScreen)
