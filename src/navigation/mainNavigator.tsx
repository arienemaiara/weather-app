import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import LanderScreen from '../screens/LanderScreen'
import WeatherInfoScreen from '../screens/WeatherInfoScreen'
import AddLocationScreen from '../screens/AddLocationScreen'
import SplashScreen from '../screens/SplashScreen'

import config from '../config'

const cardStyleOptions = {
  cardStyle: {
    backgroundColor: '#fcfefe'
  }
}

const MainStack = createStackNavigator(
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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    AddLocation: {
      screen: AddLocationScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
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
  App: RootStack
})

export default rootNavigationStack
