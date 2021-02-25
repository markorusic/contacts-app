import { useSelector } from 'react-redux'
import { RootState } from '..'

export const useContacts = () =>
  useSelector((state: RootState) => state.contacts)

export const useContact = (id: string) =>
  useSelector((state: RootState) =>
    state.contacts.value.find(contact => contact.id === id)
  )
