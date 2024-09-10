// CustomDrawer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from '../core/dopebase'; // Đảm bảo đường dẫn đúng

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Text style={styles.title}>User Name</Text>
          <Text style={styles.caption}>user@example.com</Text>
        </View>
        <DrawerItem
          label={() => (
            <View style={styles.customItem}>
              <IconButton
                tintColor={'#E5F554'}
                source={require('../assets/icons/thumbsup-unfilled.png')} // Đảm bảo đường dẫn đúng
                width={24}
                height={24}
              />
              <Text style={styles.customItemText}>Home</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label={() => (
            <View style={styles.customItem}>
              <IconButton
                tintColor={'#E5F554'}
                source={require('../assets/icons/thumbsup-unfilled.png')} // Đảm bảo đường dẫn đúng
                width={24}
                height={24}
              />
              <Text style={styles.customItemText}>Lịch làm việc</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate('LichLamViec')}
        />
        <DrawerItem
          label={() => (
            <View style={styles.customItem}>
              <IconButton
                tintColor={'#E5F554'}
                source={require('../assets/icons/thumbsup-unfilled.png')} // Đảm bảo đường dẫn đúng
                width={24}
                height={24}
              />
              <Text style={styles.customItemText}>Notifications</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate('Notifications')}
        />
        {/* Thêm các mục khác ở đây */}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  customItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomDrawerContent;