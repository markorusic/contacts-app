import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { colors } from '../../config/theme'
import ScreenContainer from '../../shared/components/screen-container'
import { AsyncStatus, NavigationScreenComponent } from '../../shared/types'
import StyleView, { StyleText } from '../../shared/components/style-view'
import ContactList from '../../components/contact-list'
import { useContacts } from '../../components/contact-provider'
import { Navigation } from 'react-native-navigation'
import { screens } from '../../config/navigation'

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
  const contacts = useContacts()
  const searchRef = useRef<TextInput>(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (searchText && searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchText])

  return (
    <ScreenContainer>
      <ContactList
        ListHeaderComponent={
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
                      id: screens.CreateContact + Date.now(),
                      name: screens.CreateContact
                    }
                  })
                }
              >
                <StyleText fontWeight="500" fontSize={35} color="#0b96e6">
                  +
                </StyleText>
              </TouchableOpacity>
            </StyleView>
            <StyleView paddingVertical={20}>
              <TextInput
                ref={searchRef}
                style={styles.searchInput}
                placeholder="Search"
                value={searchText}
                onChangeText={value => setSearchText(value)}
              />
            </StyleView>
          </StyleView>
        }
        loading={contacts.status === AsyncStatus.success}
        data={contacts.value?.filter(contact =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )}
      />
    </ScreenContainer>
  )
}

export default ContactsScreen
