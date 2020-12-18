/**
 * Basic You.i RN app
 */
import React, { Component } from "react";
import { AppRegistry, Image, StyleSheet, Text, View } from "react-native";
import { FormFactor } from "@youi/react-native-youi";
import { Provider } from 'react-redux';

import { store } from './src/store' 
import MainNavigator from './src/navigation/mainNavigator'

export default class YiReactApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("YiReactApp", () => YiReactApp);
