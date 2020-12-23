export interface City {
  id: number
  name: string
  lat?: number | null
  lon?: number | null
}

export interface CityWeather {
  coord: Coord
  weather: Weather[]
  base: string
  main: WeatherInfo
  visibility: number
  wind: Wind
  clouds: {
    all: number
  }
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

type Coord = {
  lat?: number | null
  lon?: number | null
}

type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type WeatherInfo = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

type Wind = {
  speed: number
  deg: number
}

type Sys = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export type ForecastDetail = {
  id: string
  temperature: number
  weatherDescription: string
  icon: string
  humidity: number
  clouds: string
  wind: number
  dt: number
  date: string
  hour: string
}
