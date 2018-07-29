/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
<<<<<<< HEAD
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
=======
import { Provider } from 'react-redux';
import Permissions from 'react-native-permissions'
>>>>>>> chord practice feature

import { fetchUserInfo } from './src/store/actions';
import Routes from './Routes';

<<<<<<< HEAD
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

  checkAsyncStorage = async () => {
    const { fetchUser } = this.props;
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        fetchUser(token);
      }
    } catch (error) {
      console.log(error);
    }
=======
export default class App extends Component {

  async componentDidMount() {
    await this.checkPermission();
>>>>>>> chord practice feature
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
<<<<<<< HEAD
      <Routes />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: token => dispatch(fetchUserInfo(token)),
});

export default connect(null, mapDispatchToProps)(App);
=======
      <Provider store={store}>
        <Routes />
      </Provider>    
    )
  }
}

>>>>>>> chord practice feature
