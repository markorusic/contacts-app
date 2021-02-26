import React from 'react'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { createContact } from '../store/contacts/contacts-actions'
import { ContactForm } from '../components/contact-form/contact-from'

const CreateContactScreen: NavigationScreenComponent = props => {
  const dispatch = useDispatch()
  return (
    <ContactForm
      title="New Contact"
      onCancel={() => Navigation.dismissModal(props.componentId)}
      onSubmit={values => {
        dispatch(createContact(values))
        Navigation.dismissModal(props.componentId)
      }}
    />
  )
}

export default CreateContactScreen
