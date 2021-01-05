import React, { PureComponent } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { FormFactor } from '@youi/react-native-youi'
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
        <ScrollView style={styles.mainContainer}>{this.props.children}</ScrollView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: FormFactor.isTV ? 400 : '100%',
    padding: 10,
    marginTop: FormFactor.isTV ? 50 : 70,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#333'
  }
})
