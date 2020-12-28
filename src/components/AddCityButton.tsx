import React, { PureComponent } from 'react'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'

type AddCityButtonProps = {
  onPress: () => void
}

export default class AddCityButton extends PureComponent<AddCityButtonProps> {
  render() {
    return (
      <HeaderButton
        title="Add City"
        icon="add"
        onPress={this.props.onPress}
        iconStyle={{ fontSize: 16 }}
      />
    )
  }
}
