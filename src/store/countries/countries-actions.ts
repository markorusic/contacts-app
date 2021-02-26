import axios from 'axios'
import { RootThunk } from '..'
import { CountryDto } from './countries-reducer'

export const countriesActionTypes = {
  fetchStarted: 'countires.fetchStarted',
  fetchSuccess: 'countires.fetchSuccess',
  fetchError: 'countires.fetchError'
}

interface ResponseCountryDto {
  name: string
  callingCodes: string[]
}

export const fetchCountries = (): RootThunk => async (dispatch, getState) => {
  const state = getState()
  if (state.countries.value.length === 0) {
    try {
      dispatch({ type: countriesActionTypes.fetchStarted })
      const { data } = await axios.get<ResponseCountryDto[]>(
        'https://restcountries.eu/rest/v2/all'
      )
      dispatch({
        type: countriesActionTypes.fetchSuccess,
        payload: data.map(
          (rawCountry, id): CountryDto => ({
            id: id.toString(),
            name: rawCountry.name,
            callingCodes: rawCountry.callingCodes
          })
        )
      })
    } catch (error) {
      dispatch({ type: countriesActionTypes.fetchError, payload: error })
    }
  }
}
