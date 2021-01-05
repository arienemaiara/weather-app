import React, { PureComponent } from 'react'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'
import MobileButton from './MobileButton'

type AddCityButtonProps = {
  onPress: () => void
}

export default class AddCityButton extends PureComponent<AddCityButtonProps> {
  render() {
    if (FormFactor.isTV) {
      return (
        <HeaderButton
          title="Add City"
          icon="add"
          onPress={this.props.onPress}
          iconStyle={{ fontSize: 16 }}
        />
      )
    }
    
    return (
      <MobileButton onPress={this.props.onPress} title="Add City" />
    )
  }
}
