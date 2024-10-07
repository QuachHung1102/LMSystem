import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CalendarScreen, CalendarFullScreen} from '../screens';

const CalendarStack = createStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <CalendarStack.Navigator initialRouteName="CalendarFullScreen">
      <CalendarStack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <CalendarStack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
        />
        <CalendarStack.Screen
          name="CalendarFullScreen"
          component={CalendarFullScreen}
        />
      </CalendarStack.Group>
    </CalendarStack.Navigator>
  );
};

export default CalendarStackNavigator;