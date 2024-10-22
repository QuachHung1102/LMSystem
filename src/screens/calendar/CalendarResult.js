import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useOnboardingConfig } from '../../core/onboarding/hooks/useOnboardingConfig';
import {
  useTheme,
  useTranslations,
  View,
  ActivityIndicator,
  TouchableIcon,
  CalendarCustom,
  Dialog,
  Text,
} from '../../core/dopebase';
import dynamicStyles from './styles';

import menuIcon from '../../assets/icons/menu1x.png';

export const CalendarResult = memo(props => {
  const { navigation } = props;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const { hideDialog, dialogData, dialogRef } = useOnboardingConfig();

  const [isLoading, setIsLoading] = useState(true);

  const _renderHeaderLeft = useCallback(() => (
    <View>
      <TouchableIcon
        imageStyle={{ tintColor: colorSet.secondaryText }}
        iconSource={theme.icons.backArrow}
        onPress={() => navigation.goBack()}
      />
    </View>
  ), []);

  const _renderHeaderRight = useCallback(() => (
    <View>
      <TouchableIcon
        imageStyle={{ tintColor: colorSet.thirBackground }}
        iconSource={menuIcon}
        onPress={() => navigation.openDrawer()}
      />
    </View>
  ), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: localized('Calendar'),
      headerTitleAlign: 'center',
      headerLeft: _renderHeaderLeft,
      headerRight: _renderHeaderRight,
      headerStyle: styles.headerStyle,
      headerTintColor: colorSet.secondaryText,
    });
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View>
        <Text>CalendarResult</Text>
      </View>
    );
  }
});