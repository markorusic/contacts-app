import { range } from 'lodash'
import 'react-native'
import { countryService } from '../../../services/country-service'
import { AsyncStatus } from '../../../shared/types'
import { countriesActionTypes, fetchCountries } from '../countries-actions'

jest.mock('../../../services/country-service', () => ({
  countryService: { fetchAll: jest.fn() }
}))
const mockedCountryServiceFetchAll = countryService.fetchAll as jest.Mock

describe('countries action creators', () => {
  it('fetchCountries success', async () => {
    const dispatch = jest.fn()

    mockedCountryServiceFetchAll.mockImplementation(async () =>
      range(0, 10).map(i => ({
        name: `Country ${i}`,
        callingCodes: [i + i + i]
      }))
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await fetchCountries()(dispatch, () => ({
      countries: { value: [], status: AsyncStatus.idle, error: null }
    }))

    expect(countryService.fetchAll).toBeCalledTimes(1)
    expect(dispatch).toBeCalledTimes(2)

    expect(dispatch.mock.calls[0][0].type).toBe(
      countriesActionTypes.fetchStarted
    )
    expect(dispatch.mock.calls[1][0].type).toBe(
      countriesActionTypes.fetchSuccess
    )
    expect(dispatch.mock.calls[1][0].payload.length).toBeGreaterThan(0)
    expect(dispatch.mock.calls[1][0].payload[0].id).toBeTruthy()
  })

  it('fetchCountries error', async () => {
    const error = 'Error'
    const dispatch = jest.fn()

    mockedCountryServiceFetchAll.mockImplementation(() => Promise.reject(error))

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await fetchCountries()(dispatch, () => ({
      countries: { value: [], status: AsyncStatus.idle, error: null }
    }))

    expect(countryService.fetchAll).toBeCalledTimes(1)
    expect(dispatch).toBeCalledTimes(2)

    expect(dispatch.mock.calls[0][0].type).toBe(
      countriesActionTypes.fetchStarted
    )
    expect(dispatch.mock.calls[1][0].type).toBe(countriesActionTypes.fetchError)
    expect(dispatch.mock.calls[1][0].payload).toBe(error)
  })

  it('fetchCountries when already cached', async () => {
    const dispatch = jest.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await fetchCountries()(dispatch, () => ({
      countries: {
        value: [{ id: '1', name: 'Country' }],
        status: AsyncStatus.idle,
        error: null
      }
    }))

    expect(countryService.fetchAll).not.toBeCalled()
    expect(dispatch).not.toBeCalled()
  })
})
