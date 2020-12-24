import React, { PureComponent } from 'react'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'

export default class AddCityButton extends PureComponent {
  render() {
    return (
      <HeaderButton
        title="Add City"
        icon="add"
        onPress={() => {}}
        iconStyle={{ fontSize: 16 }}
      />
    )
  }
}
