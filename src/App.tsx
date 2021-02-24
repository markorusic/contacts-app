import { Navigation } from 'react-native-navigation'
import { navigationOptions, screens } from './config/navigation'
import ContactDetailScreen from './screens/contact-detail-screen'
import ContactsScreen from './screens/contacts-screen'
import CreateContactScreen from './screens/create-contact-screen'

export const init = () => {
  Navigation.registerComponent(screens.Contacts, () => ContactsScreen)
  Navigation.registerComponent(screens.CreateContact, () => CreateContactScreen)
  Navigation.registerComponent(screens.ContactDetail, () => ContactDetailScreen)

  Navigation.setDefaultOptions(navigationOptions)

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                id: screens.Contacts,
                name: screens.Contacts
              }
            }
          ]
        }
      }
    })
  })
}
