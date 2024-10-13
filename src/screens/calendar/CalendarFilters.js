import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Dimensions, FlatList, ScrollView} from 'react-native';
import {
  View,
  Text,
  useTranslations,
  useTheme,
  useActionSheet,
  ActivityIndicator,
  TouchableIcon,
  Button,
} from '../../core/dopebase';
import {useOnboardingConfig} from '../../core/onboarding/hooks/useOnboardingConfig';
import dynamicStyles from './styles';

import menuIcon from '../../assets/icons/menu1x.png';
import HeadingBlock from '../../components/HeadingBlock';
import Checkbox from 'expo-checkbox';

export const CalendarFilters = memo(props => {
  const {navigation} = props;
  const {config} = useOnboardingConfig();
  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];

  const styles = dynamicStyles(theme, appearance);

  const [isLoading, setIsLoading] = useState(true);

  const slideFilterBtn = config.onboardingConfig.CalendarFiltersBtn;
  const slideFiltersCheckboxStatus =
    config.onboardingConfig.CalendarFiltersCheckboxStatus;

  useEffect(() => {
    if (slideFilterBtn) {
      setIsLoading(false);
    }
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
  });

  const _renderItemBtn = useCallback(({item}) => {
    return (
      <Button
        containerStyle={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        textStyle={{}}
        text={item.title}
        radius={width * 0.1}
        onPress={() => {
          console.log(`pressed ${item.title}`);
        }}
        styles={{}}
        loading={false}
      />
    );
  }, []);

  const _renderCheckboxStatus = useCallback(({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Checkbox
          value={item.isChecked}
          onValueChange={() => {
            console.log(`pressed ${item.title}`);
          }}
        />
        <Text style={styles.paragraph}>Normal checkbox</Text>
      </View>
    );
  }, []);

  const ListFilterBtn = useCallback(() => {
    return (
      <View ph4>
        <FlatList
          scrollEnabled={false}
          data={slideFilterBtn}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <View>{_renderItemBtn({item})}</View>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            columnGap: width * 0.01,
          }}
          ItemSeparatorComponent={() => (
            <View style={{height: height * 0.0125}}></View>
          )}
          ListHeaderComponent={({item}) => (
            <View pt5 pb3>
              <Text h3>{localized('Calendar filters')}</Text>
            </View>
          )}
          ListHeaderComponentStyle={{width: width}}
        />
      </View>
    );
  }, [slideFilterBtn]);

  const ListFilterCheckboxStatus = useCallback(() => {
    return (
      <View ph4>
        <FlatList
          scrollEnabled={false}
          data={slideFiltersCheckboxStatus}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <View>{_renderCheckboxStatus({item})}</View>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: colorSet.red,
          }}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{height: height * 0.0125}}></View>
          )}
          ListHeaderComponent={({item}) => (
            <View pt5 pb3>
              <Text h3>{localized('Status')}</Text>
            </View>
          )}
          ListHeaderComponentStyle={{width: width}}
        />
      </View>
    );
  }, [slideFiltersCheckboxStatus]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: colorSet.primaryBackground}}>
        <View>
          <ListFilterBtn />
        </View>
        <View>
          <ListFilterCheckboxStatus />
        </View>
      </View>
    );
  }
});

const {width, height} = Dimensions.get('window');
