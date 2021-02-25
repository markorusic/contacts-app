import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { colors } from '../config/theme'
import { ContactDto } from '../store/contacts/contacts-reducer'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import { NavigationScreenComponent } from '../shared/navigation-utils'

type Props = {
  contact: ContactDto
}

const ContactDetailScreen: NavigationScreenComponent<Props> = ({
  contact,
  componentId
}) => {
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
        <TouchableOpacity>
          <StyleText fontSize={16} color="gray" opacity={0.7}>
            Save
          </StyleText>
        </TouchableOpacity>
      </StyleView>
      <StyleText>
        #{contact.id} - {contact.name}
      </StyleText>
    </ScreenContainer>
  )
}

export default ContactDetailScreen
