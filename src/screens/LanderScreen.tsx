import React from 'react'
import { View, FlatList, Text, StyleSheet, NativeModules } from 'react-native'
import {
  FormFactor
} from '@youi/react-native-youi'
import { NavigationScreenProps } from 'react-navigation';
import { useQuery } from 'react-query'

import WeatherInfoCard, { WeatherInfoCardProps } from '../components/WeatherInfoCard'

const cities:WeatherInfoCardProps[] = [
  {
    id: 1,
    city: 'Ottawa',
    weather: '24°c',
    weatherStatus: 'sunny',
    weatherIcon: 'icon'
  },
  {
    id: 2,
    city: 'Toronto',
    weather: '20°c',
    weatherStatus: 'sunny',
    weatherIcon: 'icon'
  }
]

interface LanderScreen extends NavigationScreenProps {
  citiesWeather: any[]
}

export default function LanderScreen({ navigation }: NavigationScreenProps) {

  console.log('citiesWeather.', navigation.getParam('citiesWeather'))

  // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  //   fetch(
  //     "https://api.github.com/repos/tannerlinsley/react-query"
  //   ).then((res) => res.json())
  // );

  // if (isLoading) {
  //   return <Text>Loading...</Text>
  // };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={cities} 
        horizontal={FormFactor.isTV ? true : false}
        renderItem={({ item }) => {
          return (
            <WeatherInfoCard 
              id={item.id}
              city={item.city}
              weather={item.weather}
              weatherIcon={item.weatherIcon}
              weatherStatus={item.weatherStatus}
            />
          )
        }}
        keyExtractor={item => item.id!.toString()}
      />
    </View>
  )
}

const styles = FormFactor.select({
  TV: StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fcfefe'
    }
  })
})