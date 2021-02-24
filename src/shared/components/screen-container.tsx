import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'
import StyleView, { StyleViewProps } from './style-view'

const ScreenContainer: FC<StyleViewProps> = props => {
  return (
    <SafeAreaView>
      <StyleView height="100%" {...props} />
    </SafeAreaView>
  )
}

export default ScreenContainer
