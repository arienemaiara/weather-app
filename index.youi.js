import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { FontRegistry } from "@youi/react-native-youi";
import { Provider } from 'react-redux';

import { store } from './src/store' 
import MainNavigator from './src/navigation/mainNavigator'

FontRegistry.add({ family: 'IconFont', file: 'fontello.ttf' });

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