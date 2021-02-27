import { useField, useFormikContext } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Modal, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { colors, sizes } from '../../config/theme'
import {
  FormErrorText,
  FormLabel,
  InputProps
} from '../../shared/components/form'
import { formStyles } from '../../shared/components/form-styles'
import ScreenContainer from '../../shared/components/screen-container'
import StyleView, { StyleText } from '../../shared/components/style-view'
import { fetchCountries } from '../../store/countries/countries-actions'
import { useCountries } from '../../store/countries/hooks'

export interface SelectCountryInputProps extends InputProps {
  placeholder?: string
}

export const SelectCountryInput: FC<SelectCountryInputProps> = ({
  name,
  label,
  placeholder = ''
}) => {
  const { t } = useTranslation()
  const [field] = useField(name)
  const form = useFormikContext()
  const dispatch = useDispatch<any>()
  const countries = useCountries()

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
            {field.value ? field.value : t(placeholder)}
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
                    {t('commons.cancel')}
                  </StyleText>
                </TouchableOpacity>
              </StyleView>
              <StyleView flex={1}>
                <StyleText textAlign="center" fontSize={sizes.text.lg}>
                  {t('contacts.selectCountry')}
                </StyleText>
              </StyleView>
              <StyleView flex={1} />
            </StyleView>

            <StyleView paddingVertical={sizes.spacing.lg}>
              <TextInput
                style={formStyles.textInput}
                placeholder={t('contacts.searchCountry')}
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
                <StyleText fontSize={sizes.text.xxl}>
                  {t('commons.noData')}
                </StyleText>
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
