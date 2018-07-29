/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { fetchUserInfo } from './src/store/actions';
import Routes from './Routes';

class App extends Component {
  async componentDidMount() {
    await this.checkPermission();
    await this.checkAsyncStorage();
  }

  checkAsyncStorage = async () => {
    const { fetchUser } = this.props;
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('====================================');
      console.log('apakah ada token');
      console.log(token);
      console.log('====================================');
      if (token) {
        fetchUser(token);
      }
    } catch (error) {
      console.log(error);
    }
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
      <Routes />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: token => dispatch(fetchUserInfo(token)),
});

export default connect(null, mapDispatchToProps)(App);
