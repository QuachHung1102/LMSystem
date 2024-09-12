// CustomDrawer.js
import React, { memo, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Text, useTheme, TouchableIcon } from '../core/dopebase';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from '../core/dopebase';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { StatusDotSvg } from '../assets/images/svg';
import { useOnboardingConfig } from '../core/onboarding/hooks/useOnboardingConfig';

const CustomDrawerContent = (props) => {
  const { config } = useOnboardingConfig()
  const slides = config.onboardingConfig.menuData;
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const avatarSize = useMemo(() => width * 0.15, []);
  const statusDotSize = useMemo(() => width * 0.07, []);
  const iconSize = useMemo(() => width * 0.04, []);

  const renderItem = ({ item }) => {
    return (
      <DrawerItem
        label={() => (
          <View style={styles.customItem}>
            <View style={styles.flexRow}>
              <IconButton
                tintColor={colorSet.primaryText}
                source={item.icon}
                width={iconSize}
                height={iconSize}
              />
              <Text pl2 h3 style={styles.customItemText}>{item.title}</Text>
            </View>
            {
              item.collapse
              && (
                <IconButton
                  tintColor={colorSet.primaryText}
                  source={require('../assets/icons/right-arrow.png')}
                  width={iconSize}
                  height={iconSize}
                />
              )
            }
          </View>
        )}
        onPress={() => props.navigation.navigate(item.navigateData.name, item.navigateData.params)}
        style={styles.drawerItem}
      />
    )
  }

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colorSet.thirBackground }}>
      <View style={styles.drawerContent}>
        <View style={{ backgroundColor: colorSet.sixthBackground }}>
          <View ph4 pv6 style={[styles.drawerContentHeader, { backgroundColor: colorSet.thirBackground }]}>
            <TouchableIcon
              imageStyle={{
                height: avatarSize,
                width: avatarSize,
                borderWidth: 2,
                borderRadius: 1000,
                borderColor: colorSet.secondaryBackground,
                margin: 0,
              }}
              containerStyle={{ padding: 0 }}
              iconSource={theme.icons.userDefault}
            />
            <View pl2 style={styles.userInfoSection}>
              <Text h3>User Name</Text>
              <Text h4>Xem và chỉnh sửa</Text>
            </View>
          </View>
          <View ph3 pv3 style={{ flex: 1 }}>
            <Pressable style={styles.drawerContentStatus}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StatusDotSvg width={statusDotSize} height={statusDotSize} color={"#B65A46"} />
                <Text ml1 style={{ width: "75%", fontWeight: "600" }} numberOfLines={3} h3>Bạn đang trong tiết dạy <Text bold>lớp 7A5</Text></Text>
              </View>
              <IconButton
                tintColor={colorSet.primaryText}
                source={require('../assets/icons/right-arrow.png')}
                width={statusDotSize}
                height={statusDotSize}
              />
            </Pressable>
          </View>
        </View>
        <FlatList
          data={slides}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          scrollEnabled={false}
        />
        {/* Thêm các mục khác ở đây */}
      </View>
    </DrawerContentScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  drawerContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomStartRadius: 20,
  },
  drawerContentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoSection: {
  },
  customItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '110%',
  },
  customItemText: {
    fontWeight: '600',
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderColor: '#939393',
    paddingLeft: width * 0.01,
  }
});

export default memo(CustomDrawerContent);