import React, { FC } from 'react'
import {
  ActivityIndicator,
  SectionList,
  SectionListProps,
  TouchableOpacity
} from 'react-native'
import { last, sortBy } from 'lodash'
import { colors } from '../config/theme'
import { ContactDto } from '../services/contact-service'
import StyleView, { StyleText } from '../shared/components/style-view'
import { Navigation } from 'react-native-navigation'
import { screens } from '../config/navigation'

export interface ContactListProps
  extends Partial<SectionListProps<ContactDto>> {
  data: ContactDto[] | undefined
  loading?: boolean
}

const ContactList: FC<ContactListProps> = ({
  data = [],
  loading = false,
  ...props
}) => {
  const contactInitialLetterMap = sortBy(data, 'firstName')?.reduce(
    (acc, contact) => {
      const [initialLetter] = contact.firstName
      if (initialLetter) {
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

  const contactSections = Object.keys(contactInitialLetterMap).map(
    initialLetter => ({
      title: initialLetter,
      data: contactInitialLetterMap[initialLetter]
    })
  )

  return (
    <SectionList
      key="id"
      sections={contactSections}
      ListEmptyComponent={() => (
        <StyleView justifyContent="center" alignItems="center">
          {loading ? (
            <ActivityIndicator color={colors.primaryText} />
          ) : (
            <StyleText fontSize={25}>No data</StyleText>
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
          paddingHorizontal={20}
          paddingVertical={15}
        >
          <TouchableOpacity
            onPress={() => {
              Navigation.showModal({
                component: {
                  id: screens.ContactDetail,
                  name: screens.ContactDetail,
                  passProps: { contact }
                }
              })
            }}
          >
            <StyleText fontSize={16} fontWeight="500">
              {contact.firstName + ' ' + contact.lastName}
            </StyleText>
          </TouchableOpacity>
        </StyleView>
      )}
      {...props}
    />
  )
}

export default ContactList
