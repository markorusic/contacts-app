import React, { FC } from 'react'
import { useFormikContext, useField } from 'formik'
import { TextInput, TextInputProps } from 'react-native'
import { colors, sizes } from '../../config/theme'
import { formStyles } from './form-styles'
import StyleView, { StyleText } from './style-view'

export const FormErrorText = ({ name }: { name: string }) => {
  const [, meta] = useField(name)
  return (
    <StyleView
      height={25}
      paddingVertical={2}
      justifyContent="center"
      alignItems="center"
      alignSelf="baseline"
    >
      {meta.error && <StyleText color={colors.error}>{meta.error}</StyleText>}
    </StyleView>
  )
}

export const FormLabel: FC = ({ children }) => (
  <StyleView marginBottom={sizes.spacing.sm}>
    <StyleText>{children}</StyleText>
  </StyleView>
)

export interface InputProps {
  name: string
  label?: string
}

export const FormTextInput = ({
  name,
  label,
  ...props
}: TextInputProps & InputProps) => {
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
          value={field.value}
          onChangeText={value => {
            formik.setFieldValue(name, value)
          }}
        />
      </StyleView>
      <FormErrorText name={name} />
    </StyleView>
  )
}
