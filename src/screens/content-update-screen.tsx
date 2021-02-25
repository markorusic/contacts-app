import React from 'react'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import { NavigationScreenComponent } from '../shared/navigation-utils'
import { ContactForm } from '../components/contact-form/contact-from-modal'
import { updateContact } from '../store/contacts/contacts-actions'
import { useContact } from '../store/contacts/hooks'

type Props = {
  contactId: string
}

const ContactUpdateScreen: NavigationScreenComponent<Props> = ({
  contactId,
  componentId
}) => {
  const dispatch = useDispatch()
  const contact = useContact(contactId)
  return (
    <ContactForm
      initialValues={contact}
      onCancel={() => Navigation.dismissModal(componentId)}
      onSubmit={values => {
        dispatch(updateContact({ id: contactId, ...values }))
        Navigation.dismissModal(componentId)
      }}
    />
  )
}

export default ContactUpdateScreen
