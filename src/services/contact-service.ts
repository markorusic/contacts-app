import { capitalize, random, range, times } from 'lodash'

export interface ContactDto {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  zipCode: string
}

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
export const contactService = {
  fetchAll: async (): Promise<ContactDto[]> =>
    wait(1000).then(() =>
      range(0, 100).map(id => ({
        id: id.toString(),
        firstName: capitalize(
          times(5, () => alphabet[random(1, alphabet.length - 1)]).join('')
        ),
        lastName: `Last ${id}`,
        phoneNumber: `${id}-${id}-${id}`,
        zipCode: `zip code ${id}-${id}-${id}`
      }))
    )
}
