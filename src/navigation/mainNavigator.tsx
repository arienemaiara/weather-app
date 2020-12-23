import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import LanderScreen from '../screens/LanderScreen'
import WeatherInfoScreen from '../screens/WeatherInfoScreen'
import SplashScreen from '../screens/SplashScreen'

import config from '../config'

const cardStyleOptions = {
  cardStyle: {
    backgroundColor: '#fcfefe'
  }
}

const AppStack = createStackNavigator(
  {
    Home: LanderScreen,
    Forecast: WeatherInfoScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTitle: config.APP_TITLE,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#088abd'
      },
      headerTintColor: '#fff'
    },
    ...cardStyleOptions
  }
)

const SplashStack = createStackNavigator(
  { Splash: SplashScreen },
  {
    initialRouteName: 'Splash',
    ...cardStyleOptions
  }
)

const rootNavigationStack = createSwitchNavigator({
  Splash: SplashStack,
  App: AppStack
})

export default rootNavigationStack
