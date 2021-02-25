export enum AsyncStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error'
}

export type AsyncValue<T> = {
  value: T
  status: AsyncStatus
  error: string | null
}

export const getInitialAsyncValue = <T>(value: T): AsyncValue<T> => ({
  value,
  status: AsyncStatus.idle,
  error: null
})

export const getAsyncActionCreators = (key: string) => ({
  fetchStarted: `${key}.fetchStarted`,
  fetchSuccess: `${key}.fetchSuccess`,
  fetchError: `${key}.fetchError`
})
