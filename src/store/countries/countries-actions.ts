import { countryService } from '../../services/country-service'
import { RootThunk } from '..'
import { CountryDto } from './countries-reducer'

export const countriesActionTypes = {
  fetchStarted: 'countires.fetchStarted',
  fetchSuccess: 'countires.fetchSuccess',
  fetchError: 'countires.fetchError'
}

export const fetchCountries = (): RootThunk => async (dispatch, getState) => {
  const state = getState()
  if (state.countries.value.length === 0) {
    try {
      dispatch({ type: countriesActionTypes.fetchStarted })
      const countries = await countryService.fetchAll()
      dispatch({
        type: countriesActionTypes.fetchSuccess,
        payload: countries.map(
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
