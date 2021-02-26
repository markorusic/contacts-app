import { Formik, FormikConfig } from 'formik'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { colors, sizes } from '../../config/theme'
import { FormTextInput } from '../../shared/components/form'
import ScreenContainer from '../../shared/components/screen-container'
import StyleView, { StyleText } from '../../shared/components/style-view'
import { Optional } from '../../shared/types'
import { ContactDto } from '../../store/contacts/contacts-reducer'
import { SelectCountryInput } from './select-country-input'
import { SelectGenderInput } from './select-gender-input'

type ContactFormValues = Omit<ContactDto, 'id'>

const validate = (values: ContactFormValues) => {
  const errors: Record<string, string> = {}
  if (!values.name) {
    errors.name = 'Required'
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
    gender: undefined,
    zipCode: undefined
  },
  title,
  onCancel,
  ...props
}) => {
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
          <ScreenContainer paddingHorizontal={20} paddingVertical={10}>
            <StyleView
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={10}
            >
              {onCancel && (
                <TouchableOpacity onPress={() => onCancel()}>
                  <StyleText
                    fontSize={sizes.text.md}
                    color={colors.secondaryText}
                  >
                    Cancel
                  </StyleText>
                </TouchableOpacity>
              )}
              <StyleText fontSize={sizes.text.lg} fontWeight="bold">
                {title}
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
                  Save
                </StyleText>
              </TouchableOpacity>
            </StyleView>
            <StyleView paddingVertical={10}>
              <FormTextInput
                name="name"
                label="Name:"
                placeholder="Type name"
              />
              <FormTextInput
                name="phoneNumber"
                label="Phone number:"
                placeholder="Type phone number"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoCorrect={false}
              />
              <SelectGenderInput name="gender" label="Select gender:" />
              <SelectCountryInput
                name="country"
                label="Select country:"
                placeholder="Country"
              />
              <FormTextInput
                name="zipCode"
                label="Select zip code:"
                placeholder="Zip code"
              />
            </StyleView>
          </ScreenContainer>
        )
      }}
    </Formik>
  )
}
