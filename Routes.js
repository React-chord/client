import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';
import Tuning from './src/components/Tuning';
import Scale from './src/components/Scale';
import Tabs from './src/components/Tabs';
import Profile from './src/components/Profile';
import ChordPractice from './src/components/ChordPractice';
import Comingsoon from './src/components/Comingsoon';

const userStackNavigation = createStackNavigator(
  {
    Profile: { screen: Profile },
    Login: { screen: Login },
  },
  {
    initialRouteName: 'Profile',
  },
);

const homeStackNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Quiz: { screen: Comingsoon },
    Scale: { screen: Scale },
    ChordPractice: { screen: ChordPractice },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
        height: 70,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

homeStackNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: homeStackNavigation },
    Profile: userStackNavigation,
    Tuning: { screen: Tuning },
  },
  {
    initialRouteName: 'Home',
  },
);

export default bottomNavigation;
