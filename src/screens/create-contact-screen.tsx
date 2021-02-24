import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { colors } from '../config/theme'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import { NavigationScreenComponent } from '../shared/navigation-utils'

const CreateContactScreen: NavigationScreenComponent = props => {
  return (
    <ScreenContainer paddingHorizontal={20} paddingVertical={10}>
      <StyleView
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={10}
      >
        <TouchableOpacity
          onPress={() => Navigation.dismissModal(props.componentId)}
        >
          <StyleText fontSize={16} color={colors.secondaryText}>
            Cancel
          </StyleText>
        </TouchableOpacity>
        <StyleText fontSize={16} fontWeight="bold">
          New Contact
        </StyleText>
        <TouchableOpacity>
          <StyleText fontSize={16} color="gray" opacity={0.7}>
            Save
          </StyleText>
        </TouchableOpacity>
      </StyleView>
      <StyleText>create new contact</StyleText>
    </ScreenContainer>
  )
}

export default CreateContactScreen
