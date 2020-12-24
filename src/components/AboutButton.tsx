import React, { PureComponent } from 'react'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'

export default class AboutButton extends PureComponent {
  render() {
    return <HeaderButton title="About" icon="info" onPress={() => {}} />
  }
}
