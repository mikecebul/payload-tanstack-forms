'use client'

import { withForm } from '../hooks/form'
import type { ArrayFormField, Form, GroupFormField } from '@/payload-types'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getDefaultValuesOpts } from '../form-options'
import { RenderFields } from '../render-fields'

export const GroupFieldComponent = ({
  form,
  field: { fields: groupFields, description, title },
  fields,
}: {
  form: any
  field: GroupFormField
  fields: Form['fields']
}) => {
  const { defaultValues } = getDefaultValuesOpts(fields)

  const FieldComponent = withForm({
    defaultValues,
    props: {
      field: {
        groupFields,
        title,
        description,
      },
    },
    render: function Render({ form, field: { groupFields, title, description } }) {
      return (
        <div className="@container col-span-2">
          <Card className="border-none shadow-none">
            {(title || description) && (
              <CardHeader className="px-0">
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </CardHeader>
            )}
            <CardContent className="grid grid-cols-1 gap-4 @md:grid-cols-2 auto-cols-fr px-0">
              {/* Array Field Context */}
              {groupFields?.map((field) => (
                <RenderFields key={field.id} field={field} fields={fields} form={form} />
              ))}
            </CardContent>
          </Card>
        </div>
      )
    },
  })
  return (
    <FieldComponent
      form={form}
      field={{
        groupFields,
        description,
        title,
      }}
    />
  )
}
