import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

type ButtonContainerProps = {
  children: React.ReactNode
}

export default class ButtonContainer extends PureComponent<ButtonContainerProps> {
  render() {
    return (
      <View style={styles.headerButtonContainer}>{this.props.children}</View>
    )
  }
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  }
})
