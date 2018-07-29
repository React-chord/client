import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';
<<<<<<< HEAD
import Tuning from './src/components/Tuning';
import Scale from './src/components/Scale';
import Tabs from './src/components/Tabs';
import Profile from './src/components/Profile';
=======
import ChordPractice from './src/components/ChordPractice'
>>>>>>> chord practice feature

const userStackNavigation = createStackNavigator(
  {
    Profile: { screen: Profile },
    Login: { screen: Login },
<<<<<<< HEAD
    Tuning: { screen: Tuning },
    Scale: { screen: Scale }
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);

const homeStackNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Quiz: { screen: Tabs },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: homeStackNavigation },
    Profile: userStackNavigation,
    Tuning: { screen: Tuning },
    Tabs: { screen: Tabs },
=======
    ChordPractice: { screen: ChordPractice } 
>>>>>>> chord practice feature
  },
  {
    initialRouteName: 'Home',
  },
);

export default bottomNavigation;
