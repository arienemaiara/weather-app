import { City } from '../types/types'
import config from '../config'
import * as constants from '../constants'

const fetchWeatherData = async (type: string, city: City) => {
  const locationQuery = city.name ? `q=${city.name}` : `lat=${city.lat}&lon=${city.lon}`
  const url = `${config.OPEN_WEATHER_BASE_URL}${type}?${locationQuery}&units=${config.DEFAULT_UNITS}&appid=${config.OPEN_WEATHER_API_KEY}`
  console.log('fetching -> ', url)

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status == 404) {
      throw new Error(`No weather data found for los angeles`)
    } else {
      throw new Error(`Request failed [${response.status}]`)
    }
  }
  return await response.json();
}

export const fetchCurrentWeather = (city: City) => {
  return fetchWeatherData(constants.OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT, city)
}

export const fetchWeatherForecast = (city: City) => {
  return fetchWeatherData(constants.OPEN_WEATHER_5DAY_FORECAST_ENDPOINT, city)
}