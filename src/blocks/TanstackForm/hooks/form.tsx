'use client'

import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext, useFormContext } from './form-context'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import TextareaField from '../components/textarea-field'
import TextField from '../components/text-field'
import CheckboxField from '../components/checkbox-field'
import NumberField from '../components/number-field'
// import { ExampleFieldComponent, ExampleField } from '../components/example-field-component'

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button className="w-full" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
    CheckboxField,
    NumberField,
  },
  formComponents: {
    SubscribeButton,
    // TextFieldComponent,
  },
  fieldContext,
  formContext,
})

export const ChildForm = withForm({
  defaultValues: {
    firstName: 'John',
    lastName: 'Doe',
  },
  // Optional, but adds props to the `render` function in addition to `form`
  props: {
    // These props are also set as default values for the `render` function
    title: 'Child Form',
  },
  render: function Render({ form, title }) {
    return (
      <div>
        <p>{title}</p>
        <form.AppField name="firstName">
          {(field) => <field.TextField id="123" width={100} label="First Name" />}
        </form.AppField>
        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </div>
    )
  },
})
