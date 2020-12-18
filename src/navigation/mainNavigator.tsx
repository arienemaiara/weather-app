import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import LanderScreen from '../screens/LanderScreen'
import SplashScreen from '../screens/SplashScreen'

const AppStack = createStackNavigator(
  {
    Home: LanderScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)

const SplashStack = createStackNavigator(
  { Splash: { screen: SplashScreen} },
  {
    initialRouteName: 'Splash',
  },
);

const rootNavigationStack = createSwitchNavigator({
  Splash: SplashStack,
  App: AppStack,
});

export default rootNavigationStack