import { DefaultValues, FormField } from './form-options'
import { withForm } from './hooks/form'
import { z } from 'zod'
import { ArrayFieldComponent } from './withForm-components/array-field'
import { GroupFieldComponent } from './withForm-components/group-field'

export const RenderFields = ({
  field,
  defaultValues,
  form,
}: {
  field: FormField
  defaultValues: DefaultValues
  form: any
}) => {
  const FieldComponent = withForm({
    defaultValues,
    props: {
      field,
    },
    render: function Render({ form, field }) {
      switch (field.blockType) {
        case 'message':
          return <></>
        case 'text':
          return (
            <form.AppField
              key={field.id}
              name={field.name}
              validators={{
                onChange: field.required
                  ? z.string().min(1, `${field.label || field.name} is required`)
                  : z.string().optional(),
              }}
            >
              {(formField) => <formField.TextField {...field} />}
            </form.AppField>
          )
        case 'email':
          return (
            <form.AppField
              key={field.id}
              name={field.name}
              validators={{
                onChange: field.required
                  ? z.string().min(1, 'Email is required').email()
                  : z.string().email().optional(),
              }}
            >
              {(formField) => <formField.EmailField {...field} />}
            </form.AppField>
          )
        case 'phone':
          return (
            <form.AppField
              key={field.id}
              name={field.name}
              validators={{
                onChange: field.required
                  ? z
                      .string()
                      .min(1, 'Phone number required')
                      .regex(
                        /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                        'Invalid phone number',
                      )
                  : z
                      .string()
                      .regex(
                        /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                        'Invalid phone number',
                      )
                      .optional(),
              }}
            >
              {(formField) => <formField.PhoneField {...field} />}
            </form.AppField>
          )
        case 'textarea':
          return (
            <form.AppField
              key={field.id}
              name={field.name}
              validators={{
                onChange: field.required
                  ? z.string().min(1, `${field.label || field.name} is required`)
                  : z.string().optional(),
              }}
            >
              {(formField) => (
                <formField.TextareaField
                  label={field.label ?? field.name}
                  width={field.width ?? 100}
                  id={field.id ?? field.name}
                />
              )}
            </form.AppField>
          )
        case 'checkbox':
          return (
            <form.AppField
              key={field.id}
              name={field.name}
              validators={{
                onChange: ({ value }) =>
                  field.required && Boolean(value) === false
                    ? field.errorMsg?.length
                      ? field.errorMsg
                      : 'Must check to continue'
                    : undefined,
              }}
            >
              {(formField) => (
                <formField.CheckboxField
                  label={field.label ?? field.name}
                  width={field.width ?? 100}
                  id={field.id ?? field.name}
                />
              )}
            </form.AppField>
          )
        case 'number':
          return (
            <form.AppField
              key={field.id}
              name={field.name}
              validators={{
                onChange: field.required
                  ? z.coerce
                      .number()
                      .positive(`${field.label || field.name} must be a positive number`)
                  : z.coerce
                      .number()
                      .positive(`${field.label || field.name} must be a positive number`)
                      .or(z.literal(undefined))
                      .optional(),
              }}
            >
              {(formField) => (
                <formField.NumberField
                  label={field.label ?? field.name}
                  width={field.width ?? 100}
                  id={field.id ?? field.name}
                />
              )}
            </form.AppField>
          )
        case 'array':
          return (
            <ArrayFieldComponent
              key={field.id}
              form={form}
              field={field}
              defaultValues={defaultValues}
            />
          )
        case 'group':
          return (
            <GroupFieldComponent
              key={field.id}
              form={form}
              field={field}
              defaultValues={defaultValues}
            />
          )
        default:
          return <></>
      }
    },
  })
  return <FieldComponent form={form} field={field} />
}
