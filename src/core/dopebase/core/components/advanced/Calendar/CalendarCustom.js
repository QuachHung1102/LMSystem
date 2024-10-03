import React, {useRef, useCallback, memo, useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import {getMarkedDates} from './mocks/agendaItems';
import AgendaItem from './mocks/AgendaItem';
import {getTheme} from './mocks/theme';
import {useTheme} from '../../../theming';
import dynamicStyles from './styles';
import {View} from '../../base/View';
import {Text} from '../../base/Text';
import {TouchableIcon} from '../TouchableIcon/TouchableIcon';
import updateDeviceStorage from '../../../../../helpers/updateDeviceStorage';

const calendarSmIcon = require('../../../../../../assets/icons/calendarSm.png');
const calendarplusIcon = require('../../../../../../assets/images/menu/calendar-plus.png');

export const CalendarCustom = memo(({weekView}) => {
  const [items, setItems] = useState([]);
  const marked = useRef(getMarkedDates(items));
  const {theme, appearance} = useTheme();
  const styles = dynamicStyles(theme, appearance);
  const colorSet = theme.colors[appearance];
  const calendarTheme = useRef(getTheme(colorSet));
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await updateDeviceStorage.getStoreData('agendaItems');
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching agenda items:', error);
        setItems([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    marked.current = getMarkedDates(items);
    updateDeviceStorage.setStoreData('agendaItems', items);
  }, [items]);

  const renderItem = useCallback(({item, section}) => {
    return (
      <AgendaItem
        item={item}
        date={section.title}
        switchActive={true}
        updateNotiState={updateNotiState}
      />
    );
  }, []);

  const renderSectionHeader = useCallback(item => {
    const isToday = item === today;

    return (
      <View
        style={[
          styles.sectionHeaderContainer,
          isToday && styles.todayHeaderText,
        ]}>
        <Text style={styles.sectionHeaderText}>{item}</Text>
      </View>
    );
  }, []);

  const renderListHeader = useCallback(() => {
    return (
      <TouchableIcon
        iconSource={calendarplusIcon}
        containerStyle={styles.btnAddTaskContainer}
        imageStyle
        renderTitle={true}
        title={`Thêm kế hoạch`}
        titleStyle={styles.btnAddTaskText}
        tintColor={colorSet.secondaryText}
      />
    );
  }, []);

  const updateNotiState = useCallback((date, hour, newState) => {
    const updateItemState = item =>
      item.hour === hour ? {...item, notiState: newState} : item;
    const disableNotiState = item => ({...item, notiState: false});

    const updateSectionState = section => {
      if (section.title === date) {
        return {
          ...section,
          data: section.data.map(updateItemState),
        };
      } else if (section.title < date) {
        return {
          ...section,
          data: section.data.map(disableNotiState),
        };
      }
      return section;
    };

    setItems(prevItems => prevItems.map(updateSectionState));
  }, []);

  return (
    <CalendarProvider
      date={today} // date is string
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: colorSet.red,
      }}
      // todayBottomMargin={16}
      alowShadow={true}>
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
          leftArrowImageSource={calendarSmIcon}
          rightArrowImageSource={calendarSmIcon}
          renderArrow={direction => {
            if (direction === 'right') {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log('Move to...');
                  }}>
                  <Image
                    source={calendarSmIcon}
                    tintColor={colorSet.red}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              );
            } else {
              return <View style={styles.arrow}></View>;
            }
          }}
          disableArrowLeft={true}
          disableArrowRight={true}
          disableMonthChange={false}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}
      <View style={{flex: 1}}>
        <AgendaList
          sections={items}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          // scrollToNextEvent
          sectionStyle={styles.section}
          // dayFormat={'yyyy-MM-d'}
          scrollEnabled={true}
          ListHeaderComponent={renderListHeader}
        />
      </View>
    </CalendarProvider>
  );
});
