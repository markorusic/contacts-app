import React, { FC } from 'react'
import { View, ViewProps, ViewStyle, TextStyle, Text } from 'react-native'
import { colors, sizes } from '../../config/theme'

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
  fontSize = sizes.text.sm,
  color = colors.primaryText,
  ...props
}) => (
  <Text
    style={{ color, fontSize, ...props }}
    numberOfLines={numberOfLines}
    allowFontScaling={false}
  >
    {children}
  </Text>
)

export default StyleView
