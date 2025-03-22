'use client'

import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'
import TextareaField from '../field-components/textarea-field'
import TextField from '../field-components/text-field'
import CheckboxField from '../field-components/checkbox-field'
import NumberField from '../field-components/number-field'
import EmailField from '../field-components/email-field'
import PhoneField from '../field-components/phone-field'
import SubscribeButton from '../form-components/subscribe-button'
import StateField from '../field-components/state-field'
import CountryField from '../field-components/country-field'
import SelectField from '../field-components/select-field'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
    CheckboxField,
    NumberField,
    EmailField,
    PhoneField,
    StateField,
    CountryField,
    SelectField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
