import { range, capitalize, times, random, uniqueId } from 'lodash'
import { ContactDto } from './contacts-reducer'
import { RootThunk } from '..'

export const contactsActionTypes = {
  init: 'contacts.init',
  create: 'contacts.create',
  delete: 'contacts.delete',
  update: 'contacts.update'
}

export const initContacts = (): RootThunk => dispatch => {
  const alphabet = 'qwertyuiopasdfghjklzxcvbnm'
  const randomString = (size = 5) =>
    capitalize(
      times(size, () => alphabet[random(0, alphabet.length - 1)]).join('')
    )
  const contacts: ContactDto[] = range(0, 100).map(id => ({
    id: id.toString(),
    name: randomString(5),
    gender: Math.random() > 0.5 ? 'male' : 'female',
    phoneNumber: randomString(10),
    country: randomString(7)
  }))
  dispatch({
    type: contactsActionTypes.init,
    payload: contacts
  })
}

export const createContact = (contact: Omit<ContactDto, 'id'>) => ({
  type: contactsActionTypes.create,
  payload: {
    ...contact,
    id: uniqueId('contact_') + Date.now()
  }
})

export const updateContact = (contact: ContactDto) => ({
  type: contactsActionTypes.update,
  payload: contact
})

export const deleteContact = (contact: ContactDto) => ({
  type: contactsActionTypes.delete,
  payload: contact
})
