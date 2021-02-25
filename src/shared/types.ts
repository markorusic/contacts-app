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

export type Action<T = string, K = unknown> = {
  type: T
  payload?: K
}
