import React, { Component } from 'react'
import { View, ScrollView, FlatList, Text, StyleSheet, SectionList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation';
import { FormFactor } from '@youi/react-native-youi'

import ForecastInterval from '../components/ForecastInterval'

import { City, ForecastDetail } from '../types/types'
import { groupBy } from '../utils/arrays'
import { fetchWeatherForecast } from '../services/openWeather'

type WeatherInfoProps = {
  notifyError: (message: string) => void
} & NavigationScreenProps<{ city: City }>

type WeatherInfoState = {
  weatherForecast: ForecastDetail[]
  groupedForecast: GroupedForecastType[]
  loading: boolean
}

export type GroupedForecastType = {
  forecastDay: string
  data: ForecastDetail[]
}

export default class WeatherInfoScreen extends Component<WeatherInfoProps, WeatherInfoState> {

  state = {
    weatherForecast: [],
    groupedForecast: [],
    loading: true,
  }

  componentDidMount() {
    this.fetchForecast()    
  }

  fetchForecast = () => {
    const city = this.props.navigation.getParam('city')
    fetchWeatherForecast(city)
      .then(responseJson => {
        const forecastDetails = this.mapForecastDetail(responseJson.list)
        const groupedForecast = this.groupForecastDetailByDate(forecastDetails)
        this.setState({
          weatherForecast: forecastDetails,
          groupedForecast: groupedForecast,
          loading: false,
        })
      })
      .catch(error => {
        this.props.notifyError(error.message)
        this.setState({ 
          loading: false,
        })
      })
  }

  mapForecastDetail = (details: any): ForecastDetail[] => (
    details.map((detail: any) => ({
      id: detail.dt_txt,
      dt: detail.dt,
      date: detail.dt_txt.split(' ')[0],
      temperature: detail.main.temp,
      clouds: detail.clouds.all,
      weatherDescription: detail.weather[0].description,
      icon: detail.weather[0].icon,
      humidity: detail.main.humidity,
      wind: detail.wind.speed,
    }))
  )

  groupForecastDetailByDate = (weatherForecast: ForecastDetail[]): GroupedForecastType[] => {
    const groupedData = groupBy(weatherForecast, 'date')
    const groupedForecast:GroupedForecastType[] = Object.keys(groupedData).map((key) => {
      return {
        forecastDay: key,
        data: groupedData[key]
      }
    })
    return groupedForecast
  }
      
  render() {
    const { loading, groupedForecast }  = this.state
    return (
      !loading && (
        <ScrollView style={{ flex: 1 }}>
          {groupedForecast.map((forecast) => <ForecastInterval forecast={forecast} />)}
        </ScrollView>
      )
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});