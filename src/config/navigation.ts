import { Options } from 'react-native-navigation'
import { colors, colorSchemeName } from './theme'

export const screens = {
  Contacts: 'Contacts',
  CreateContact: 'CreateContact',
  ContactDetail: 'ContactDetail',
  ContactUpdate: 'ContactUpdate'
}

export const navigationOptions: Options = {
  statusBar: {
    style: colorSchemeName === 'dark' ? 'light' : 'dark'
  },
  topBar: {
    visible: false
  },
  layout: {
    componentBackgroundColor: colors.primaryBg,
    orientation: ['portrait']
  }
}
