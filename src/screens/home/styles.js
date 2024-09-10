import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../core/dopebase';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colorSet.primaryText,
      marginTop: 16,
      fontSize: 18,
    },
    image: {
      height: 128,
      width: 128,
      borderRadius: 64,
      marginTop: -320,
    },
    // Phần này không thuộc template
    headerLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    currentDate: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 21,
    },
    box1: {
      backgroundColor: colorSet.primaryForeground,
      width: Dimensions.get('window').width * 0.55,
      height: Dimensions.get('window').width * 0.31,
    },
    box2: {
      backgroundColor: colorSet.primaryForeground,
      width: Dimensions.get('window').width * 0.55,
      height: Dimensions.get('window').width * 0.27,
    },
    box3: {
      justifyContent: 'space-around',
      backgroundColor: colorSet.primaryForeground,
      width: Dimensions.get('window').width * 0.55,
      height: Dimensions.get('window').width * 0.2,
    },
    box4: {
      backgroundColor: colorSet.primaryBackground,
      width: Dimensions.get('window').width * 0.31,
      height: Dimensions.get('window').width * 0.51,
      borderWidth: 2,
      borderColor: colorSet.primaryBorder,
      justifyContent: 'space-between'
    },
    box5: {
      backgroundColor: colorSet.primaryBackground,
      width: Dimensions.get('window').width * 0.31,
      height: Dimensions.get('window').width * 0.31,
      borderWidth: 2,
      borderColor: colorSet.primaryBorder,
      justifyContent: 'center'
    },
    iconCover : {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    notiContainer: {
      backgroundColor: "#2F6DF6",
    },
    notiContainerText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    consumWaterText: {
      color: colorSet.primaryText,
    },
    updateAppearanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryForeground,
      gap: Dimensions.get('window').width * 0.07,
    },
  })
}

export default dynamicStyles
