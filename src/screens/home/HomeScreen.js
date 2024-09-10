import React, { memo, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Dimensions, ScrollView, Alert } from 'react-native';
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
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import { timeFormat, getUnixTimeStamp, getCurrentDateFormatted } from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import { WorkoutSvg, MealSvg } from '../../assets/images/svg';
import ConsumWater from './ConsumWater';

import menuIcon from '../../assets/icons/menu1x.png';
import QuanLy from './QuanLy';

export const HomeScreen = memo(props => {
  const { navigation } = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  let iconsSize = Dimensions.get('screen').width * 0.07;

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
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
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

  const onLogout = useCallback(() => {
    authManager?.logout(currentUser);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoadScreen' }],
    });
  }, [authManager, currentUser, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: colorSet.primaryBackground }}>
        <View mt8 ph5 style={[styles.headerLeftContainer, {
          columnGap: 12,
        }]}>
          <IconButton
            tintColor={'#E5F554'}
            source={menuIcon}
            marginRight={8}
            width={Dimensions.get('window').height * 0.04}
            height={Dimensions.get('window').height * 0.05}
          />
          <SearchBar
            showsCancelButton={false}
            placeholder={localized('Find')}
            onChangeText={setText}
            containerStyle={{ height: Dimensions.get('window').height * 0.06 }}
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
            {/* <Text style={styles.currentDate}>{currentDate}</Text> */}
            <Text h4 style={styles.currentDate}>Tên giáo viên - CN: 11A2 (K39)</Text>
            <Text>2012 - nay | Phụ trách: môn văn</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <HeadingBlock localized={localized} text={"Today"} text2={currentDate} />
          <View ph4 pv3 style={{ backgroundColor: '#EBC5CC' }}>
            <View ph5 pb2>
              <Text h3 style={{
                fontWeight: '600',
              }}>{localized('Bạn đang trong tiết dạy lớp 11A2')}</Text>
            </View>
            <Button
              containerStyle={styles.EmotionStatusBtn}
              textStyle={{}}
              text={localized('Vào lớp')}
              onPress={() => Alert.alert('Ố la la', 'This feature is not implemented yet')}
              styles
              secondary
              shadow
              loading={false}
            />
          </View>
          <View mh5 mv5 style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ flexDirection: 'column', gap: 16 }}>
              <View br4 ph3 pv3 style={styles.box1}>
                <View mb3 style={[styles.iconCover, {
                  backgroundColor: colorSet.secondaryBackground,
                  width: iconsSize * 1.6,
                  height: iconsSize * 1.6,
                }]}>
                  <WorkoutSvg color={colorSet.svgColor} width={iconsSize} height={iconsSize} />
                </View>
                <Text h3>{localized("Calories Burned1")}</Text>
                <Text>320 Kcal</Text>
              </View>
              <View br4 ph3 pv3 style={styles.box2}>
                <View mb2 style={[styles.iconCover, {
                  backgroundColor: colorSet.secondaryBackground,
                  width: iconsSize * 1.2,
                  height: iconsSize * 1.2,
                }]}>
                  <WorkoutSvg color={colorSet.svgColor} width={iconsSize} height={iconsSize} />
                </View>
                <Text h3>{localized("Chưa giải quyết")}</Text>
                <Text>06 việc</Text>
              </View>
              <View br4 ph3 pv3 style={styles.box3}>
                <Text h3>{localized("Đã hủy")}</Text>
                <Text>30 việc</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', gap: 16 }}>
              <View br4 ph3 pv3 style={styles.box4}>
                <View mb3 style={[styles.iconCover, {
                  backgroundColor: colorSet.thirBackground,
                  width: iconsSize * 1.6,
                  height: iconsSize * 1.6,
                }]}>
                  <MealSvg color={colorSet.svgColor} width={iconsSize} height={iconsSize} />
                </View>
                <View>
                  <Text h3>{localized("Đang làm")}</Text>
                  <Text>10 việc</Text>
                </View>
              </View>
              <View br4 ph3 pv3 style={styles.box5}>
                <Text h3>{localized("Đã xong")}</Text>
                <Text>12 việc</Text>
              </View>
            </View>
          </View>
          <HeadingBlock localized={localized} text={"Sắp tới"} />
          <View mh5 ph3 pv3 br4 style={styles.notiContainer}>
            <View style={styles.notiContainerText}>
              <Text h3 style={[styles.consumWaterText, { fontWeight: '600' }]}>{localized("Tiết 5: 10:50 - 11:30")}</Text>
              <Switch />
            </View>
            <View mv1>
              <Text h3 truncateTextNumber={truncateValue} bold style={{}}>T13.B9:  Đất nước buổi đầu độc lập (939- 967)</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text ph1 bold>7A5</Text>
              <Text ph1>C1R103</Text>
            </View>
          </View>
          <HeadingBlock localized={localized} text={"Quản lý"} />
          <View>
            <QuanLy />
          </View>
          




          {/* <View mt5 mb4>
            <View mh5 br4 pv5 style={styles.updateAppearanceContainer}>
              <View>
                <ProfilePictureUpdate setProfilePictureFile={setProfilePictureFile} />
              </View>
              <Text h2>{localized("Update Appearance")}</Text>
            </View>
          </View>
          <HeadingBlock localized={localized} text={"Today's Nutrition"} />
          <View>
            <TouchableIcon
              onPress={handlePress}
              iconSource={plusIcon}
              title={localized('Enter Ingredients')}
              containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
              imageStyle={{ width: 30, height: 30 }}
              titleStyle={{ fontSize: Dimensions.get('window').width * 0.045, fontWeight: '700' }}
              renderTitle={true}
              tintColor={colorSet.primaryText}
            />
          </View>
          <PlanView text={"Nutrition Plan"} onPress={handlePress} />
          <HeadingBlock localized={localized} text={"Workout Plan"} text2={"25/02"} />
          <View ph5 mb3>
            <CrouselStep />
          </View>
          <PlanView text={"Workout Plan"} onPress={handlePress} />
          <HeadingBlock localized={localized} text={"Workout Plan"} text2={"View More"} onPress={handlePress} />
          <MusicList playBtn={true} /> */}
        </ScrollView>
      </View>

    );
  }


});