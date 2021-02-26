import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { get } from 'lodash'
import { colors } from '../config/theme'
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

const contactLabels: Record<keyof Omit<ContactDto, 'id' | 'name'>, string> = {
  phoneNumber: 'Phone number',
  country: 'Country',
  gender: 'Gender',
  zipCode: 'Zip code'
}

const ContactDetailScreen: NavigationScreenComponent<Props> = ({
  contactId,
  componentId
}) => {
  const dispatch = useDispatch()
  const contact = useContact(contactId)
  return (
    <ScreenContainer paddingHorizontal={20} paddingVertical={10}>
      <StyleView
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={10}
      >
        <TouchableOpacity onPress={() => Navigation.dismissModal(componentId)}>
          <StyleText fontSize={16} color={colors.secondaryText}>
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
            <StyleText fontSize={16} color={colors.secondaryText}>
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
            marginBottom={20}
          >
            <StyleText fontSize={26} fontWeight="600">
              {contact.name}
            </StyleText>
          </StyleView>
          <StyleView>
            {Object.keys(contactLabels).map(key => (
              <StyleView
                key={key}
                padding={10}
                borderRadius={5}
                marginBottom={10}
                backgroundColor={colors.secondaryBg}
              >
                <StyleText color={colors.brand}>
                  {get(contactLabels, key)}
                </StyleText>
                <StyleText>{get(contact, key)}</StyleText>
              </StyleView>
            ))}
          </StyleView>
          <StyleView
            padding={10}
            borderRadius={5}
            marginBottom={10}
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
                  ],
                  { cancelable: false }
                )
              }
            >
              <StyleView>
                <StyleText fontSize={15} color={colors.error}>
                  Remove this contact
                </StyleText>
              </StyleView>
            </TouchableOpacity>
          </StyleView>
        </StyleView>
      )}
    </ScreenContainer>
  )
}

export default ContactDetailScreen
