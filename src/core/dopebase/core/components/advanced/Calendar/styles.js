import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = (theme, appearance) => {
  const colorSet = theme.colors[appearance];
  return StyleSheet.create({
    container: {},
    arrow: {
      width: width * 0.05,
      height: width * 0.05,
    },
    calendar: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    header: {
      backgroundColor: colorSet.primaryBackground,
    },
    section: {
      backgroundColor: colorSet.primaryBackground,
      color: 'grey',
    },
    sectionHeaderContainer: {
      paddingVertical: width * 0.02,
      paddingHorizontal: width * 0.04,
      backgroundColor: colorSet.grey12, // Màu nền mặc định cho tiêu đề
    },
    sectionHeaderText: {
      textTransform: 'capitalize',
      fontSize: width * 0.04,
      fontWeight: 'bold',
    },
    todayHeaderText: {
      backgroundColor: colorSet.thirBackground,
    },
    btnAddTaskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnAddTaskText: {
      color: colorSet.secondaryText,
      fontSize: width * 0.04,
      fontWeight: '650',
    },
  });
};
export default styles;
