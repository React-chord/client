import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/styles';

class Profile extends Component {
  state = { }

  componentDidMount = async () => {
    // TODO : uncomment when done
    const { navigation, user } = this.props;
    console.log('====================================');
    console.log('will receive prop');
    console.log(this.props);
    console.log('====================================');
    if (!user.fullname) {
      navigation.navigate('Login');
    }
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
