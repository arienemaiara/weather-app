import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert, AsyncStorage } from 'react-native'

import { City } from '../../types/types'
import { DEFAULT_CITIES, ASYNC_STORAGE_KEYS } from '../../constants'
import { ApplicationState } from '../../reducers';

export interface Location {
  coords: {
    lat: number
    lon: number
    latitude: number
    longitude: number
  }
}

export interface WeatherState {
  cities: City[]
  geoLocation?: Location
  isLoading: boolean
  error?: string
  lastRefreshed: number
}

const initialState: WeatherState = {
  cities: DEFAULT_CITIES,
  isLoading: false,
  lastRefreshed: new Date().getTime(),
}

const weatherSlice = createSlice({
  name: 'Weather',
  initialState,
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    loadLocation(state, action: PayloadAction<Location>) {
      state.geoLocation = action.payload
    },
    loadCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload
    },
    loadError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    updateRefresh(state) {
      state.lastRefreshed = new Date().getTime()
    },
  },
})

export const { loading, loadLocation, loadCities, updateRefresh } = weatherSlice.actions

const getMaxCityId = (cities: City[]): number => {
  return cities.reduce((max: number, c: City) => (c.id > max ? c.id : max), cities[0].id)
}

function storeCitiesAndLocation(cities: City[], position: Location) {
  const store = [[ASYNC_STORAGE_KEYS.CITY_LIST, JSON.stringify(cities)]]
  if (position) {
    store.push([ASYNC_STORAGE_KEYS.GEO_LOCATION, JSON.stringify(position)])
  }
  return AsyncStorage.multiSet(store, error => {
    if (error !== null) console.log('error saving', error)
  })
}

/*
TODO - GET GEOLOCATION FROM NATIVE MODULES
const findLocation = async (dispatch: any, cities: City[]) => {
  try {
    dispatch(loading(true))
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const geoLocation = { coords: { lat: coords.latitude, lon: coords.longitude, ...coords } }

        const firstCity = cities[0]
        if (geoLocation.coords.lat !== firstCity.lat && geoLocation.coords.lon !== firstCity.lon) {
          let currentCity = {
            id: getMaxCityId(cities) + 1,
            name: '',
            lat: geoLocation.coords.lat,
            lon: geoLocation.coords.lon
          }
          dispatch(loadCities([currentCity, ...cities]))
        }
        dispatch(loadLocation(geoLocation))
        await storeCitiesAndLocation(cities, geoLocation!)
        dispatch(loading(false))
      },
      (error: any) => {
        console.log(error)
        Alert.alert(error.message)
        dispatch(loading(false))
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 },
    )
  } catch (error) {
    console.log(error)
  }
}

export const refreshApp = () => async (dispatch: any, getState: () => ApplicationState) => {
  dispatch(updateRefresh())
  await findLocation(dispatch, getState().WeatherState.cities)
}
*/

export const loadApp = () => async (dispatch: any, getState: () => ApplicationState) => {
  const { WeatherState } = getState()
  dispatch(loading(true))
  const stores = await AsyncStorage.multiGet([ASYNC_STORAGE_KEYS.CITY_LIST, ASYNC_STORAGE_KEYS.GEO_LOCATION])
  const cities = stores![0][1]
  const location = stores![1][1]
  if (cities !== null && cities !== undefined) {
    dispatch(loadCities(JSON.parse(cities)))
  }
  if (location !== null && location !== undefined) {
    dispatch(loadLocation(JSON.parse(location)))
  } 
  // else {
  //   await findLocation(dispatch, WeatherState.cities)
  // }
  dispatch(loading(false))
}

export const removeCity = (cityToBeRemoved: City) => async (
  dispatch: any,
  getState: () => ApplicationState,
): Promise<void> => {
  const { cities, geoLocation } = getState().WeatherState
  const newCities = cities.filter((city: City) => city.id !== cityToBeRemoved.id)
  dispatch(loadCities(newCities))
  await storeCitiesAndLocation(newCities, geoLocation!)
}

export const addCity = (city: City) => async (dispatch: any, getState: () => ApplicationState): Promise<void> => {
  const { cities, geoLocation } = getState().WeatherState
  const newCities = [...cities, { ...city, id: getMaxCityId(cities) + 1 }]
  dispatch(loadCities(newCities))
  await storeCitiesAndLocation(newCities, geoLocation!)
}

export const { loadError } = weatherSlice.actions

export default weatherSlice.reducer