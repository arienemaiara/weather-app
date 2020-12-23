import React, { PureComponent } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import FontIcon, { IconsType } from '../FontIcon'

type HeaderButtonProps = {
  title: string
  icon: IconsType
  onPress: () => void
  disabled?: boolean
}

export default class HeaderButton extends PureComponent<HeaderButtonProps> {
  render() {
    return (
      <TouchableOpacity
        accessibilityLabel={this.props.title}
        onPress={this.props.onPress}
        style={styles.buttonContainer}
        disabled={this.props.disabled ? true : false}
      >
        <FontIcon icon={this.props.icon} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#056991',
    width: 30,
    height: 30,
    borderRadius: 15
  }
})
