import { Appearance } from 'react-native'

type ColorSchemeName = 'dark' | 'light'

type Colors = {
  primaryBg: string
  secondaryBg: string
  primaryText: string
  secondaryText: string
  disabled: string
  brand: string
  error: string
}

const colorSchemes: Record<ColorSchemeName, Colors> = {
  dark: {
    primaryBg: '#1a1919',
    secondaryBg: '#2e2d2d',
    primaryText: 'white',
    secondaryText: '#319ad6',
    disabled: '#939596',
    brand: '#0b96e6',
    error: '#f00'
  },
  light: {
    primaryBg: '#f7f7f7',
    secondaryBg: '#d4d4d4',
    primaryText: 'black',
    secondaryText: '#319ad6',
    disabled: '#939596',
    brand: '#0b96e6',
    error: '#f00'
  }
}

export const colorSchemeName = Appearance.getColorScheme() ?? 'light'

export const colors = colorSchemes[colorSchemeName]

export const sizes = {
  text: {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 26
  },
  spacing: {
    sm: 5,
    md: 10,
    lg: 15,
    xl: 20,
    xxl: 25
  },
  flex1: { flex: 1 }
}
