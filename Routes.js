import { createBottomTabNavigator } from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';
import Tuning from './src/components/Tuning';
import Scale from './src/components/Scale';

const bottomNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Tuning: { screen: Tuning },
    Scale: { screen: Scale }
  },
  {
    initialRouteName: 'Scale',
  },
);

export default bottomNavigation;
