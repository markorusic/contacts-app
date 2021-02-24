import React from 'react'
import { View, ViewProps, ViewStyle, TextStyle, Text } from 'react-native'

export interface StyleViewProps extends ViewStyle {
  viewProps?: Omit<ViewProps, 'style'>
  children?: React.ReactNode
}

const StyleView: React.FC<StyleViewProps> = ({
  children,
  viewProps = {},
  ...props
}) => (
  <View style={props} {...viewProps}>
    {children}
  </View>
)

export interface StyleTextProps extends TextStyle {
  numberOfLines?: number
}

export const StyleText: React.FC<StyleTextProps> = ({
  children,
  numberOfLines,
  color = 'black',
  ...props
}) => (
  <Text
    style={{ color, ...props }}
    numberOfLines={numberOfLines}
    allowFontScaling={false}
  >
    {children}
  </Text>
)

export default StyleView
