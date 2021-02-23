export enum AsyncStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error'
}

export type AsyncValue<T> = {
  value: T | undefined
  status: AsyncStatus
  error: string | null
}
