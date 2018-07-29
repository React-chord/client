import React, { Component } from 'react';
<<<<<<< HEAD
import {
  Text, View, TouchableOpacity,
} from 'react-native';
=======
import { Text, View } from 'react-native';
>>>>>>> chord practice feature
import { connect } from 'react-redux';

import styles from '../styles/styles';
import { generateChords } from '../store/actions';

class Home extends Component {
<<<<<<< HEAD
  state = {
    navigations: ['Quiz'],
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
=======

  componentDidMount(){
    this.props.getChords()
  }

  render () {
    return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
          Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
          To get started, edit App.js
      </Text>
    </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChords: () => dispatch(generateChords())
  }
}

export default connect(null, mapDispatchToProps)(Home);
>>>>>>> chord practice feature
