import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native'
import {
  NavigationScreenProps,
  NavigationEventSubscription
} from 'react-navigation'
import { FocusManager, FormFactor } from '@youi/react-native-youi'
import { connect } from 'react-redux'

import { addCity } from '../features/weather/weatherSlicer'

import { City } from '../types/types'

type AddLocationProps = {
  onAddCity: (city: City) => void
} & NavigationScreenProps

type AddLocationState = {
  cityName: string
}

class AddLocationScreen extends Component<AddLocationProps, AddLocationState> {
  focusListener!: NavigationEventSubscription
  blurListener!: NavigationEventSubscription

  locationTextInput = React.createRef<TextInput>()

  state = {
    cityName: ''
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.goBack)
    })
    this.blurListener = this.props.navigation.addListener('didBlur', () =>
      BackHandler.removeEventListener('hardwareBackPress', this.goBack)
    )

    if (this.locationTextInput.current)
      FocusManager.focus(this.locationTextInput.current)
  }

  componentWillUnmount() {
    this.focusListener.remove()
    this.blurListener.remove()
    BackHandler.removeEventListener('hardwareBackPress', this.goBack)
  }

  goBack = () => {
    this.props.navigation.goBack()
    return true
  }

  onSubmit = () => {
    const { navigation } = this.props
    this.props.onAddCity({ name: this.state.cityName, id: 0 })
    navigation.goBack()
  }

  render() {
    const { cityName } = this.state
    const shouldDisableSubmit = cityName.length === 0

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
          <Text>X</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Enter location name:</Text>

        <TextInput
          style={styles.input}
          placeholder="City"
          value={cityName}
          onChangeText={(cityName) => this.setState({ cityName })}
          ref={this.locationTextInput}
        />

        <TouchableOpacity
          style={
            shouldDisableSubmit
              ? { ...styles.submitButton, ...styles.submitButtonDisabled }
              : styles.submitButton
          }
          onPress={this.onSubmit}
          disabled={shouldDisableSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onAddCity: (city: City) => dispatch(addCity(city))
})

export default connect(null, mapDispatchToProps)(AddLocationScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: FormFactor.isTV ? 25 : 16,
    color: '#444',
    textAlign: 'center',
    margin: FormFactor.isTV ? 20 : 10
  },
  input: {
    height: FormFactor.isTV ? 40 : 20,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: FormFactor.isTV ? 20 : 0,
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 3,
    fontSize: FormFactor.isTV ? 18 : 14
  },
  closeButton: {
    padding: 10
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    height: FormFactor.isTV ? 50 : 25,
    width: FormFactor.isTV ? 250 : 100,
    alignSelf: 'center',
    backgroundColor: '#088abd',
    borderRadius: 8
  },
  submitButtonDisabled: {
    opacity: 0.2
  },
  buttonText: {
    fontSize: FormFactor.isTV ? 22 : 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
})
