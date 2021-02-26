import axios from 'axios'

export interface ResponseCountryDto {
  name: string
  callingCodes: string[]
}

export const countryService = {
  fetchAll: async () => {
    const { data } = await axios.get<ResponseCountryDto[]>(
      'https://restcountries.eu/rest/v2/all'
    )
    return data
  }
}
