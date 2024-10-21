import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Dimensions, FlatList, ScrollView} from 'react-native';
import {
  View,
  Text,
  useTranslations,
  useTheme,
  useActionSheet,
  ActivityIndicator,
  TouchableIcon,
  Button,
} from '../../core/dopebase';
import {useOnboardingConfig} from '../../core/onboarding/hooks/useOnboardingConfig';
import dynamicStyles from './styles';

import menuIcon from '../../assets/icons/menu1x.png';
import HeadingBlock from '../../components/HeadingBlock';
import Checkbox from 'expo-checkbox';
import {over} from 'lodash';
import {
  DateRangePicker,
  DropdownPicker,
} from '../../core/dopebase/forms/components';

export const CalendarFilters = memo(props => {
  const {navigation} = props;
  const {config} = useOnboardingConfig();
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];

  const styles = dynamicStyles(theme, appearance);

  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const [status, setStatus] = useState(null);
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState([]);

  // const [dateRange, setDateRange] = useState({startDay: null, endDay: null});

  const slideFilterBtn = config.onboardingConfig.CalendarFiltersBtn;
  const slideFiltersCheckboxStatus =
    config.onboardingConfig.CalendarFiltersCheckboxStatus;
  const slideFiltersCheckboxGrade =
    config.onboardingConfig.CalendarFiltersCheckboxGrade;
  const slideFiltersCheckboxSubject =
    config.onboardingConfig.CalendarFiltersCheckboxSubject;

  const handleSelectStartDate = item => {
    setSelectedStartDate(item);
  };

  const handleSelectEndDate = item => {
    setSelectedEndDate(item);
  };

  useEffect(() => {
    console.log(`filter is ${filter}`);
  }, [filter]);

  useEffect(() => {
    console.log(`selectedStartDate: ${selectedStartDate}`);
  }, [selectedStartDate]);

  useEffect(() => {
    console.log(`selectedEndDate: ${selectedEndDate}`);
  }, [selectedEndDate]);

  // const handleDone = range => {
  //   setDateRange(range);
  // };

  useEffect(() => {
    if (
      slideFilterBtn &&
      slideFiltersCheckboxStatus &&
      slideFiltersCheckboxGrade &&
      slideFiltersCheckboxSubject
    ) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: localized('Calendar'),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View>
          <TouchableIcon
            imageStyle={{tintColor: colorSet.secondaryText}}
            iconSource={theme.icons.backArrow}
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableIcon
            imageStyle={{tintColor: colorSet.thirBackground}}
            iconSource={menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
        height: height * 0.08,
      },
      headerTintColor: colorSet.secondaryText,
    });
  });

  const _renderItemBtn = useCallback(({item, index}) => {
    return (
      <Button
        key={(item + index).toString()}
        containerStyle={{
          paddingLeft: width * 0.03,
          paddingRight: width * 0.03,
          paddingTop: height * 0.015,
          paddingBottom: height * 0.015,
          backgroundColor: 'transparent',
          borderWidth: 1,
        }}
        textStyle={{color: colorSet.secondText}}
        text={localized(item.title)}
        radius={width * 0.1}
        onPress={() => {
          setFilter(item.title);
        }}
        styles={{}}
        loading={false}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _renderCheckbox1 = useCallback(({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '45%',
          height: height * 0.03,
          columnGap: '5%',
          alignItems: 'center',
        }}>
        <Checkbox
          value={item.isChecked}
          onValueChange={() => {
            console.log(`pressed ${item.title}`);
          }}
        />
        <Text numberOfLines={1} style={styles.checkboxParagraph}>
          {localized(item.title)}
        </Text>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _renderCheckbox2 = useCallback(({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '33%',
          height: height * 0.03,
          columnGap: '5%',
          alignItems: 'center',
        }}>
        <Checkbox
          value={item.isChecked}
          onValueChange={() => {
            console.log(`pressed ${item.title}`);
          }}
        />
        <Text numberOfLines={1} style={styles.checkboxParagraph2}>
          {localized(item.title)}
        </Text>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListFilterBtn = useCallback(() => {
    return (
      <View ph5>
        <View pt5 pb3>
          <Text h3 style={styles.headerText}>
            {localized('Calendar filters')}
          </Text>
        </View>
        <View style={styles.listButtonContainer}>
          {slideFilterBtn.map((item, index) => {
            return _renderItemBtn({item, index});
          })}
        </View>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideFilterBtn]);

  const ListFilterCheckbox1 = useCallback(({headerTitle, data}) => {
    return (
      <View ph5>
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderCheckbox1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          ItemSeparatorComponent={() => (
            <View style={{height: height * 0.025}}></View>
          )}
          ListHeaderComponent={({item}) => (
            <View pt5 pb3>
              <Text h3>{localized(headerTitle)}</Text>
            </View>
          )}
          ListHeaderComponentStyle={{width: width}}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListFilterCheckbox2 = useCallback(({headerTitle, data}) => {
    return (
      <View ph5>
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderCheckbox2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          ItemSeparatorComponent={() => (
            <View style={{height: height * 0.025}}></View>
          )}
          ListHeaderComponent={({item}) => (
            <View pt5 pb3>
              <Text h3>{localized(headerTitle)}</Text>
            </View>
          )}
          ListHeaderComponentStyle={{width: width}}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View
          pb5
          style={{
            flex: 1,
            backgroundColor: colorSet.primaryBackground,
          }}>
          <ListFilterBtn />
          <ListFilterCheckbox1
            headerTitle={'Status'}
            data={slideFiltersCheckboxStatus}
          />
          <ListFilterCheckbox1
            headerTitle={'Grade'}
            data={slideFiltersCheckboxGrade}
          />
          <ListFilterCheckbox2
            headerTitle={'Class'}
            data={slideFiltersCheckboxSubject}
          />
          <View pt8 style={{paddingBottom: height * 0.175}}>
            <View ph5>
              <Text h3>{localized('Time')}</Text>
            </View>
            <View ph5 style={[styles.flexRow, styles.dropdownPickerContainer]}>
              <DropdownPicker
                title="Từ"
                items={[
                  '07/2024',
                  '08/2024',
                  '09/2024',
                  '10/2024',
                  '11/2024',
                  '12/2024',
                ]}
                onSelectItem={handleSelectStartDate}
                allowMultipleSelection={false}
                selectedItemsList={selectedStartDate}
                containerStyle={{flexBasis: '45%'}}
              />
              <DropdownPicker
                title="Đến"
                items={[
                  '07/2024',
                  '08/2024',
                  '09/2024',
                  '10/2024',
                  '11/2024',
                  '12/2024',
                ]}
                onSelectItem={handleSelectEndDate}
                allowMultipleSelection={false}
                selectedItemsList={selectedEndDate}
                containerStyle={{flexBasis: '45%'}}
              />
            </View>
          </View>
          <View ph5 pv5>
            <Button text={localized('Apply filter')} />
          </View>
          {/* <View>
            <DateRangePicker
              title="Date Range"
              startDay={dateRange.startDay}
              endDay={dateRange.endDay}
              onDone={handleDone}
            />
            <Text style={{marginTop: 20}}>
              Selected Range: {dateRange.startDay} - {dateRange.endDay}
            </Text>
          </View> */}
        </View>
      </ScrollView>
    );
  }
});

const {width, height} = Dimensions.get('window');
