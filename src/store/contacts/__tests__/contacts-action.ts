import 'react-native'
import {
  contactsActionTypes,
  createContact,
  deleteContact,
  importContacts,
  updateContact
} from '../contacts-actions'

const fakeContact = { id: '1', name: 'Jon Doe' }

describe('contacts action creators', () => {
  it('importContacts', () => {
    const numberOfContacts = 30
    const dispatch = jest.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    importContacts(numberOfContacts)(dispatch)

    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch.mock.calls[0][0].type).toBe(contactsActionTypes.import)
    expect(dispatch.mock.calls[0][0].payload.length).toBe(numberOfContacts)
  })

  it('createContact', () => {
    const action = createContact(fakeContact)
    expect(action.type).toBe(contactsActionTypes.create)
    expect(action.payload.id).toBeTruthy()
    expect(action.payload.name).toBe(fakeContact.name)
  })

  it('updateContact', () => {
    const action = updateContact(fakeContact)
    expect(action.type).toBe(contactsActionTypes.update)
    expect(action.payload).toEqual(fakeContact)
  })

  it('deleteContact', () => {
    const action = deleteContact(fakeContact)
    expect(action.type).toBe(contactsActionTypes.delete)
    expect(action.payload).toEqual(fakeContact)
  })
})
