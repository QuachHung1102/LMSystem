import {Dimensions, StyleSheet} from 'react-native';
import {useTheme} from '../../core/dopebase';

const {width, height} = Dimensions.get('window');
const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    text: {
      color: colorSet.primaryText,
      marginTop: 16,
      fontSize: 18,
    },
    // Phần này không thuộc template
    listButtonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      rowGap: height * 0.0125,
      columnGap: width * 0.025,
    },
    calendarBtn: {
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: colorSet.primaryText,
      justifyContent: 'center',
      width: width * 0.18,
      height: width * 0.18,
    },
    calendarText: {
      textAlign: 'center',
      fontSize: width * 0.04,
    },
    listButton: {
      paddingVertical: height * 0.025,
    },
    checkboxParagraph: {
      fontSize: width * 0.035,
      letterSpacing: 0.5,
      fontWeight: 'bold',
      width: '70%',
    },
    checkboxParagraph2: {
      fontSize: width * 0.035,
      letterSpacing: 0.5,
      fontWeight: 'bold',
      width: '70%',
    },
  });
};

export default dynamicStyles;
