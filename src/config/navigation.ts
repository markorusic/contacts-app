import { Options } from 'react-native-navigation'
import { colors } from './theme'

export const screens = {
  Contacts: 'Contacts',
  CreateContact: 'CreateContact',
  ContactDetail: 'ContactDetail'
}

export const navigationOptions: Options = {
  topBar: {
    visible: false
  },
  layout: {
    componentBackgroundColor: colors.primaryBg,
    orientation: ['portrait']
  }
}
