type WeatherImagesMap = {
  [key: string]: string
}

export const weatherImages: WeatherImagesMap = {
  '01d': 'sun.png', //icon-sun - clear
  '01n': 'moon.png', //icon-moon - clear
  '02d': 'cloud-day.png', //icon-cloud-sun - partly cloudy
  '02n': 'cloud-night.png', //icon-cloud-moon - partly cloudy
  '03d': 'clouds.png', //icon-clouds - scattered clouds
  '03n': 'clouds.png', //icon-clouds - scattered clouds
  '04d': 'clouds.png', //icon-cloud - broken clouds
  '04n': 'clouds.png', //icon-cloud - broken clouds
  '09d': 'rain.png', //icon-rain - showers
  '09n': 'rain.png', //icon-rain - showers
  '10d': 'rain.png', //icon-rain - rain
  '10n': 'rain.png', //icon-rain - rain
  '11d': 'storm.png', // icon-cloud-flash - thunderstorm
  '11n': 'storm.png', // icon-cloud-flash - thunderstorm
  '13d': 'snow.png', //icon-snow-heavy - snow
  '13n': 'snow.png', //icon-snow-heavy - snow
  '50d': 'wind.png', // icon-windy-rain -  mist/rain
  '50n': 'wind.png', // icon-windy-rain -  mist/rain
}