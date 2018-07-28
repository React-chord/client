import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Profile extends Component {
  state = { }

  render() {
    return (
      <View>
        <Text>
          Profile Page
        </Text>
      </View>
    );
  }
}

export default connect(null, null)(Profile);
