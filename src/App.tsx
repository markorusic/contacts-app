import React from 'react'
import { SafeAreaView } from 'react-native'
import ContactList from './components/contact-list'
import ContactProvider from './components/contact-provider'
import { colors } from './config/theme'

const App = () => {
  return (
    <ContactProvider>
      <SafeAreaView style={{ backgroundColor: colors.primaryBg }}>
        <ContactList />
      </SafeAreaView>
    </ContactProvider>
  )
}

export default App
