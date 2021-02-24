import React, { FC } from 'react'
import {
  ActivityIndicator,
  SectionList,
  SectionListProps,
  TouchableOpacity
} from 'react-native'
import {
  Navigation,
  OptionsModalPresentationStyle
} from 'react-native-navigation'
import { last, sortBy } from 'lodash'
import { colors } from '../config/theme'
import { ContactDto } from '../store/contacts/contacts-reducer'
import StyleView, { StyleText } from '../shared/components/style-view'
import { screens } from '../config/navigation'
import { useDispatch } from 'react-redux'
import { initContacts } from '../store/contacts/contacts-actions'

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
  const dispatch = useDispatch<any>()

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
            <StyleView justifyContent="center" alignItems="center">
              <StyleText fontSize={25}>No data</StyleText>
              <StyleView
                marginTop={10}
                padding={12}
                borderRadius={5}
                backgroundColor={colors.brandColor}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(initContacts())
                  }}
                >
                  <StyleText fontSize={15}>
                    Initialize contacts with mockup data
                  </StyleText>
                </TouchableOpacity>
              </StyleView>
            </StyleView>
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
                  passProps: { contact },
                  options: {
                    modalPresentationStyle:
                      OptionsModalPresentationStyle.fullScreen
                  }
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
