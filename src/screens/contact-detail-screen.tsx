import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { get } from 'lodash'
import { colors, sizes } from '../config/theme'
import { screens } from '../config/navigation'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { useContact } from '../store/contacts/hooks'
import { ContactDto } from '../store/contacts/contacts-reducer'
import { deleteContact } from '../store/contacts/contacts-actions'

type Props = {
  contactId: string
}

const contactLabels: Record<keyof Omit<ContactDto, 'id'>, string> = {
  name: 'Name',
  gender: 'Gender',
  country: 'Country',
  phoneNumber: 'Phone number'
}

const ContactDetailScreen: NavigationScreenComponent<Props> = ({
  contactId,
  componentId
}) => {
  const dispatch = useDispatch()
  const contact = useContact(contactId)
  return (
    <ScreenContainer
      paddingHorizontal={sizes.spacing.xl}
      paddingVertical={sizes.spacing.lg}
    >
      <StyleView
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={sizes.spacing.md}
      >
        <TouchableOpacity onPress={() => Navigation.dismissModal(componentId)}>
          <StyleText fontSize={sizes.text.md} color={colors.secondaryText}>
            Back
          </StyleText>
        </TouchableOpacity>
        {contact && (
          <TouchableOpacity
            onPress={() =>
              Navigation.showModal({
                component: {
                  id: screens.ContactUpdate,
                  name: screens.ContactUpdate,
                  passProps: { contactId: contact.id }
                }
              })
            }
          >
            <StyleText fontSize={sizes.text.md} color={colors.secondaryText}>
              Update
            </StyleText>
          </TouchableOpacity>
        )}
      </StyleView>

      {contact && (
        <StyleView>
          <StyleView
            justifyContent="center"
            alignItems="center"
            marginBottom={sizes.spacing.xl}
          >
            <StyleText fontSize={sizes.text.xxl} fontWeight="600">
              {contact.name}
            </StyleText>
          </StyleView>
          <StyleView>
            {Object.keys(contactLabels).map(key => (
              <StyleView
                key={key}
                borderRadius={5}
                marginBottom={sizes.spacing.md}
                backgroundColor={colors.secondaryBg}
              >
                <StyleView padding={sizes.spacing.md}>
                  <StyleText color={colors.brand}>
                    {get(contactLabels, key)}
                  </StyleText>
                  <StyleText>{get(contact, key)}</StyleText>
                </StyleView>
              </StyleView>
            ))}
            <StyleView
              borderRadius={5}
              marginBottom={sizes.spacing.md}
              backgroundColor={colors.secondaryBg}
            >
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Are you sure that you want to remove this contact?',
                    '',
                    [
                      {
                        text: 'Yes',
                        onPress: () => {
                          Navigation.dismissModal(componentId)
                          dispatch(deleteContact(contact))
                        }
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel'
                      }
                    ]
                  )
                }
              >
                <StyleView padding={sizes.spacing.md}>
                  <StyleText color={colors.error}>
                    Remove this contact
                  </StyleText>
                </StyleView>
              </TouchableOpacity>
            </StyleView>
          </StyleView>
        </StyleView>
      )}
    </ScreenContainer>
  )
}

export default ContactDetailScreen
