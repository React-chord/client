import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/styles';

class Profile extends Component {
  state = { }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Profile Page
        </Text>
      </View>
    );
  }
}

export default connect(null, null)(Profile);
