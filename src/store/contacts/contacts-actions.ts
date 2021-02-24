import { range, capitalize, times, random } from 'lodash'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import { Action } from '../../shared/types'
import { ContactDto } from './contacts-reducer'

export const contactsActionTypes = {
  init: 'init',
  create: 'create',
  delete: 'delete',
  update: 'update'
}

type ContactsThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const initContacts = (): ContactsThunk => dispatch => {
  const alphabet = 'qwertyuiopasdfghjklzxcvbnm'
  const randomString = (size = 5) =>
    capitalize(
      times(size, () => alphabet[random(0, alphabet.length - 1)]).join('')
    )
  const contacts = range(0, 100).map(id => ({
    id: id.toString(),
    firstName: randomString(5),
    lastName: randomString(5),
    phoneNumber: randomString(10),
    zipCode: randomString(5)
  }))
  dispatch({
    type: contactsActionTypes.init,
    payload: contacts
  })
}

export const createContact = (contact: ContactDto) => ({
  type: contactsActionTypes.create,
  payload: contact
})

export const updateContact = (contact: ContactDto) => ({
  type: contactsActionTypes.update,
  payload: contact
})

export const deleteContact = (contact: ContactDto) => ({
  type: contactsActionTypes.delete,
  payload: contact
})
