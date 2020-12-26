import React, { PureComponent } from 'react'

import HeaderButton from './header/HeaderButton'

type AboutButtonProps = {
  onButtonPress: () => void
}

export default class AboutButton extends PureComponent<AboutButtonProps> {
  render() {
    return (
      <HeaderButton
        title="About"
        icon="info"
        onPress={this.props.onButtonPress}
      />
    )
  }
}
