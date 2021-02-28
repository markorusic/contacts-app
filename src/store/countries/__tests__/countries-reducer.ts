import 'react-native'
import { AsyncStatus } from '../../../shared/types'
import { countriesActionTypes } from '../countries-actions'
import countriesReducer from '../countries-reducer'

describe('countriesReducer', () => {
  it('fetchStarted action type', () => {
    const action = {
      type: countriesActionTypes.fetchStarted
    }
    expect(countriesReducer(undefined, action)).toEqual({
      value: [],
      status: AsyncStatus.loading,
      error: null
    })
  })

  it('fetchError action type', () => {
    const error = 'Fetch error'
    const action = {
      type: countriesActionTypes.fetchError,
      payload: error
    }
    expect(countriesReducer(undefined, action)).toEqual({
      value: [],
      status: AsyncStatus.error,
      error
    })
  })

  it('fetchSuccess action type', () => {
    const value = [{ id: '1', name: 'Country' }]
    const action = {
      type: countriesActionTypes.fetchSuccess,
      payload: value
    }
    expect(countriesReducer(undefined, action)).toEqual({
      value,
      status: AsyncStatus.success,
      error: null
    })
  })
})
