import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './HomeStackNavigator';
import CustomDrawerContent from '../components/Drawer/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainStack" component={MainStackNavigator} options={{ headerShown: false, }} />
    </Drawer.Navigator>
  );
}