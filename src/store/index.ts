import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import { Action } from '../shared/types'
import contactsReducer, { ContactsState } from './contacts/contacts-reducer'
import countriesReducer, { CountriesState } from './countries/countries-reducer'

export interface RootState {
  contacts: ContactsState
  countries: CountriesState
}

const rootReducer = combineReducers({
  contacts: contactsReducer,
  countries: countriesReducer
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['contacts', 'countries']
  },
  rootReducer
)

export const store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)

export type RootThunk = ThunkAction<void, RootState, unknown, Action<string>>
