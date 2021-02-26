import { Action, AsyncStatus, AsyncValue } from '../../shared/types'
import { countriesActionTypes } from './countries-actions'

export interface CountryDto {
  id: string
  name: string
  callingCodes: string[]
}

export type CountriesState = AsyncValue<CountryDto[]>

const initialState: CountriesState = {
  value: [],
  status: AsyncStatus.idle,
  error: null
}

const countriesReducer = (
  state = initialState,
  action: Action
): CountriesState => {
  switch (action.type) {
    case countriesActionTypes.fetchStarted:
      return {
        ...state,
        status: AsyncStatus.loading
      }

    case countriesActionTypes.fetchSuccess:
      return {
        ...state,
        value: action.payload as CountryDto[],
        status: AsyncStatus.success,
        error: null
      }

    case countriesActionTypes.fetchError:
      return {
        ...state,
        status: AsyncStatus.error,
        error: action.payload as string
      }

    default:
      return state
  }
}

export default countriesReducer
