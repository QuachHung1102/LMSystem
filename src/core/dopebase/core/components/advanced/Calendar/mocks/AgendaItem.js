import isEmpty from 'lodash/isEmpty';
import React, { useCallback, memo } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Button } from 'react-native';
import { useTheme } from '../../../../theming';

const AgendaItem = ({ item }) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(colorSet);

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, [item.title]);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID={'item'}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(AgendaItem);

const dynamicStyles = function (colorSet) {
  return StyleSheet.create({
    item: {
      padding: 20,
      backgroundColor: colorSet.primaryBackground,
      borderBottomWidth: 1,
      borderBottomColor: colorSet.grey9,
      flexDirection: 'row'
    },
    itemHourText: {
      color: colorSet.primaryText,
    },
    itemDurationText: {
      color: colorSet.secondaryText,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4
    },
    itemTitleText: {
      color: colorSet.primaryText,
      marginLeft: 16,
      fontWeight: 'bold',
      fontSize: 16
    },
    itemButtonContainer: {
      flex: 1,
      alignItems: 'flex-end'
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colorSet.grey9
    },
    emptyItemText: {
      color: colorSet.disabledText,
      fontSize: 14
    }
  })
};