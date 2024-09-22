import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    container: {
    },
    arrow: {
      width: width * 0.05,
      height: width * 0.05,
    },
    calendar: {
      paddingLeft: 20,
      paddingRight: 20
    },
    header: {
      backgroundColor: colorSet.primaryBackground,
    },
    section: {
      backgroundColor: colorSet.primaryBackground,
      color: 'grey',
      textTransform: 'capitalize'
    }
  })
}
export default styles
