import { ContactDto } from '../../services/contact-service'
import { Action, AsyncStatus, AsyncValue } from '../../shared/types'
import { contactsActionTypes } from './contacts-actions'

export type ContactsState = AsyncValue<ContactDto[]>

const initialState: ContactsState = {
  value: [],
  status: AsyncStatus.idle,
  error: null
}

const contactsReducer = (
  state = initialState,
  action: Action
): ContactsState => {
  switch (action.type) {
    case contactsActionTypes.loadStarted:
      return {
        ...state,
        status: AsyncStatus.loading
      }

    case contactsActionTypes.loadSuccess:
      return {
        ...state,
        value: action.payload as ContactDto[],
        status: AsyncStatus.success,
        error: null
      }

    case contactsActionTypes.loadFail:
      return {
        ...state,
        error: action.payload as string,
        status: AsyncStatus.error
      }

    case contactsActionTypes.create:
      return {
        ...state,
        value: [action.payload as ContactDto, ...(state.value ?? [])]
      }

    case contactsActionTypes.delete:
      return {
        ...state,
        value: state.value?.filter(
          contact => contact.id !== (action.payload as ContactDto).id
        )
      }

    case contactsActionTypes.update:
      return {
        ...state,
        value: state.value?.map(contact => {
          const updatedContact = action.payload as ContactDto
          return contact.id === updatedContact.id ? updatedContact : contact
        })
      }

    default:
      return state
  }
}

export default contactsReducer
