import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LoadScreen, WalkthroughScreen, DelayedLoginScreen } from '../core/onboarding';
import HomeStackNavigator from './HomeStackNavigator';  // Thằng này là MainStackNavigator
import LoginStack from './AuthStackNavigator';
import WalkthroughStackNavigator from './WalkthroughStackNavigator';
import HomeDrawer from './HomeDrawerNavigator';

const Root = createStackNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="HomeDrawer">
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      <Root.Screen name="WalkthroughStack" component={WalkthroughStackNavigator} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="HomeDrawer" component={HomeDrawer} />
    </Root.Navigator>
  );
};

export default RootNavigator;
