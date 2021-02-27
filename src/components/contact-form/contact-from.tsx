import { Formik, FormikConfig } from 'formik'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { colors, sizes } from '../../config/theme'
import { FormTextInput } from '../../shared/components/form'
import ScreenContainer from '../../shared/components/screen-container'
import StyleView, { StyleText } from '../../shared/components/style-view'
import { Optional } from '../../shared/types'
import { ContactDto } from '../../store/contacts/contacts-reducer'
import { PhoneNumberInput } from './phone-number-input'
import { SelectCountryInput } from './select-country-input'
import { SelectGenderInput } from './select-gender-input'

export type ContactFormValues = Omit<ContactDto, 'id'>

const validate = (values: ContactFormValues) => {
  const errors: Record<string, string> = {}
  if (!values.name) {
    errors.name = 'validation.required'
  }
  return errors
}

export type ContactFormProps = Optional<
  FormikConfig<ContactFormValues>,
  'initialValues'
> & {
  title?: string
  onCancel?: () => void
}

export const ContactForm: FC<ContactFormProps> = ({
  initialValues = {
    name: '',
    phoneNumber: undefined,
    country: undefined,
    gender: undefined
  },
  title = '',
  onCancel,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <Formik<ContactFormValues>
      validateOnBlur={false}
      validateOnChange={false}
      {...props}
      initialValues={initialValues}
      validate={validate}
    >
      {form => {
        const disableSubmit = Object.keys(validate(form.values)).length !== 0
        return (
          <ScreenContainer
            paddingHorizontal={sizes.spacing.xl}
            paddingVertical={sizes.spacing.lg}
          >
            <StyleView
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={sizes.spacing.md}
            >
              {onCancel && (
                <TouchableOpacity onPress={() => onCancel()}>
                  <StyleText
                    fontSize={sizes.text.md}
                    color={colors.secondaryText}
                  >
                    {t('commons.cancel')}
                  </StyleText>
                </TouchableOpacity>
              )}
              <StyleText fontSize={sizes.text.lg} fontWeight="bold">
                {t(title)}
              </StyleText>
              <TouchableOpacity
                disabled={disableSubmit}
                onPress={form.handleSubmit}
              >
                <StyleText
                  fontSize={sizes.text.md}
                  color={disableSubmit ? colors.disabled : colors.secondaryText}
                  opacity={disableSubmit ? 0.7 : 1}
                >
                  {t('commons.save')}
                </StyleText>
              </TouchableOpacity>
            </StyleView>
            <StyleView paddingVertical={sizes.spacing.lg}>
              <FormTextInput
                name="name"
                label="contacts.nameLabel"
                placeholder="contacts.namePlaceholder"
              />
              <SelectGenderInput name="gender" label="contacts.genderLabel" />
              <SelectCountryInput
                name="country"
                label="contacts.countryLabel"
                placeholder="contacts.countryPlaceholder"
              />
              <PhoneNumberInput
                name="phoneNumber"
                label="contacts.phoneNumberLabel"
                placeholder="contacts.phoneNumberPlaceholder"
              />
            </StyleView>
          </ScreenContainer>
        )
      }}
    </Formik>
  )
}
