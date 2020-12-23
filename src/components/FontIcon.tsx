import React, { PureComponent } from 'react'
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'

export type IconsType = 'add' | 'info' | 'refresh'

type CharcodeListType = {
  [key in IconsType]: string
}

const CharcodeList: CharcodeListType = {
  add: '0xe800',
  info: '0xe801',
  refresh: '0xe802'
}

type FontIconProps = {
  icon: IconsType
  style?: StyleProp<TextStyle>
}

export default class FontIcon extends PureComponent<FontIconProps> {
  render() {
    return (
      <Text style={[styles.icon, this.props.style]}>
        {String.fromCharCode(CharcodeList[this.props.icon])}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'IconFont',
    color: '#333',
    fontSize: 14
  }
})
