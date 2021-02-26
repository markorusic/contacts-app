import React, { FC } from 'react'
import { SvgXml } from 'react-native-svg'
import { colors } from '../config/theme'
import { StyleText } from './components/style-view'

export interface IconProps {
  size?: number
  color?: string
}

export const createIconComponent = (iconXml: string): FC<IconProps> => ({
  size = 30,
  color = colors.primaryText
}) => {
  return (
    <StyleText>
      <SvgXml color={color} xml={iconXml} width={size} height={size} />
    </StyleText>
  )
}

export const PlusIcon = createIconComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> </svg>'
)
