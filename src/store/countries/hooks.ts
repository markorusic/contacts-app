import { useSelector } from 'react-redux'
import { RootState } from '..'

export const useCountries = (name?: string) =>
  useSelector((state: RootState) =>
    state.countries.value.filter(country =>
      name ? country.name.toLowerCase().includes(name.toLowerCase()) : true
    )
  )
