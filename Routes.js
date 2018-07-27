import { createBottomTabNavigator } from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';
import Tuning from './src/components/Tuning';

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Tuning: { screen: Tuning }
  },
  {
    initialRouteName: 'Tuning',
  },
);

export default bottomNavigation;
