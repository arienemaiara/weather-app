import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncStorage, NativeModules } from 'react-native'

import { City, CityWeather, Geolocation } from '../../types/types'
import { DEFAULT_CITIES, ASYNC_STORAGE_KEYS } from '../../constants'
import { ApplicationState } from '../../reducers'
import { fetchCurrentWeather } from '../../services/openWeather'

const { GeoLocation } = NativeModules

export interface Location {
  coords: {
    lat: number
    lon: number
  }
}

export interface WeatherState {
  cities: City[]
  citiesWeather: CityWeather[]
  geoLocation?: Location
  isLoading: boolean
  error?: string
  lastRefreshed: number
}

const initialState: WeatherState = {
  cities: DEFAULT_CITIES,
  citiesWeather: [],
  isLoading: false,
  lastRefreshed: new Date().getTime()
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
    loadCitiesWeather(state, action: PayloadAction<CityWeather[]>) {
      state.citiesWeather = action.payload
    },
    loadError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    updateRefresh(state) {
      state.lastRefreshed = new Date().getTime()
    }
  }
})

export const {
  loading,
  loadLocation,
  loadCities,
  loadCitiesWeather,
  updateRefresh
} = weatherSlice.actions

const getMaxCityId = (cities: City[]): number => {
  return cities.reduce(
    (max: number, c: City) => (c.id > max ? c.id : max),
    cities[0].id
  )
}

function storeCitiesAndLocation(cities: City[], position: Location) {
  const store = [[ASYNC_STORAGE_KEYS.CITY_LIST, JSON.stringify(cities)]]
  if (position) {
    store.push([ASYNC_STORAGE_KEYS.GEO_LOCATION, JSON.stringify(position)])
  }
  return AsyncStorage.multiSet(store, (error) => {
    if (error !== null) console.log('error saving', error)
  })
}

const findLocation = async (dispatch: any, cities: City[]) => {
  try {
    const location = await GeoLocation.get()
    const geoLocation = { coords: { lat: location.lat, lon: location.long } }
    dispatch(loadLocation(geoLocation))

    const firstCity = cities[0]
    if (location.lat !== firstCity.lat && location.long !== firstCity.lon) {
      let currentCity = {
        id: getMaxCityId(cities) + 1,
        name: '',
        lat: location.lat,
        lon: location.long
      }
      dispatch(loadCities([currentCity, ...cities]))
    }

    await storeCitiesAndLocation(cities, geoLocation!)
  } catch (error) {
    console.log(error.message)
  }
}

export const refreshApp = () => async (
  dispatch: any,
  getState: () => ApplicationState
) => {
  dispatch(loadApp())
  dispatch(updateRefresh())
}

export const loadApp = () => async (
  dispatch: any,
  getState: () => ApplicationState
) => {
  dispatch(loading(true))
  const stores = await AsyncStorage.multiGet([
    ASYNC_STORAGE_KEYS.CITY_LIST,
    ASYNC_STORAGE_KEYS.GEO_LOCATION
  ])
  const cities = stores![0][1]

  if (cities !== null && cities !== undefined) {
    dispatch(loadCities(JSON.parse(cities)))
  }

  let { weather } = getState()

  // await findLocation(dispatch, weather.cities)

  const citiesWeather = await getCitiesWeather(getState().weather.cities)
  dispatch(loadCitiesWeather(citiesWeather))

  dispatch(loading(false))
}

const getCitiesWeather = async (cities: City[]) => {
  return Promise.all(cities.map((city) => fetchCurrentWeather(city)))
}

export const removeCity = (
  cityToBeRemoved: City,
  cityWeather: CityWeather
) => async (dispatch: any, getState: () => ApplicationState): Promise<void> => {
  const { cities, citiesWeather, geoLocation } = getState().weather

  const newCities = cities.filter(
    (city: City) => city.id !== cityToBeRemoved.id
  )

  dispatch(loadCities(newCities))

  const newCitiesWeather = citiesWeather.filter(
    (city: CityWeather) => city !== cityWeather
  )

  dispatch(loadCitiesWeather(newCitiesWeather))

  await storeCitiesAndLocation(newCities, geoLocation!)
}

export const addCity = (city: City) => async (
  dispatch: any,
  getState: () => ApplicationState
): Promise<void> => {
  const { cities, citiesWeather, geoLocation } = getState().weather

  const newCityWeather = await fetchCurrentWeather(city)
  const newCitiesWeather = [...citiesWeather, { ...newCityWeather }]
  dispatch(loadCitiesWeather(newCitiesWeather))

  const newCities = [
    ...cities,
    {
      id: getMaxCityId(cities) + 1,
      name: newCityWeather.name
    }
  ]

  dispatch(loadCities(newCities))

  await storeCitiesAndLocation(newCities, geoLocation!)
}

export const { loadError } = weatherSlice.actions

export default weatherSlice.reducer
