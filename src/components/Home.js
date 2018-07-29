import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/styles';

class Home extends Component {
  state = {
    navigations: ['Quiz', 'Scale'],
  };

  navigateTo = destination => () => {
    const { navigation } = this.props;
    navigation.navigate(destination);
  };

  render() {
    const { navigations } = this.state;
    return (
      <View style={styles.container}>
        {navigations.map((destination, index) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
          >
            <TouchableOpacity onPress={this.navigateTo(destination)}>
              <Text style={{ color: 'white' }}>
                {`To ${destination} Page`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

export default connect(
  null,
  null,
)(Home);
