import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { DeviceInfo, FormFactor } from '@youi/react-native-youi'

import ModalWrapper from './ModalWrapper'

type AboutModalProps = {
  modalVisible: boolean
  hideModal: () => void
}

export default class AboutModal extends PureComponent<AboutModalProps> {
  render() {
    return (
      <ModalWrapper visible={this.props.modalVisible}>
        <Text style={styles.modalTitle}>About</Text>
        <Text style={[styles.text, styles.aboutText]}>
          {'\n'}
          {'\n'}This is an app to check the weather in different regions and to
          view the current forcast. {'\n'}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id leo
          lobortis, commodo tellus quis, porttitor massa. Proin lectus justo,
          pretium a turpis in, luctus rhoncus elit. Etiam feugiat, elit ac
          rhoncus rutrum, lectus tortor fermentum orci, ut pellentesque urna
          erat sollicitudin velit. Duis et ipsum justo. Nulla faucibus pharetra
          nulla, a pellentesque est dignissim in. Praesent blandit id leo et
          eleifend. Nulla vel tristique erat.
        </Text>
        <Text style={styles.text}>App Version: 1.0</Text>
        <Text style={styles.text}>
          Device Name: {DeviceInfo.getSystemName()}
        </Text>
        {FormFactor.isTV && (
          <>
            <Text style={styles.text}>
              Device Version: {DeviceInfo.getSystemVersion()}
            </Text>
            <Text style={styles.text}>
              Device Id: {DeviceInfo.getDeviceId()}
            </Text>
          </>
        )}

        <TouchableOpacity
          onPress={this.props.hideModal}
          style={styles.modalCloseButton}
        >
          <Text style={styles.modalCloseButtonText}>OK</Text>
        </TouchableOpacity>
      </ModalWrapper>
    )
  }
}

const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: 10
  },
  text: {
    marginVertical: 3,
    fontSize: 11,
    color: '#333'
  },
  aboutText: {
    fontSize: 10,
    marginVertical: 5
  },
  modalCloseButton: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#333'
  },
  modalCloseButtonText: {
    color: '#333'
  }
})
