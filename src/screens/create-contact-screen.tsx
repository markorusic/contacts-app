import { Formik } from 'formik'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { SelectCountryInput } from '../components/select-country-input'
import SelectGenderInput from '../components/select-gender-input'
import { colors } from '../config/theme'
import { FormTextInput } from '../shared/components/form'
import ScreenContainer from '../shared/components/screen-container'
import StyleView, { StyleText } from '../shared/components/style-view'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { createContact } from '../store/contacts/contacts-actions'
import { ContactDto } from '../store/contacts/contacts-reducer'

type ContactFormValues = Omit<ContactDto, 'id'>

const initialValues: ContactFormValues = {
  name: '',
  phoneNumber: '',
  country: undefined,
  gender: undefined,
  zipCode: undefined
}

const validate = (values: ContactFormValues) => {
  const errors: Record<string, string> = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  } else if (values.phoneNumber.length < 5) {
    errors.phoneNumber = 'Bad format'
  }
  return errors
}

const CreateContactScreen: NavigationScreenComponent = props => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={values => {
        dispatch(createContact(values))
        Navigation.dismissModal(props.componentId)
      }}
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
              <TouchableOpacity
                onPress={() => Navigation.dismissModal(props.componentId)}
              >
                <StyleText fontSize={16} color={colors.secondaryText}>
                  Cancel
                </StyleText>
              </TouchableOpacity>
              <StyleText fontSize={18} fontWeight="bold">
                New Contact
              </StyleText>
              <TouchableOpacity
                disabled={disableSubmit}
                onPress={form.handleSubmit}
              >
                <StyleText
                  fontSize={16}
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

export default CreateContactScreen
