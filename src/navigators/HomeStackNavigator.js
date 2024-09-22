import React from 'react';
import { Platform, Image, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslations, View } from '../core/dopebase';
import { HomeScreen, CalendarScreen } from '../screens';
import WorkoutStackNavigator from './WorkoutStackNavigator';
import MentalStackNavigator from './MentalStackNavigator';
import { useOnboardingConfig } from '../core/onboarding/hooks/useOnboardingConfig';
import { useTheme } from '../core/dopebase';

const MainStack = createBottomTabNavigator();
const MainStackNavigator = () => {
  const { config } = useOnboardingConfig();
  const tabIcons = config.onboardingConfig.tabIcons;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  return (
    <View style={{flex: 1, backgroundColor: colorSet.primaryBackground}}>
      <MainStack.Navigator
        screenOptions={({ route }) => ({
          headerBackTitleVisible: false,
          headerBackTitle: localized('Back'),
          tabBarActiveTintColor: "#5244F3",
          tabBarInactiveTintColor: colorSet.primaryButtonTextNonActive,
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            if (route.name === 'Home') {
              icon = focused
                ? <View ph2 pv2 style={style.itemActiveStyle}>{tabIcons.Home.focus}</View>
                : tabIcons.Home.unFocus;
            }
            else if (route.name === 'Lich') {
              icon = focused
                ? <View ph2 pv2 style={style.itemActiveStyle}>{tabIcons['Lich'].focus}</View>
                : tabIcons['Lich'].unFocus;
            } else if (route.name === 'QuanLy') {
              icon = focused
                ? <View ph2 pv2 style={style.itemActiveStyle}>{tabIcons['QuanLy'].focus}</View>
                : tabIcons['QuanLy'].unFocus;
            } else if (route.name === 'Send') {
              icon = focused
                ? <View ph2 pv2 style={style.itemActiveStyle}>{tabIcons['Send'].focus}</View>
                : tabIcons['Send'].unFocus;
            } else if (route.name === 'CaNhan') {
              icon = focused
                ? <View ph2 pv2 style={style.itemActiveStyle}>{tabIcons['CaNhan'].focus}</View>
                : tabIcons['CaNhan'].unFocus;
            }
            return icon;
          },
          tabBarStyle: {
            backgroundColor: colorSet.secondaryBackground,
            height: Dimensions.get('window').height * 0.075,
            paddingHorizontal: Dimensions.get('window').height * 0.01,
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
            borderColor: colorSet.secondaryBackground,
            shadowColor: '#000',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.25,
          },
          tabBarLabel: () => null
        })
        }
        initialRouteName="Lich"
      >
        <MainStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
        <MainStack.Screen name="Lich" component={CalendarScreen} options={{ headerShown: true }} />
        <MainStack.Screen name="QuanLy" component={WorkoutStackNavigator} options={{ headerShown: false }} />
        <MainStack.Screen name="Send" component={MentalStackNavigator} options={{ headerShown: false }} />
        <MainStack.Screen name="CaNhan" component={MentalStackNavigator} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </View>
  )
};

export default MainStackNavigator;

const style = StyleSheet.create({
  itemActiveStyle: {
    backgroundColor: '#CCE048',
    borderRadius: 1000,
    borderWidth: 5,
    borderColor: '#F0FE73',
    position: 'absolute',
    top: - Dimensions.get('window').height * 0.03,
  },
});