import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'
import { sizes } from '../../config/theme'
import StyleView, { StyleViewProps } from './style-view'

const ScreenContainer: FC<StyleViewProps> = props => {
  return (
    <SafeAreaView style={sizes.flex1}>
      <StyleView flex={1} {...props} />
    </SafeAreaView>
  )
}

export default ScreenContainer
