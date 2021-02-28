import { StyleSheet } from 'react-native'
import { colors, sizes } from '../../config/theme'

export const formStyles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingHorizontal: sizes.spacing.md,
    borderRadius: 8,
    backgroundColor: colors.secondaryBg,
    color: colors.primaryText
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1
  }
})
