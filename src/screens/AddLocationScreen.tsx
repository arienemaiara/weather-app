import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
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
  state = {
    cityName: ''
  }

  goBack = () => {
    this.props.navigation.goBack()
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
    fontSize: 25,
    color: '#444',
    textAlign: 'center',
    margin: 20
  },
  input: {
    height: 40,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 3,
    fontSize: 18
  },
  closeButton: {
    padding: 10
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    height: 50,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#088abd',
    borderRadius: 8
  },
  submitButtonDisabled: {
    opacity: 0.2
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
})
