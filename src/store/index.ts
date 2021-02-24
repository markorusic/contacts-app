import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import contactsReducer, { ContactsState } from './contacts/contacts-reducer'

export interface RootState {
  contacts: ContactsState
}

const reducer = combineReducers({
  contacts: contactsReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))
