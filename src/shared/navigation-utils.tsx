import React, { FC } from 'react'
import { LayoutComponent, Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../store'

export const registerComponent = <T,>(
  componentId: string,
  Component: FC<T>
) => {
  Navigation.registerComponent(
    componentId,
    () => props => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Component
  )
}

export type NavigationScreenComponent<T = {}> = FC<
  T & {
    componentId: string
  }
> & {
  options?: LayoutComponent['options']
}
