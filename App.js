/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';

import store from './src/store/index';
import Routes from './Routes';

class App extends Component {
  async componentDidMount() {
    await this.checkPermission();
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default connect(null, null)(App);
