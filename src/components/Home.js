import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';
import { generateChords } from '../store/actions';

class Home extends Component {
  state = {
    navigations: ['ChordPractice', 'Scale', 'Quiz'],
  };

  componentDidMount() {
    this.props.getChords();
  }

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
              <Icon style={style.actionButtonIcon} name="ios-musical-notes" />
              <Text style={{ color: 'white' }}>
                {`${destination} Page`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const style = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 50,
    height: 50,
    color: '#ff6f00',
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  getChords: () => dispatch(generateChords()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
