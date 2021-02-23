import { last, sortBy } from 'lodash'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { colors } from '../config/theme'
import { ContactDto } from '../services/contact-service'
import StyleView, { StyleText } from '../shared/style-view'
import { AsyncStatus } from '../shared/types'
import { useContacts } from './contact-provider'

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#e6e6e6',
    color: colors.primaryText
  }
})

const ContactList = () => {
  const [search, setSearch] = useState('')
  const contacts = useContacts()

  const contactMap = sortBy(contacts.value, 'firstName')?.reduce(
    (acc, contact) => {
      const [initialLetter] = contact.firstName
      const searchMatch = contact.firstName
        .toLowerCase()
        .includes(search.toLowerCase())
      if (initialLetter && searchMatch) {
        if (acc[initialLetter]) {
          acc[initialLetter].push(contact)
        } else {
          acc[initialLetter] = [contact]
        }
      }
      return acc
    },
    {} as Record<string, ContactDto[]>
  )

  const contactSections = Object.keys(contactMap).map(title => ({
    title,
    data: contactMap[title]
  }))

  return (
    <StyleView>
      <SectionList
        key="id"
        stickySectionHeadersEnabled
        sections={contactSections}
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
                onPress={() => console.log('open create contact screen')}
              >
                <StyleText fontWeight="bold" fontSize={35} color="#0b96e6">
                  +
                </StyleText>
              </TouchableOpacity>
            </StyleView>
            <StyleView paddingVertical={20}>
              <TextInput
                style={styles.searchInput}
                autoFocus
                placeholder="Search"
                value={search}
                onChangeText={value => setSearch(value)}
              />
            </StyleView>
          </StyleView>
        }
        ListEmptyComponent={() => (
          <StyleView justifyContent="center" alignItems="center">
            {contacts.status === AsyncStatus.success ? (
              <StyleText fontSize={25}>No data</StyleText>
            ) : (
              <ActivityIndicator color={colors.primaryText} />
            )}
          </StyleView>
        )}
        renderSectionHeader={({ section }) => (
          <StyleText
            backgroundColor={colors.secondaryBg}
            paddingHorizontal={20}
            paddingVertical={5}
            fontWeight="bold"
            fontSize={16}
          >
            {section.title}
          </StyleText>
        )}
        renderItem={({ item: contact, section }) => (
          <StyleView
            borderBottomColor={colors.secondaryBg}
            borderBottomWidth={last(section.data)?.id === contact.id ? 0 : 1}
          >
            <TouchableOpacity
              onPress={() => {
                console.log('open contact screen', contact.id)
              }}
            >
              <StyleView paddingHorizontal={20} paddingVertical={15}>
                <StyleText fontSize={16} fontWeight="500">
                  {contact.firstName + ' ' + contact.lastName}
                </StyleText>
              </StyleView>
            </TouchableOpacity>
          </StyleView>
        )}
      />
    </StyleView>
  )
}

export default ContactList
