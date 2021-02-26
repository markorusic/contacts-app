import { useFormikContext } from 'formik'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { colors, sizes } from '../../config/theme'
import {
  FormLabel,
  FormErrorText,
  InputProps
} from '../../shared/components/form'
import StyleView, { StyleText } from '../../shared/components/style-view'
import { ContactDto } from '../../store/contacts/contacts-reducer'

const GENDER_OPTIONS: ContactDto['gender'][] = ['male', 'female', 'other']

export const SelectGenderInput: FC<InputProps> = ({ name, label }) => {
  const form = useFormikContext<{ gender: ContactDto['gender'] }>()
  return (
    <StyleView>
      <FormLabel>{label}</FormLabel>
      <StyleView flexDirection="row">
        {GENDER_OPTIONS.map(gender => (
          <TouchableOpacity
            key={gender}
            onPress={() => form.setFieldValue(name, gender)}
          >
            <StyleView
              marginRight={sizes.spacing.sm}
              padding={sizes.spacing.md}
              borderRadius={5}
              borderWidth={1}
              borderColor={colors.disabled}
              backgroundColor={
                form.values.gender === gender
                  ? colors.secondaryBg
                  : colors.primaryBg
              }
            >
              <StyleText textTransform="capitalize">{gender}</StyleText>
            </StyleView>
          </TouchableOpacity>
        ))}
      </StyleView>
      <FormErrorText name={name} />
    </StyleView>
  )
}
