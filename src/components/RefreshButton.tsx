import React, { Component } from 'react'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'

type RefreshButtonProps = {
  onPress: () => void
  disabled: boolean
}

export default class RefreshButton extends Component<RefreshButtonProps> {
  render() {
    return (
      <HeaderButton
        title="Refresh"
        icon="refresh"
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      />
    )
  }
}
