import React, { FC } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import StyleView, { StyleViewProps } from './style-view'

const styles = StyleSheet.create({ container: { flex: 1 } })

const ScreenContainer: FC<StyleViewProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <StyleView flex={1} {...props} />
    </SafeAreaView>
  )
}

export default ScreenContainer
