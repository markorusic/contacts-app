import React, { FC } from 'react'
import { useFormikContext, useField } from 'formik'
import { TextInput, TextInputProps } from 'react-native'
import { useTranslation } from 'react-i18next'
import { colors, sizes } from '../../config/theme'
import { formStyles } from './form-styles'
import StyleView, { StyleText } from './style-view'

export const FormErrorText = ({ name }: { name: string }) => {
  const { t } = useTranslation()
  const [, meta] = useField(name)
  return (
    <StyleView
      height={25}
      paddingVertical={2}
      justifyContent="center"
      alignItems="center"
      alignSelf="baseline"
    >
      {meta.error && meta.touched && (
        <StyleText color={colors.error}>{t(meta.error)}</StyleText>
      )}
    </StyleView>
  )
}

export const FormLabel: FC = ({ children }) => {
  const { t } = useTranslation()
  return (
    <StyleView marginBottom={sizes.spacing.sm}>
      <StyleText>
        {typeof children === 'string' ? t(children) : children}
      </StyleText>
    </StyleView>
  )
}

export interface InputProps {
  name: string
  label?: string
}

export const FormTextInput = ({
  name,
  label,
  placeholder = '',
  ...props
}: TextInputProps & InputProps) => {
  const { t } = useTranslation()
  const formik = useFormikContext()
  const [field, meta] = useField(name)
  return (
    <StyleView>
      <StyleView>
        <FormLabel>{label}</FormLabel>
        <TextInput
          style={[
            formStyles.textInput,
            meta.error ? formStyles.errorBorder : {}
          ]}
          placeholderTextColor={colors.disabled}
          {...props}
          placeholder={t(placeholder)}
          value={field.value}
          onChangeText={value => {
            formik.setFieldValue(name, value)
            formik.setFieldTouched(name, true)
          }}
          onBlur={() => {
            formik.setFieldTouched(name, false)
          }}
        />
      </StyleView>
      <FormErrorText name={name} />
    </StyleView>
  )
}
