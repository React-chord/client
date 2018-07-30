import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar, AsyncStorage, Image,
} from 'react-native';
import { Avatar, Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import styles from '../styles/styles';

const progress = [
  {
    id: 1,
    isCompleted: true,
  },
  {
    id: 2,
    isCompleted: true,
  },
  {
    id: 3,
    isCompleted: false,
  },
  {
    id: 4,
    isCompleted: true,
  },
  {
    id: 5,
    isCompleted: false,
  },
  {
    id: 6,
    isCompleted: true,
  },
  {
    id: 7,
    isCompleted: true,
  },
  {
    id: 8,
    isCompleted: false,
  },
  {
    id: 9,
    isCompleted: true,
  },
  {
    id: 10,
    isCompleted: true,
  },
  {
    id: 11,
    isCompleted: false,
  },
  {
    id: 12,
    isCompleted: true,
  },
  {
    id: 13,
    isCompleted: true,
  },
];
class Profile extends Component {
  state = {
    progressBar: null,
    percentage: null,
    isCounted: false,
  };

  componentDidMount = async () => {
    // TODO : uncomment when done
    const { navigation, user } = this.props;

    console.log('====================================');
    console.log('will did mount');
    console.log(this.state.progressBar);
    console.log(this.props);
    console.log('token');
    console.log('====================================');
    if (!user.fullname) {
      navigation.navigate('Login');
    }

    this.countProgress();
  };

  componentWillReceiveProps = async (nextProps) => {
    const token = await AsyncStorage.getItem('token');
    console.log('====================================');
    console.log('will receive prop');
    console.log(nextProps);
    console.log('token');
    console.log(token);
    console.log('====================================');
  };

  countProgress = () => {
    const initialProgress = Array(10).fill({ isCompleted: false });
    console.log('init array =======>', initialProgress);

    const completedCourseCount = progress.filter(course => course.isCompleted === true).length;
    console.log('completed course ==============>', completedCourseCount);
    const percentage = (completedCourseCount / progress.length) * 100;
    console.log('percentage =============>', percentage);

    initialProgress.forEach((el, i) => {
      if (i <= percentage / 10) {
        initialProgress[i] = { isCompleted: true };
      }
    });

    console.log('counted', initialProgress);

    this.setState({
      progressBar: initialProgress,
      isCounted: true,
      percentage,
    });
  };

  render() {
    const { user } = this.props;
    const { progressBar, isCounted } = this.state;
    const avatarUri = 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg';

    console.log('render profile =========> ', user);

    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={localStyles.userProfileContainer}>
          <View style={{ flex: 1 }}>
            <Avatar
              source={{ uri: avatarUri }}
              containerStyle={localStyles.avatarContainer}
              rounded
              medium
            />
          </View>
          <View style={{ flex: 1 }}>
            <Badge
              value={user.fullname}
              textStyle={localStyles.text}
              containerStyle={localStyles.textContainer}
            />
            {user.email ? (
              <Text style={localStyles.textCaption}>
                {user.email.toLowerCase()}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={localStyles.userProgressContainer}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
            <Text style={localStyles.headline}>
              Progress
            </Text>
            <View style={localStyles.progressBarContainer}>
              {isCounted && progressBar
                ? progressBar.map((el, i) => (
                  <Icon
                    type="material-community"
                    name="bandcamp"
                    color={el.isCompleted ? '#ff6f00' : 'white'}
                    key={i}
                  />
                ))
                : null}
            </View>
          </View>
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
    // width: '100%',
  },
  userProgressContainer: {
    flex: 2,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
  },
  headline: {
    color: 'white',
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#ff6f00',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  textCaption: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
  },
  avatarContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(Profile);
