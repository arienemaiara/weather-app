
import { City } from '../types/types'

export const OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT = 'weather'

export const OPEN_WEATHER_5DAY_FORECAST_ENDPOINT = 'forecast'

export const ASYNC_STORAGE_KEYS = {
  CITY_LIST: 'CITY_LIST',
  GEO_LOCATION: 'GEO_LOCATION',
}

export const MASTER_CITY_LIST = [
  { id: 1, name: 'Ottawa', lat: null, lon: null },
  { id: 2, name: 'Montreal', lat: null, lon: null },
  { id: 3, name: 'Toronto', lat: null, lon: null },
  { id: 4, name: 'Halifax', lat: null, lon: null },
  { id: 5, name: 'Charlottetown', lat: null, lon: null },
  { id: 6, name: 'Winnipeg', lat: null, lon: null },
  { id: 7, name: 'Regina', lat: null, lon: null },
  { id: 8, name: 'Calgary', lat: null, lon: null },
  { id: 9, name: 'Edmonton', lat: null, lon: null },
  { id: 10, name: 'Vancouver', lat: null, lon: null },
  { id: 11, name: 'Victoria', lat: null, lon: null },
  { id: 12, name: 'Iqaluit', lat: null, lon: null },
  { id: 13, name: 'New York City', lat: null, lon: null },
  { id: 14, name: 'Boston', lat: null, lon: null },
  { id: 15, name: 'Chicago', lat: null, lon: null },
  { id: 16, name: 'Miami', lat: null, lon: null },
  { id: 17, name: 'Houston', lat: null, lon: null },
  { id: 18, name: 'Las Vegas', lat: null, lon: null },
  { id: 19, name: 'San Francisco', lat: null, lon: null },
  { id: 20, name: 'San Diego', lat: null, lon: null },
  { id: 21, name: 'Mexico City', lat: null, lon: null },
  { id: 22, name: 'Caracas', lat: null, lon: null },
  { id: 23, name: 'La Paz', lat: null, lon: null },
  { id: 24, name: 'Rio de Janeiro', lat: null, lon: null },
  { id: 25, name: 'Buenos Aries', lat: null, lon: null },
  { id: 26, name: 'Santiago', lat: null, lon: null },
  { id: 27, name: 'Reykjavik', lat: null, lon: null },
  { id: 28, name: 'Stockholm', lat: null, lon: null },
  { id: 29, name: 'Edinburgh', lat: null, lon: null },
  { id: 30, name: 'London', lat: null, lon: null },
  { id: 31, name: 'Amsterdam', lat: null, lon: null },
  { id: 32, name: 'Berlin', lat: null, lon: null },
  { id: 33, name: 'Paris', lat: null, lon: null },
  { id: 34, name: 'Madrid', lat: null, lon: null },
  { id: 35, name: 'Warsaw', lat: null, lon: null },
  { id: 36, name: 'Prague', lat: null, lon: null },
  { id: 37, name: 'Zagreb', lat: null, lon: null },
  { id: 38, name: 'Rome', lat: null, lon: null },
  { id: 39, name: 'Athens', lat: null, lon: null },
  { id: 40, name: 'Istanbul', lat: null, lon: null },
  { id: 41, name: 'Moscow', lat: null, lon: null },
  { id: 42, name: 'Kyiv', lat: null, lon: null },
  { id: 43, name: 'Algiers', lat: null, lon: null },
  { id: 44, name: 'Cairo', lat: null, lon: null },
  { id: 45, name: 'Beirut', lat: null, lon: null },
  { id: 46, name: 'Baghdad', lat: null, lon: null },
  { id: 47, name: 'Tehran', lat: null, lon: null },
  { id: 48, name: 'Riyadh', lat: null, lon: null },
  { id: 49, name: 'Dakar', lat: null, lon: null },
  { id: 50, name: 'Libreville', lat: null, lon: null },
  { id: 51, name: 'Nairobi', lat: null, lon: null },
  { id: 52, name: 'Mogadishu', lat: null, lon: null },
  { id: 53, name: 'Cape Town', lat: null, lon: null },
  { id: 54, name: 'New Delhi', lat: null, lon: null },
  { id: 55, name: 'Mumbai', lat: null, lon: null },
  { id: 56, name: 'Bangkok', lat: null, lon: null },
  { id: 57, name: 'Beijing', lat: null, lon: null },
  { id: 58, name: 'Shanghai', lat: null, lon: null },
  { id: 59, name: 'Seoul', lat: null, lon: null },
  { id: 60, name: 'Tokyo', lat: null, lon: null },
  { id: 61, name: 'Manila', lat: null, lon: null },
  { id: 62, name: 'Jakarta', lat: null, lon: null },
  { id: 63, name: 'Perth', lat: null, lon: null },
  { id: 64, name: 'Sydney', lat: null, lon: null },
  { id: 65, name: 'Wellington', lat: null, lon: null },
]

export const DEFAULT_CITIES: City[] = [
  { id: 1, name: 'Los Angeles', lat: null, lon: null },
  { id: 2, name: 'Ottawa', lat: null, lon: null },
]

export const FETCHING_THROTTLE_MS = 5000

export const WEATHER_ICON_STYLE_1 = 1
export const WEATHER_ICON_STYLE_2 = 2
export const DEFAULT_WEATHER_ICON_STYLE = WEATHER_ICON_STYLE_2

export const ERROR_MESSAGE_LOST_CONNECTION = 'Lost Network Connection'