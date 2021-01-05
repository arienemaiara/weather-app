import React, { PureComponent } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type MobileButtonProps = {
  onPress: () => void,
  title: string
}

export default class MobileButton extends PureComponent<MobileButtonProps> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#088abd',
    flexGrow: 1,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#056991',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12
  }
})