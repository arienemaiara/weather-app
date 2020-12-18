import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
// import { useQueries } from 'react-query'
import { NavigationScreenProps } from 'react-navigation';

import { DEFAULT_CITIES } from '../constants'
import { fetchCurrentWeather } from '../services/openWeather'

export default function SplashScreen({ navigation }: NavigationScreenProps) {

  // const citiesQueries = useQueries(
  //   DEFAULT_CITIES.map(city => {
  //     return {
  //       queryKey: ['city', city.name],
  //       queryFn: () => fetchCurrentWeather(city)
  //     }
  //   })
  // )

  // useEffect(() => {
  //   const isLoading = citiesQueries.filter((query) => query.isLoading === true)
  //   if (!isLoading.length) {
  //     navigation.navigate('Home', {
  //       citiesWeather: citiesQueries.map((item) => item.data)
  //     })
  //   }
  // }, [citiesQueries])

  return (
    <View style={{backgroundColor: '#458', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>splash</Text>
    </View>
  )
}