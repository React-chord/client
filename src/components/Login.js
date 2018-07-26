import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Login extends Component {
  render() {
    return (
      <View>
        <Text>
          Login Page
        </Text>
      </View>
    );
  }
}

export default connect(null, null)(Login);
