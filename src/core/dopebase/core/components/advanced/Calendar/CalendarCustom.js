import React, { useRef, useCallback, memo, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { agendaItems, getMarkedDates } from './mocks/agendaItems';
import AgendaItem from './mocks/AgendaItem';
import { getTheme } from './mocks/theme';
import { useTheme } from '../../../theming';
import dynamicStyles from './styles';

const ITEMS = agendaItems;
const icon = require('../../../../../../assets/icons/calendarSm.png');

export const CalendarCustom = memo(({ weekView }) => {
  const marked = useRef(getMarkedDates());
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);
  const colorSet = theme.colors[appearance];
  const calendarTheme = useRef(getTheme(colorSet));

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <CalendarProvider
      date={ITEMS[0]?.title}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: colorSet.red,
      }}
    // todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar firstDay={1} markedDates={marked.current} />
      ) : (
        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={calendarTheme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          renderArrow={direction => {
            if (direction === 'right') {
              return <Image source={icon} tintColor={colorSet.red} style={styles.arrow} />;
            } else {
              return <View style={styles.arrow}></View>;
            }
          }}
          leftArrowImageSource={icon}
          rightArrowImageSource={icon}
          disableArrowLeft={true}
          onPressArrowRight={() => { console.log(`move to ...`); }}
        // animateScroll
        // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
      // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
});