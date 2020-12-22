import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import LanderScreen from '../screens/LanderScreen'
import WeatherInfoScreen from '../screens/WeatherInfoScreen';
import SplashScreen from '../screens/SplashScreen'

const AppStack = createStackNavigator(
  {
    Home: LanderScreen,
    Forecast: WeatherInfoScreen
  },
  {
    initialRouteName: 'Home',
  }
)

const SplashStack = createStackNavigator(
  { Splash: SplashScreen },
  {
    initialRouteName: 'Splash',
  },
);

const rootNavigationStack = createSwitchNavigator({
  Splash: SplashStack,
  App: AppStack,
});

export default rootNavigationStack