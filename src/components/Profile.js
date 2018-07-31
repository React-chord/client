import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar, AsyncStorage, TouchableWithoutFeedback,
} from 'react-native';
import {
  Avatar, Badge, Icon, Button,
} from 'react-native-elements';
import { connect } from 'react-redux';

import styles from '../styles/styles';

class Profile extends Component {
  state = {
    progressBar: null,
    percentage: 0,
    isCounted: false,
  };

  componentDidMount = async () => {
    // TODO : uncomment when done
    const { navigation, user } = this.props;

    if (!user.fullname) {
      navigation.navigate('Login');
    } else {
      this.countProgress();
    }
  };

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    console.log('will receive props ====>', user);
    if (user.fullname) {
      this.countProgress();
    }
  }

  countProgress = () => {
    const { user } = this.props;

    const coursePractice = user.courses.practice;
    const initialProgress = Array(10).fill({ isCompleted: false });

    let completedCourseCount;
    let newPercentage;
    if (coursePractice && coursePractice.length > 0) {
      console.log('masuk kondisi course practice exis', coursePractice);
      completedCourseCount = coursePractice.reduce((sum, note) => sum + note.score, 0);
      console.log('completed course ==============>', completedCourseCount);
      newPercentage = (completedCourseCount / (coursePractice.length * 100)) * 100;
      console.log('percentage =============>', newPercentage);
    }

    if (newPercentage) {
      initialProgress.forEach((el, i) => {
        if (i <= newPercentage / 10) {
          initialProgress[i] = { isCompleted: true };
        }
      });
    }

    console.log('counted', initialProgress);

    this.setState({
      progressBar: initialProgress,
      isCounted: true,
      percentage: newPercentage ? Math.round(newPercentage) : 0,
    });
  };

  render() {
    const { user } = this.props;
    const { progressBar, isCounted, percentage } = this.state;
    const avatarUri = 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg';

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
            <View style={{
              marginTop: 20,
            }}
            >
              {/* <Text>
                Logout
              </Text> */}
              <Badge
                value="Logout"
                textStyle={{ ...localStyles.text, textAlign: 'left', fontSize: 14 }}
                containerStyle={{
                  backgroundColor: '#C70039',
                  marginTop: 30,
                  marginLeft: 10,
                  width: 80,
                  height: 20,
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Badge
              value={user.fullname}
              textStyle={{ ...localStyles.text, textAlign: 'right' }}
              containerStyle={localStyles.textContainer}
            />
            {user.email ? (
              <Text style={{ ...localStyles.textCaption, textAlign: 'right', marginRight: 10 }}>
                {user.email.toLowerCase()}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={localStyles.userProgressContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ff6f00' }}>
              <Text style={{ ...localStyles.textCaption, marginLeft: 10 }}>
                Practice Course
              </Text>
            </View>
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
              <Text style={{ ...localStyles.textCaption, marginLeft: 10 }}>
                {`${percentage} %`}
              </Text>
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
  progressTextContainer: {},
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(Profile);
