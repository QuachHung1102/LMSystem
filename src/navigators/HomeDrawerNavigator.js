import React from 'react';
import { Button } from 'react-native';
import { View } from '../core/dopebase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/home/HomeScreen';
import CustomDrawerContent from '../components/CustomDrawer';

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
      <Drawer.Screen name="LichLamViec" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}