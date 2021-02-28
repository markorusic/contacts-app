import 'react-native'
import { contactsActionTypes } from '../contacts-actions'
import contactsReducer from '../contacts-reducer'

describe('contactsReducer', () => {
  it('imports contact list', () => {
    const action = {
      type: contactsActionTypes.import,
      payload: [
        { id: '1', name: 'Jon Doe' },
        { id: '2', name: 'Jon Doe' }
      ]
    }
    expect(contactsReducer(undefined, action)).toEqual({
      value: action.payload
    })
  })

  it('creates new contact', () => {
    const action = {
      type: contactsActionTypes.create,
      payload: { id: '1', name: 'Jon Doe' }
    }
    expect(contactsReducer(undefined, action)).toEqual({
      value: [action.payload]
    })
  })

  it('updates existing contact', () => {
    const action = {
      type: contactsActionTypes.update,
      payload: { id: '1', name: 'Jon Doe1' }
    }
    expect(
      contactsReducer(
        {
          value: [
            { id: '1', name: 'Jon Doe2' },
            { id: '2', name: 'Jon Doe3' }
          ]
        },
        action
      )
    ).toEqual({
      value: [
        { id: '1', name: 'Jon Doe1' },
        { id: '2', name: 'Jon Doe3' }
      ]
    })
  })

  it('deletes existing contact', () => {
    const action = {
      type: contactsActionTypes.delete,
      payload: { id: '1', name: 'Jon Doe' }
    }
    expect(
      contactsReducer({ value: [{ id: '1', name: 'Jon Doe' }] }, action)
    ).toEqual({ value: [] })
  })
})
