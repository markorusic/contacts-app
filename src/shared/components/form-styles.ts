import { StyleSheet } from 'react-native'
import { colors } from '../../config/theme'

export const formStyles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#e6e6e6',
    color: colors.primaryText
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1
  }
})
