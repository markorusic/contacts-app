import React, { FC } from 'react'
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { flatten } from 'lodash'
import {
  FormErrorText,
  FormLabel,
  InputProps
} from '../../shared/components/form'
import StyleView, { StyleText } from '../../shared/components/style-view'
import { formStyles } from '../../shared/components/form-styles'
import { useCountries } from '../../store/countries/hooks'
import { colors, sizes } from '../../config/theme'
import { ContactFormValues } from './contact-from'

export const PhoneNumberInput: FC<TextInputProps & InputProps> = ({
  name,
  label,
  placeholder = '',
  ...props
}) => {
  const { t } = useTranslation()
  const form = useFormikContext<ContactFormValues>()
  const countries = useCountries(form.values.country)
  const callingCodes = form.values.country
    ? flatten(countries.map(country => country.callingCodes))
    : []

  return (
    <StyleView>
      <FormLabel>{label}</FormLabel>

      <StyleView>
        {callingCodes.length > 0 && (
          <StyleView paddingVertical={sizes.spacing.md}>
            <StyleView>
              <StyleText color={colors.disabled}>
                {t('contacts.callingCodeSuggestions')}:
              </StyleText>
            </StyleView>
            <StyleView flexDirection="row" paddingVertical={sizes.spacing.sm}>
              {callingCodes.map(code => (
                <TouchableOpacity
                  key={code}
                  onPress={() =>
                    form.setFieldValue(
                      name,
                      code + (form.values.phoneNumber ?? '')
                    )
                  }
                >
                  <StyleView
                    padding={sizes.spacing.md}
                    borderRadius={5}
                    borderWidth={1}
                    borderColor={colors.disabled}
                  >
                    <StyleText>{code}</StyleText>
                  </StyleView>
                </TouchableOpacity>
              ))}
            </StyleView>
          </StyleView>
        )}

        <StyleView>
          <TextInput
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoCorrect={false}
            {...props}
            placeholder={t(placeholder)}
            style={formStyles.textInput}
            value={form.values.phoneNumber}
            onChangeText={value => form.setFieldValue(name, value)}
          />
        </StyleView>
      </StyleView>

      <FormErrorText name={name} />
    </StyleView>
  )
}
