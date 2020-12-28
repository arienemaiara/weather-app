import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

export type AlertType = {
  visible: boolean
  title?: string
  message: string
  confirmButtonText: string
  onConfirmPress: () => void
  cancelButtonText?: string
  onCancelPress?: () => void
}

export default class Alert extends PureComponent<AlertType> {
  render() {
    const {
      visible,
      title,
      message,
      confirmButtonText,
      onConfirmPress,
      cancelButtonText,
      onCancelPress
    } = this.props
    return (
      <Modal useNativeDriver={true} isVisible={visible} coverScreen={true}>
        <View style={styles.mainContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onConfirmPress}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={{ color: '#fff' }}>{confirmButtonText}</Text>
            </TouchableOpacity>
            {cancelButtonText && (
              <TouchableOpacity
                onPress={onCancelPress}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={{ color: '#c22a2a' }}>{cancelButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: 200,
    padding: 10,
    alignSelf: 'center',
    marginTop: 50,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#333'
  },
  title: {
    marginVertical: 5,
    fontSize: 14
  },
  message: {
    fontSize: 13,
    color: '#333'
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#333'
  },
  confirmButton: {
    paddingHorizontal: 8,
    borderColor: '#28af0d',
    backgroundColor: '#46c42c'
  },
  cancelButton: {
    borderWidth: 0
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15
  }
})
