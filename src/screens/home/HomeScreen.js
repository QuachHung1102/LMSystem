import React, {memo, useEffect, useState, useMemo} from 'react';
import {Dimensions, ScrollView, Alert, Pressable} from 'react-native';
import {
  View,
  Text,
  useTheme,
  useTranslations,
  TouchableIcon,
  ProfilePictureUpdate,
  ActivityIndicator,
  IconButton,
  SearchBar,
  Button,
  Switch,
} from '../../core/dopebase';
import dynamicStyles from './styles';
import {useCurrentUser} from '../../core/onboarding';
import {useAuth} from '../../core/onboarding/hooks/useAuth';
import {
  timeFormat,
  getUnixTimeStamp,
  getCurrentDateFormatted,
} from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import {UmbrellaSvg, LapTopSvg, StatusDotSvg} from '../../assets/images/svg';

import menuIcon from '../../assets/icons/menu1x.png';
import QuanLy from './QuanLy';

const {width, height} = Dimensions.get('window');

export const HomeScreen = memo(props => {
  const {navigation} = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const iconsSize = Dimensions.get('screen').width * 0.07;
  const statusDotSize = useMemo(() => width * 0.07, []);

  const [isLoading, setIsLoading] = useState(true);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [text, setText] = useState('');
  const [truncateValue, setTruncateValue] = useState(7);

  const handlePress = () => {
    Alert.alert('Ố la la', 'This feature is not implemented yet');
  };

  useEffect(() => {
    const fetchCurrentDate = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      try {
        const tempdata = await getCurrentDateFormatted;
        setCurrentDate(tempdata);
      } catch (error) {
        console.error('Error fetching current date:', error);
      }
    };
    fetchCurrentDate();
    if (currentDate) {
      setIsLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }
  }, [currentUser?.id]);

  // const onLogout = useCallback(() => {
  //   authManager?.logout(currentUser);
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'LoadScreen' }],
  //   });
  // }, [authManager, currentUser, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: colorSet.primaryBackground}}>
        <View
          mt8
          ph5
          style={[
            styles.headerLeftContainer,
            {
              columnGap: 12,
            },
          ]}>
          <IconButton
            tintColor={'#E5F554'}
            source={menuIcon}
            marginRight={8}
            width={Dimensions.get('window').height * 0.04}
            height={Dimensions.get('window').height * 0.05}
            onPress={() => navigation.openDrawer()}
          />
          <SearchBar
            showsCancelButton={false}
            placeholder={localized('Find')}
            onChangeText={setText}
            containerStyle={{height: Dimensions.get('window').height * 0.06}}
          />
        </View>
        <View style={styles.headerLeftContainer}>
          <TouchableIcon
            imageStyle={{
              height: Dimensions.get('window').width * 0.15,
              width: Dimensions.get('window').width * 0.15,
              borderWidth: 2,
              borderRadius: 1000,
              borderColor: colorSet.secondaryBackground,
            }}
            iconSource={theme.icons.userDefault}
          />
          <View>
            <Text h4 style={styles.currentDate}>
              Tên giáo viên - CN: 11A2 (K39)
            </Text>
            <Text>2012 - nay | Phụ trách: môn văn</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadingBlock
            localized={localized}
            text={'Today'}
            text2={currentDate}
          />
          <View ph4 pv4 style={{backgroundColor: '#EBC5CC'}}>
            <View
              pb2
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <StatusDotSvg
                width={statusDotSize}
                height={statusDotSize}
                color={'#B65A46'}
              />
              <Text
                pl1
                h3
                style={{
                  fontWeight: '600',
                }}>
                {localized('Bạn đang trong tiết dạy lớp 11A2')}
              </Text>
            </View>
            <Button
              containerStyle={styles.EmotionStatusBtn}
              textStyle={{}}
              text={localized('Vào lớp')}
              onPress={() =>
                Alert.alert('Ố la la', 'This feature is not implemented yet')
              }
              styles
              secondary
              shadow
              loading={false}
            />
          </View>
          <View>
            <View mh5 mv5 style={styles.flexRow}>
              <Pressable>
                <Text h3>Lịch dạy</Text>
              </Pressable>
              <Pressable>
                <Text h3>Kiểm tra</Text>
              </Pressable>
              <Pressable>
                <Text h3>Đang làm</Text>
              </Pressable>
            </View>
            <View></View>
          </View>
          <HeadingBlock localized={localized} text={'Sắp tới'} />
          <View mh5 pl2 style={styles.notiContainer}>
            <View ph3 pv3 br4 style={styles.notiContent}>
              <View style={styles.notiContainerText}>
                <Text h3 style={[styles.consumWaterText, {fontWeight: '600'}]}>
                  {localized('Tiết 5: 10:50 - 11:30')}
                </Text>
                <Switch />
              </View>
              <View mv1>
                <Text h3 truncateTextNumber={truncateValue} bold style={{}}>
                  T13.B9: Đất nước buổi đầu độc lập (939- 967)
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text pr1 bold>
                  7A5
                </Text>
                <Text ph1>C1R103</Text>
              </View>
            </View>
          </View>
          <View ph5 mb6>
            <QuanLy localized={localized} />
          </View>
        </ScrollView>
      </View>
    );
  }
});
