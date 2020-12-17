export default {
  OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT: 'weather',
  OPEN_WEATHER_5DAY_FORECAST_ENDPOINT: 'forecast',
  DEFAULT_CITIES: [
    { id: 1, name: 'Los Angeles,us', lat: null, lon: null },
    { id: 2, name: 'Ottawa,ca', lat: null, lon: null },
  ]
} as const