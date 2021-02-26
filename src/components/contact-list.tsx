import React, { FC } from 'react'
import { SectionList, SectionListProps, TouchableOpacity } from 'react-native'
import {
  Navigation,
  OptionsModalPresentationStyle
} from 'react-native-navigation'
import { last, sortBy } from 'lodash'
import { colors, sizes } from '../config/theme'
import { ContactDto } from '../store/contacts/contacts-reducer'
import StyleView, { StyleText } from '../shared/components/style-view'
import { screens } from '../config/navigation'

export interface ContactListProps
  extends Partial<SectionListProps<ContactDto>> {
  data: ContactDto[] | undefined
}

const ContactList: FC<ContactListProps> = ({ data = [], ...props }) => {
  const contactInitialLetterMap = sortBy(data, 'name')?.reduce(
    (acc, contact) => {
      const [initialLetter] = contact.name
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
      renderSectionHeader={({ section }) => (
        <StyleText
          backgroundColor={colors.secondaryBg}
          paddingHorizontal={sizes.spacing.xl}
          paddingVertical={sizes.spacing.sm}
          fontSize={sizes.text.md}
          fontWeight="bold"
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
              Navigation.showModal({
                component: {
                  id: screens.ContactDetail,
                  name: screens.ContactDetail,
                  passProps: { contactId: contact.id },
                  options: {
                    modalPresentationStyle:
                      OptionsModalPresentationStyle.fullScreen
                  }
                }
              })
            }}
          >
            <StyleView
              paddingHorizontal={sizes.spacing.xl}
              paddingVertical={sizes.spacing.lg}
            >
              <StyleText fontSize={sizes.text.md} fontWeight="500">
                {contact.name}
              </StyleText>
            </StyleView>
          </TouchableOpacity>
        </StyleView>
      )}
      {...props}
    />
  )
}

export default ContactList
