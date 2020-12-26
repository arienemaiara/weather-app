import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle
} from 'react-native'

import FontIcon, { IconsType } from '../FontIcon'

type HeaderButtonProps = {
  title: string
  icon: IconsType
  onPress: () => void
  disabled?: boolean
  iconStyle?: StyleProp<TextStyle>
}

export default class HeaderButton extends PureComponent<HeaderButtonProps> {
  render() {
    const { disabled } = this.props
    return (
      <TouchableOpacity
        accessibilityLabel={this.props.title}
        onPress={this.props.onPress}
        style={[
          styles.buttonContainer,
          disabled ? styles.buttonDisabled : null
        ]}
        disabled={disabled ? true : false}
      >
        <FontIcon icon={this.props.icon} style={this.props.iconStyle} />
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
  },
  buttonDisabled: {
    opacity: 0.5
  }
})
