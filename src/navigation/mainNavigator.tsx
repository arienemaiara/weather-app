import { createStackNavigator } from 'react-navigation'

import LanderScreen from '../screens/LanderScreen'

const RootStack = createStackNavigator(
  {
    Home: LanderScreen
  },
  {
    headerMode: 'none'
  }
)

export default RootStack