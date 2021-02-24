import { Navigation } from 'react-native-navigation'
import { navigationOptions, screens } from './config/navigation'
import { registerComponent } from './shared/navigation-utils'
import ContactDetailScreen from './screens/contact-detail-screen'
import ContactsScreen from './screens/contacts-screen'
import CreateContactScreen from './screens/create-contact-screen'

export const init = () => {
  registerComponent(screens.Contacts, ContactsScreen)
  registerComponent(screens.CreateContact, CreateContactScreen)
  registerComponent(screens.ContactDetail, ContactDetailScreen)
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
