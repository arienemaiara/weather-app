import React, { PureComponent } from 'react'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'
import MobileButton from './MobileButton'

type AboutButtonProps = {
  onButtonPress: () => void
}

export default class AboutButton extends PureComponent<AboutButtonProps> {
  render() {
    if (FormFactor.isTV) {
      return (
        <HeaderButton
          title="About"
          icon="info"
          onPress={this.props.onButtonPress}
        />
      )
    }

    return (
      <MobileButton onPress={this.props.onButtonPress} title="About" />
    )
  }
}
