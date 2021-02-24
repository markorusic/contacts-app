import { Action } from '../../shared/types'
import { contactsActionTypes } from './contacts-actions'

export interface ContactDto {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  zipCode: string
}

export type ContactsState = {
  value: ContactDto[]
}

const initialState: ContactsState = {
  value: []
}

const contactsReducer = (
  state = initialState,
  action: Action
): ContactsState => {
  switch (action.type) {
    case contactsActionTypes.init:
      return {
        ...state,
        value: action.payload as ContactDto[]
      }

    case contactsActionTypes.create:
      return {
        ...state,
        value: [action.payload as ContactDto, ...state.value]
      }

    case contactsActionTypes.delete:
      return {
        ...state,
        value: state.value.filter(
          contact => contact.id !== (action.payload as ContactDto).id
        )
      }

    case contactsActionTypes.update:
      return {
        ...state,
        value: state.value.map(contact => {
          const updatedContact = action.payload as ContactDto
          return contact.id === updatedContact.id ? updatedContact : contact
        })
      }

    default:
      return state
  }
}

export default contactsReducer
