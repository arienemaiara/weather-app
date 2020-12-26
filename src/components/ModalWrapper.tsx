import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

type ModalWrapperProps = {
  visible: boolean
  children: React.ReactNode
}

export default class ModalWrapper extends PureComponent<ModalWrapperProps> {
  render() {
    return (
      <Modal
        useNativeDriver={true}
        isVisible={this.props.visible}
        coverScreen={true}
      >
        <View style={styles.mainContainer}>{this.props.children}</View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: 400,
    padding: 10,
    alignSelf: 'center',
    marginTop: 50,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#333'
  }
})
