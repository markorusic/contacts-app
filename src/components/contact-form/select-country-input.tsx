import { useField, useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, Modal, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, sizes } from '../../config/theme'
import {
  FormErrorText,
  FormLabel,
  InputProps
} from '../../shared/components/form'
import { formStyles } from '../../shared/components/form-styles'
import ScreenContainer from '../../shared/components/screen-container'
import StyleView, { StyleText } from '../../shared/components/style-view'
import { RootState } from '../../store'
import { fetchCountries } from '../../store/countries/countries-actions'

export interface SelectCountryInputProps extends InputProps {
  placeholder?: string
}

export const SelectCountryInput: FC<SelectCountryInputProps> = ({
  name,
  label,
  placeholder = 'Select Country'
}) => {
  const [field] = useField(name)
  const form = useFormikContext()
  const dispatch = useDispatch<any>()
  const countries = useSelector((state: RootState) => state.countries.value)

  const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  useEffect(() => {
    setSearchText('')
  }, [showModal])

  return (
    <StyleView>
      <FormLabel>{label}</FormLabel>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <StyleView {...formStyles.textInput} justifyContent="center">
          <StyleText color={field.value ? colors.primaryText : colors.disabled}>
            {field.value ? field.value : placeholder}
          </StyleText>
        </StyleView>
      </TouchableOpacity>
      <FormErrorText name={name} />

      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ScreenContainer
          paddingHorizontal={sizes.spacing.xl}
          paddingVertical={sizes.spacing.lg}
        >
          <StyleView>
            <StyleView
              flexDirection="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <StyleView flex={1}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <StyleText
                    fontSize={sizes.text.md}
                    color={colors.secondaryText}
                  >
                    Cancel
                  </StyleText>
                </TouchableOpacity>
              </StyleView>
              <StyleView flex={1}>
                <StyleText textAlign="center" fontSize={sizes.text.lg}>
                  Select country
                </StyleText>
              </StyleView>
              <StyleView flex={1} />
            </StyleView>

            <StyleView paddingVertical={sizes.spacing.lg}>
              <TextInput
                style={formStyles.textInput}
                placeholder="Search for country"
                value={searchText}
                onChangeText={value => setSearchText(value)}
              />
            </StyleView>
          </StyleView>
          <FlatList
            key="id"
            data={countries.filter(country =>
              country.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            // TODO: make empty list message component and reuse here and for ContactsScreen
            ListEmptyComponent={
              <StyleView justifyContent="center" alignItems="center">
                <StyleText fontSize={sizes.text.xxl}>No data</StyleText>
              </StyleView>
            }
            renderItem={({ item }) => (
              <StyleView>
                <TouchableOpacity
                  onPress={() => {
                    form.setFieldValue(name, item.name)
                    setShowModal(false)
                  }}
                >
                  <StyleView
                    padding={sizes.spacing.lg}
                    marginBottom={sizes.spacing.sm}
                    borderRadius={5}
                    backgroundColor={
                      item.name === field.value
                        ? colors.secondaryBg
                        : colors.primaryBg
                    }
                  >
                    <StyleText>{item.name}</StyleText>
                  </StyleView>
                </TouchableOpacity>
              </StyleView>
            )}
          />
        </ScreenContainer>
      </Modal>
    </StyleView>
  )
}
