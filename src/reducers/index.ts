import { combineReducers } from '@reduxjs/toolkit'

import weatherReducer, { WeatherState } from '../features/weather/weatherSlicer'

export interface ApplicationState {
  weather: WeatherState
}

const rootReducer = combineReducers({
  weather: weatherReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer