import React, { useState } from 'react'
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { colors } from '../config/theme'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import ContactList from '../components/contact-list'
import { screens } from '../config/navigation'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { initContacts } from '../store/contacts/contacts-actions'
import { useContacts } from '../store/contacts/hooks'

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#e6e6e6',
    color: colors.primaryText
  }
})

const ContactsScreen: NavigationScreenComponent = () => {
  const dispatch = useDispatch<any>()
  const contacts = useContacts()
  const [searchText, setSearchText] = useState('')

  return (
    <ScreenContainer>
      <StyleView paddingHorizontal={15}>
        <StyleView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <StyleText fontWeight="bold" fontSize={20}>
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
            <StyleText fontWeight="500" fontSize={35} color={colors.brand}>
              +
            </StyleText>
          </TouchableOpacity>
        </StyleView>
        <StyleView paddingVertical={20}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={value => setSearchText(value)}
          />
        </StyleView>
      </StyleView>
      <ContactList
        ListEmptyComponent={
          <StyleView justifyContent="center" alignItems="center">
            <StyleText fontSize={25}>No data</StyleText>
            {contacts.value.length === 0 && (
              <StyleView
                marginTop={10}
                padding={12}
                borderRadius={5}
                backgroundColor={colors.secondaryBg}
              >
                <TouchableOpacity onPress={() => dispatch(initContacts())}>
                  <StyleText fontSize={15}>Import mockup contacts</StyleText>
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
