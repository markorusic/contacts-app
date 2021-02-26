import React, { useState } from 'react'
import { TouchableOpacity, TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { colors, sizes } from '../config/theme'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import ContactList from '../components/contact-list'
import { screens } from '../config/navigation'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { initContacts } from '../store/contacts/contacts-actions'
import { useContacts } from '../store/contacts/hooks'
import { PlusIcon } from '../shared/icons'
import { formStyles } from '../shared/components/form-styles'

const ContactsScreen: NavigationScreenComponent = () => {
  const dispatch = useDispatch<any>()
  const contacts = useContacts()
  const [searchText, setSearchText] = useState('')

  return (
    <ScreenContainer>
      <StyleView
        paddingHorizontal={sizes.spacing.xl}
        paddingTop={sizes.spacing.lg}
      >
        <StyleView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <StyleText fontWeight="bold" fontSize={sizes.text.xl}>
            Contacts
          </StyleText>
          <TouchableOpacity
            onPress={() =>
              Navigation.showModal({
                component: {
                  id: screens.CreateContact,
                  name: screens.CreateContact
                }
              })
            }
          >
            <PlusIcon color={colors.brand} size={30} />
          </TouchableOpacity>
        </StyleView>
        <StyleView paddingVertical={20}>
          <TextInput
            style={formStyles.textInput}
            placeholder="Search"
            value={searchText}
            onChangeText={value => setSearchText(value)}
          />
        </StyleView>
      </StyleView>
      <ContactList
        ListEmptyComponent={
          <StyleView justifyContent="center" alignItems="center">
            <StyleText fontSize={sizes.text.xxl}>No data</StyleText>
            {contacts.value.length === 0 && (
              <StyleView
                marginTop={sizes.spacing.md}
                padding={sizes.spacing.md}
                borderRadius={5}
                backgroundColor={colors.secondaryBg}
              >
                <TouchableOpacity onPress={() => dispatch(initContacts())}>
                  <StyleText fontSize={sizes.text.md}>
                    Import mockup contacts
                  </StyleText>
                </TouchableOpacity>
              </StyleView>
            )}
          </StyleView>
        }
        data={contacts.value.filter(contact =>
          contact.name.toLowerCase().includes(searchText.toLowerCase())
        )}
      />
    </ScreenContainer>
  )
}

export default ContactsScreen
