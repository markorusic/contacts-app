import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { colors } from '../config/theme'
import { screens } from '../config/navigation'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { useContact } from '../store/contacts/hooks'

type Props = {
  contactId: string
}

const ContactDetailScreen: NavigationScreenComponent<Props> = ({
  contactId,
  componentId
}) => {
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
        <TouchableOpacity
          onPress={() =>
            Navigation.showModal({
              component: {
                id: screens.ContactUpdate,
                name: screens.ContactUpdate,
                passProps: { contactId }
              }
            })
          }
        >
          <StyleText fontSize={16} color={colors.secondaryText}>
            Update
          </StyleText>
        </TouchableOpacity>
      </StyleView>
      <StyleText>
        #{contact?.id} - {contact?.name}
      </StyleText>
    </ScreenContainer>
  )
}

export default ContactDetailScreen
