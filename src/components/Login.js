import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

import styles from '../styles/styles';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      fullname: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.headlineContainer}>
          <Text h3 style={styles.headlineText}>
            Login Page
          </Text>
        </Card>
      </View>
    );
  }
}

export default connect(null, null)(Login);
