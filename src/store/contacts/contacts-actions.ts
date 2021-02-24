import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ContactDto, contactService } from '../../services/contact-service'
import { AsyncStatus } from '../../shared/types'
import { ContactsState } from './contacts-reducer'

export const contactsActionTypes = {
  loadStarted: 'loadStarted',
  loadSuccess: 'loadSuccess',
  loadFail: 'loadFail',
  create: 'create',
  delete: 'delete',
  update: 'update'
}

type ContactsThunk = ThunkAction<void, ContactsState, unknown, Action<string>>

export const loadContacts = (): ContactsThunk => async (dispatch, getState) => {
  const state = getState()
  if (state.status !== AsyncStatus.loading) {
    dispatch({
      type: contactsActionTypes.loadStarted
    })

    try {
      const contacts = await contactService.fetchAll()
      dispatch({
        type: contactsActionTypes.loadSuccess,
        payload: contacts
      })
    } catch (error) {
      dispatch({
        type: contactsActionTypes.loadFail,
        payload: error
      })
    }
  }
}

export const createContact = (
  contact: ContactDto
): ContactsThunk => async dispatch => {
  dispatch({
    type: contactsActionTypes.create,
    payload: contact
  })
}

export const updateContact = (
  contact: ContactDto
): ContactsThunk => async dispatch => {
  dispatch({
    type: contactsActionTypes.update,
    payload: contact
  })
}

export const deleteContact = (
  contact: ContactDto
): ContactsThunk => async dispatch => {
  dispatch({
    type: contactsActionTypes.delete,
    payload: contact
  })
}
