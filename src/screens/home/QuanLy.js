import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useOnboardingConfig } from '../../core/onboarding/hooks/useOnboardingConfig';

const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={item.icon} style={styles.icon} />
    <Text truncateTextNumber={2} style={styles.text}>{item.text}</Text>
  </View>
);

const QuanLy = () => {
  const { config } = useOnboardingConfig();
  const quanLyData = config.onboardingConfig.quanLyData;

  return (
    <FlatList
      data={quanLyData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
  },
});

export default QuanLy;