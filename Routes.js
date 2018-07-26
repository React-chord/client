import { createBottomTabNavigator } from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
  },
  {
    initialRouteName: 'Home',
  },
);

export default bottomNavigation;
