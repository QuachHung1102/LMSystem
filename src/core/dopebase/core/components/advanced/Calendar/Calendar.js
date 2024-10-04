import React, {useState, useEffect, memo} from 'react';
import {View} from 'react-native';
import {useTheme} from '../../../theming';
import dynamicStyles from './styles';
import {CalendarList} from 'react-native-calendars';
import calendarIcon from '../../../../../../assets/icons/calendarSm.png';
import {Image} from 'react-native-animatable';

export const CalendarComponent = memo(props => {
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
  }, []);

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CalendarList
        horizontal
        pagingEnabled
        pastScrollRange={1}
        futureScrollRange={1}
        showScrollIndicator={false}
        onDayPress={onDayPress}
        initialDate={selectedDate}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: colorSet.primary},
        }}
        hideExtraDays={false}
        hideArrows={false}
        renderArrow={direction => {
          if (direction === 'right') {
            return (
              <Image
                source={calendarIcon}
                tintColor={colorSet.red}
                style={styles.arrow}
              />
            );
          } else {
            return <View style={styles.arrow}></View>;
          }
        }}
        disableArrowLeft={true}
        disableMonthChange={true}
        onPressArrowRight={() => {
          console.log(`move to ...`);
        }}
        theme={{
          calendarBackground: colorSet.primaryBackground,
          dayTextColor: colorSet.primaryText,
          monthTextColor: colorSet.primaryText,
          todayTextColor: colorSet.red,
          textDisabledColor: colorSet.disabledText,
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: 'red',
            },
            dayTextAtIndex6: {
              color: 'blue',
            },
          },
        }}
      />
    </View>
  );
});
