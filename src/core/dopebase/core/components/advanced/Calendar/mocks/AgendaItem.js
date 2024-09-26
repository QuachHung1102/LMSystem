import isEmpty from 'lodash/isEmpty';
import React, {useCallback, memo, useRef} from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {View, Text, Switch, Dialog} from '../../../../../../dopebase';
import {useTheme} from '../../../../theming';
import {useOnboardingConfig} from '../../../../../../onboarding/hooks/useOnboardingConfig';

const AgendaItem = ({item}) => {
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(colorSet);
  const {showDialog} = useOnboardingConfig();

  const itemPressed = useCallback(() => {
    Alert.alert(item.title, item.class, [{}]);
  }, [item.title]);

  const handleShowDialog = () => {
    showDialog({
      title: item.title,
      message: `${item.class} - ${item.duration}`,
    });
  };

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={handleShowDialog} style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <View ml3 style={styles.itemTitle}>
        <Text h4 bold style={styles.itemTitleText} numberOfLines={1}>
          {item.title}
        </Text>
        <Text>{item.class}</Text>
      </View>
      <View style={styles.itemButtonContainer}>
        {item.switchActive ? (
          <Switch />
        ) : (
          <View>
            <Button color={'grey'} title={'Info'} onPress={itemPressed} />
          </View>
        )}
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
      flexDirection: 'row',
      position: 'relative',
    },
    itemHourText: {
      color: colorSet.primaryText,
    },
    itemDurationText: {
      color: colorSet.secondaryText,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    itemTitle: {
      maxWidth: '70%',
    },
    itemTitleText: {
      color: colorSet.primaryText,
    },
    itemButtonContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colorSet.grey9,
    },
    emptyItemText: {
      color: colorSet.disabledText,
      fontSize: 14,
    },
  });
};
