import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';
import Tuning from './src/components/Tuning';
import Scale from './src/components/Scale';
import Tabs from './src/components/Tabs';
import Profile from './src/components/Profile';
import ChordPractice from './src/components/ChordPractice'

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
    Quiz: { screen: Tabs },
    Scale: { screen: Scale },
  },
  {
    initialRouteName: 'Home',
  },
);

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: homeStackNavigation },
    Profile: userStackNavigation,
    Tuning: { screen: Tuning },
    ChordPractice: { screen: ChordPractice },
  },
  {
    initialRouteName: 'Home',
  },
);

export default bottomNavigation;
