import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import contactsReducer, { ContactsState } from './contacts/contacts-reducer'

export interface RootState {
  contacts: ContactsState
}

const rootReducer = combineReducers({
  contacts: contactsReducer
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['contacts']
  },
  rootReducer
)

export const store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)
