import { LayoutComponent } from 'react-native-navigation'

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

export interface NavigationScreenComponent<T = {}>
  extends React.FC<
    T & {
      componentId: string
    }
  > {
  options?: LayoutComponent['options']
}
