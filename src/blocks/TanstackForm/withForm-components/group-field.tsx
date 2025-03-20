'use client'

import type { AnyFormApi } from '@tanstack/react-form'
import { withForm } from '../hooks/form'
import { DefaultValues } from '../form-options'
import { RenderFields } from '../render-fields'

import type { GroupFormField } from '@/payload-types'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const GroupFieldComponent = ({
  defaultValues,
  field: { fields: groupFields, description, title },
  form,
}: {
  defaultValues: DefaultValues
  field: GroupFormField
  form: AnyFormApi | any
}) => {
  console.log('Default Values:', defaultValues)
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
                <RenderFields
                  key={field.id}
                  field={field}
                  defaultValues={defaultValues}
                  form={form}
                />
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
