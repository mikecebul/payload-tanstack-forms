'use client'

import { DefaultValues } from '../hooks/use-form-opts'
import { RenderFields } from './render-fields'

import type { GroupFormField } from '@/payload-types'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { DynamicFormType } from '../hooks/use-dynamic-form'

export const GroupFieldComponent = ({
  defaultValues,
  field,
  field: { fields: groupFields, description, name, title },
  form,
}: {
  defaultValues: DefaultValues
  field: GroupFormField
  form: DynamicFormType
}) => {
  console.log('Group Field:', field)
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
              parentKey={name}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
