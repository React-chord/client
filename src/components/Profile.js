import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar, AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/styles';

class Profile extends Component {
  state = { }

  componentDidMount = async () => {
    // TODO : uncomment when done
    const { navigation, user } = this.props;
    const token = await AsyncStorage.getItem('token');

    console.log('====================================');
    console.log('will did mount');
    console.log(this.props);
    console.log('token');
    console.log(token);
    console.log('====================================');
    if (!user.fullname) {
      navigation.navigate('Login');
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    const token = await AsyncStorage.getItem('token');
    console.log('====================================');
    console.log('will receive prop');
    console.log(nextProps);
    console.log('token');
    console.log(token);
    console.log('====================================');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={localStyles.userProfileContainer}>
          <View style={{ flex: 1 }}>
            <Text style={localStyles.headline}>
              For Avatar
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={localStyles.headline}>
              For Name
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={localStyles.headline}>
            Progress
          </Text>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'red',
    // width: '100%',
  },
  headline: {
    color: 'white',
    textAlign: 'left',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
