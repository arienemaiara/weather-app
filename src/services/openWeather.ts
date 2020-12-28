import queryString from 'query-string'

import { City } from '../types/types'
import config from '../config'
import * as constants from '../constants'

const fetchWeatherData = async (type: string, city: City) => {
  const locationQuery = city.name
    ? { q: city.name }
    : { lat: city.lat, lon: city.lon }
  const urlQuery = queryString.stringify({
    ...locationQuery,
    units: config.DEFAULT_UNITS,
    appid: config.OPEN_WEATHER_API_KEY
  })
  const url = `${config.OPEN_WEATHER_BASE_URL}${type}?${urlQuery}`
  console.log('fetching -> ', url)

  const response = await fetch(url)
  if (!response.ok) {
    let message = ''
    if (response.status == 404) {
      message = `No weather data found for ${city.name}`
    } else {
      message = `Request failed [${response.status}]`
    }
    return {
      id: city.id,
      name: city.name,
      error: true,
      message: message
    }
  }
  return await response.json()
}

export const fetchCurrentWeather = (city: City) => {
  return fetchWeatherData(
    constants.OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT,
    city
  )
}

export const fetchWeatherForecast = (city: City) => {
  return fetchWeatherData(constants.OPEN_WEATHER_5DAY_FORECAST_ENDPOINT, city)
}
