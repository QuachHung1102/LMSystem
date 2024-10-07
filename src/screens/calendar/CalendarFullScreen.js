import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  TouchableIcon,
  View,
  useTranslations,
  useTheme,
  ActivityIndicator,
  Text,
  CalendarComponent,
} from '../../core/dopebase';
import * as Animatable from 'react-native-animatable';
import dynamicStyles from './styles';
import {Dimensions, FlatList, Pressable} from 'react-native';

import menuIcon from '../../assets/icons/menu1x.png';

export const CalendarFullScreen = memo(props => {
  const [isLoading, setIsLoading] = useState(true);
  const {navigation} = props;
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const boLoc = useMemo(() => [
    'Lên\nlớp',
    'Kiểm\ntra',
    'Dự\nán',
    'BTVN',
    'Họp',
    'Khác',
    'Sự\nkiện',
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
  }, []);

  const _renderItem = ({item}) => {
    let viewRef = null;
    return (
      <Pressable
        onPress={() => {
          if (viewRef) {
            viewRef.bounce(1600);
          }
        }}
        style={{borderRadius: 16}}>
        <Animatable.View
          key={item}
          ref={ref => {
            viewRef = ref;
          }}>
          <View ph3 pv3 br5 ref style={styles.calendarBtn}>
            <Text h4 bold style={styles.calendarText}>
              {item}
            </Text>
          </View>
        </Animatable.View>
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: colorSet.primaryBackground}} animation={'fadeInDown'}>
        <View ph4>
          <FlatList
            data={boLoc}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={_renderItem}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={{width: width * 0.035}} />
            )}
            style={styles.listButton}
          />
        </View>
        <CalendarComponent />
      </View>
    );
  }
});

const {width, height} = Dimensions.get('window');
