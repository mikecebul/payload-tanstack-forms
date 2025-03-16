'use client'

import { withForm } from '../hooks/form'
import { defaultValuesOpts, FormField } from '../form-options'
import { useFieldContext } from '../hooks/form-context'
import { useStore } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import { Form } from '@/payload-types'

export const ExampleFieldComponent = ({
  field,
  form,
  fields,
}: {
  field: FormField
  form: any
  fields: Form['fields']
}) => {
  const FieldComponent = withForm({
    ...defaultValuesOpts(fields),
    props: {
      field,
    },
    render: function Render({ form, field }) {
      if (field.blockType !== 'text') return <></>
      return (
        <form.AppField name={field.name}>
          {(formField) => (
            <formField.TextField
              label={field.label ?? field.name}
              width={field.width ?? 100}
              id={field.id ?? field.name}
            />
          )}
        </form.AppField>
      )
    },
  })
  return <FieldComponent field={field} form={form} />
}

export function ExampleField({
  id,
  label,
  width = 100,
}: {
  id: string
  label: string
  width: number
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errorMap['onChange'])

  return (
    <div className={cn('col-span-2', { '@md:col-span-1': width === 50 })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="text"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <div>
        {errors && <em className="text-destructive first:mt-1 text-sm">{errors[0].message}</em>}
      </div>
    </div>
  )
}
