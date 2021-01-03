import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { FormFactor } from '@youi/react-native-youi'

import ForecastInterval from '../components/ForecastInterval'
import ButtonContainer from '../components/header/ButtonContainer'
import RefreshButton from '../components/RefreshButton'
import AboutButton from '../components/AboutButton'
import AboutModal from '../components/AboutModal'

import { City, ForecastDetail } from '../types/types'
import { groupBy } from '../utils/arrays'
import { formatDateToCalendar } from '../utils/formatters'
import { fetchWeatherForecast } from '../services/openWeather'

type WeatherInfoProps = {
  notifyError: (message: string) => void
} & NavigationScreenProps<{
  city: City
  loading: boolean
  reload: () => void
  aboutButtonPress: () => void
}>

type WeatherInfoState = {
  weatherForecast: ForecastDetail[]
  groupedForecast: GroupedForecastType[]
  loading: boolean
  modalAboutVisible: boolean
  reload: () => void
  aboutButtonPress: () => void
}

export type GroupedForecastType = {
  forecastDay: string
  forecastDayTitle: string
  data: ForecastDetail[]
}

export default class WeatherInfoScreen extends Component<
  WeatherInfoProps,
  WeatherInfoState
> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    const { state } = navigation

    if (state.params) {
      const { loading, reload, aboutButtonPress } = state.params
      return {
        headerRight: (
          <ButtonContainer>
            <RefreshButton onPress={reload} disabled={loading} />
            <AboutButton onButtonPress={aboutButtonPress} />
          </ButtonContainer>
        )
      }
    }
  }

  state = {
    weatherForecast: [],
    groupedForecast: [],
    loading: true,
    modalAboutVisible: false,
    reload: () => {},
    aboutButtonPress: () => {}
  }

  componentDidMount() {
    this.props.navigation.setParams({
      reload: () => this.fetchForecast(),
      loading: true,
      aboutButtonPress: () =>
        this.setState({ modalAboutVisible: !this.state.modalAboutVisible })
    })

    this.fetchForecast()
  }

  setLoading = (loading: boolean) => {
    this.props.navigation.setParams({
      loading: loading
    })
    this.setState({
      loading: loading
    })
  }

  fetchForecast = () => {
    const city = this.props.navigation.getParam('city')
    this.setLoading(true)

    fetchWeatherForecast(city)
      .then((responseJson) => {
        const forecastDetails = this.mapForecastDetail(responseJson.list)
        const groupedForecast = this.groupForecastDetailByDate(forecastDetails)
        this.setLoading(false)
        this.setState({
          weatherForecast: forecastDetails,
          groupedForecast: groupedForecast
        })
      })
      .catch((error) => {
        this.props.notifyError(error.message)
        this.setLoading(false)
      })
  }

  mapForecastDetail = (details: any): ForecastDetail[] =>
    details.map((detail: any) => ({
      id: detail.dt_txt,
      dt: detail.dt,
      date: detail.dt_txt.split(' ')[0],
      hour: detail.dt_txt.split(' ')[1],
      temperature: detail.main.temp,
      clouds: detail.clouds.all,
      weatherDescription: detail.weather[0].description,
      icon: detail.weather[0].icon,
      humidity: detail.main.humidity,
      wind: detail.wind.speed
    }))

  groupForecastDetailByDate = (
    weatherForecast: ForecastDetail[]
  ): GroupedForecastType[] => {
    const groupedData = groupBy(weatherForecast, 'date')
    const groupedForecast: GroupedForecastType[] = Object.keys(groupedData).map(
      (key) => {
        return {
          forecastDay: key,
          forecastDayTitle: formatDateToCalendar(key),
          data: groupedData[key]
        }
      }
    )

    return groupedForecast
  }

  render() {
    const { loading, groupedForecast } = this.state
    const city = this.props.navigation.getParam('city')
    return (
      <>
        <Text style={styles.cityName}>{city.name}</Text>
        {!loading ? (
          <ScrollView style={styles.container}>
            {groupedForecast.map((forecast) => {
              const { forecastDay } = forecast
              return <ForecastInterval forecast={forecast} key={forecastDay} />
            })}
          </ScrollView>
        ) : (
          <Text>Loading foreacast data...</Text>
        )}
        <AboutModal
          modalVisible={this.state.modalAboutVisible}
          hideModal={() => this.setState({ modalAboutVisible: false })}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cityName: {
    fontSize: 20,
    color: '#2e2e2e',
    margin: 10
  }
})
