import React, { FC } from 'react'
import { View, ViewProps, ViewStyle, TextStyle, Text } from 'react-native'
import { colors } from '../../config/theme'

export interface StyleViewProps extends ViewStyle {
  viewProps?: Omit<ViewProps, 'style'>
}

const StyleView: FC<StyleViewProps> = ({
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

export const StyleText: FC<StyleTextProps> = ({
  children,
  numberOfLines,
  color = colors.primaryText,
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
