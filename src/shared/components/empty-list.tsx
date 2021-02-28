import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { sizes } from '../../config/theme'
import StyleView, { StyleText } from './style-view'

export interface EmptyListProps {
  message?: string
}

export const EmptyList: FC<EmptyListProps> = ({
  message = 'commons.noData',
  children
}) => {
  const { t } = useTranslation()
  return (
    <StyleView justifyContent="center" alignItems="center">
      <StyleText fontSize={sizes.text.xxl}>{t(message)}</StyleText>
      {children}
    </StyleView>
  )
}
