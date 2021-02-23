import React, { FC, useContext, useEffect, useState } from 'react'
import { ContactDto, contactService } from '../services/contact-service'
import { AsyncStatus, AsyncValue } from '../shared/types'

const initalContactsState: AsyncValue<ContactDto[]> = {
  value: [],
  status: AsyncStatus.idle,
  error: null
}

const ContactStateContext = React.createContext(initalContactsState)

const ContactProvider: FC = ({ children }) => {
  const [contactsValue, setContactsValue] = useState(initalContactsState)

  useEffect(() => {
    setContactsValue(state => ({ ...state, status: AsyncStatus.loading }))
    contactService
      .fetchAll()
      .then(value =>
        setContactsValue(state => ({
          ...state,
          value,
          status: AsyncStatus.success,
          error: null
        }))
      )
      .catch(error =>
        setContactsValue(state => ({
          ...state,
          error,
          status: AsyncStatus.error
        }))
      )
  }, [])

  return (
    <ContactStateContext.Provider value={contactsValue}>
      {children}
    </ContactStateContext.Provider>
  )
}

export const useContacts = () => useContext(ContactStateContext)

export default ContactProvider
