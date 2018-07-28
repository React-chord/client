import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/styles';

class Home extends Component {
  state = {
    navigations: ['Quiz'],
  }

  navigateTo = destination => () => {
    const { navigation } = this.props;
    navigation.navigate(destination);
  }

  render() {
    const { navigations } = this.state;
    return (
      <View style={styles.container}>
        {navigations.map((destination, index) => (
          <View style={{ flex: 1, backgroundColor: 'red' }} key={index}>
            <TouchableOpacity onPress={this.navigateTo(destination)}>
              <Text>
                {`To ${destination} Page`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

export default connect(null, null)(Home);
