import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useTranslation } from 'react-i18next'
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

const contactDisplayFields: Record<
  keyof Omit<ContactDto, 'id'>,
  { label: string; langPrefix?: string }
> = {
  name: {
    label: 'contacts.nameLabel'
  },
  gender: {
    label: 'contacts.genderLabel',
    langPrefix: 'commons.'
  },
  country: {
    label: 'contacts.countryLabel'
  },
  phoneNumber: {
    label: 'contacts.phoneNumberLabel'
  }
}

const ContactDetailScreen: NavigationScreenComponent<Props> = ({
  contactId,
  componentId
}) => {
  const { t } = useTranslation()
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
            {t('commons.back')}
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
              {t('commons.update')}
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
            {Object.entries(contactDisplayFields).map(([key, field]) => {
              const { label, langPrefix } = field
              const value = get(contact, key) as string
              return (
                <StyleView
                  key={key}
                  borderRadius={5}
                  marginBottom={sizes.spacing.md}
                  backgroundColor={colors.secondaryBg}
                >
                  <StyleView padding={sizes.spacing.md}>
                    <StyleText color={colors.brand}>{t(label)}</StyleText>
                    <StyleText>
                      {langPrefix ? t(`${langPrefix}${value}`) : value}
                    </StyleText>
                  </StyleView>
                </StyleView>
              )
            })}
            <StyleView
              borderRadius={5}
              marginBottom={sizes.spacing.md}
              backgroundColor={colors.secondaryBg}
            >
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(t('contacts.removeContactConfirm'), '', [
                    {
                      text: t('commons.yes'),
                      onPress: () => {
                        Navigation.dismissModal(componentId)
                        dispatch(deleteContact(contact))
                      }
                    },
                    {
                      text: t('commons.cancel'),
                      style: 'cancel'
                    }
                  ])
                }
              >
                <StyleView padding={sizes.spacing.md}>
                  <StyleText color={colors.error}>
                    {t('contacts.removeContact')}
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
