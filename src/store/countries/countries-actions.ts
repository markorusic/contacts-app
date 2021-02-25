import axios from 'axios'
import { RootThunk } from '..'

export const countriesActionTypes = {
  fetchStarted: 'countires.fetchStarted',
  fetchSuccess: 'countires.fetchSuccess',
  fetchError: 'countires.fetchError'
}

interface RawCountryDto {
  name: string
}

export const fetchCountries = (): RootThunk => async (dispatch, getState) => {
  const state = getState()
  if (state.countries.value.length === 0) {
    try {
      dispatch({ type: countriesActionTypes.fetchStarted })
      const { data } = await axios.get<RawCountryDto[]>(
        'https://restcountries.eu/rest/v2/all'
      )
      dispatch({
        type: countriesActionTypes.fetchSuccess,
        payload: data.map((rawCountry, id) => ({
          id: id.toString(),
          name: rawCountry.name
        }))
      })
    } catch (error) {
      dispatch({ type: countriesActionTypes.fetchError, payload: error })
    }
  }
}
