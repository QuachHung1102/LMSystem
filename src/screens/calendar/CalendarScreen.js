import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import {Dimensions} from 'react-native';
import {useOnboardingConfig} from '../../core/onboarding/hooks/useOnboardingConfig';
import {
  useTheme,
  useTranslations,
  View,
  ActivityIndicator,
  TouchableIcon,
  CalendarCustom,
  Dialog,
} from '../../core/dopebase';
import dynamicStyles from './styles';
import {useCurrentUser} from '../../core/onboarding';
import {useAuth} from '../../core/onboarding/hooks/useAuth';
import HeadingBlock from '../../components/HeadingBlock';
import ItemList from '../../components/ItemList';
import updateDeviceStorage from '../../core/helpers/updateDeviceStorage';

import menuIcon from '../../assets/icons/menu1x.png';
import NotiBlock from '../../components/NotiBlock/NotiBlock';

export const CalendarScreen = memo(props => {
  const {navigation} = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const {hideDialog, dialogData, dialogRef} = useOnboardingConfig();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Giả lập độ trễ tải dữ liệu
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
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

  // useEffect(() => {
  //   if (!currentUser?.id) {
  //     return;
  //   }
  // }, [currentUser?.id]);

  // const onLogout = useCallback(() => {
  //   authManager?.logout(currentUser);
  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: 'LoadScreen'}],
  //   });
  // }, [authManager, currentUser]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <NotiBlock colorSet={colorSet} />
        {/* <CalendarComponent /> */}
        <CalendarCustom />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}>
        </ScrollView> */}
        <Dialog
          ref={dialogRef}
          title={dialogData?.title || 'Dialog Title'}
          message={dialogData?.message || 'This is a message in the dialog.'}
          actions={[
            {
              title: 'Cancel',
              onPress: hideDialog,
              secondary: true,
            },
            {
              title: 'OK',
              onPress: hideDialog,
            },
          ]}
          titleStyle={{
            fontSize: width * 0.05,
          }}
          messageStyle={{
            // alignSelf: 'flex-start',
          }}
        />
      </View>
    );
  }
});

const {width, height} = Dimensions.get('window');
