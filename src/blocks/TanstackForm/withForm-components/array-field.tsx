'use client'

import { withForm } from '../hooks/form'
import type { ArrayFormField, Form } from '@/payload-types'
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getDefaultValuesOpts } from '../form-options'

export const ArrayFieldComponent = ({
  form,
  field: { fields: arrayFields, description, name: fieldName, label, title },
  fields,
}: {
  form: any
  field: ArrayFormField
  fields: Form['fields']
}) => {
  const { defaultValues } = getDefaultValuesOpts(fields)

  const FieldComponent = withForm({
    defaultValues,
    props: {
      field: {
        arrayFields,
        title,
        description,
        fieldName,
        label,
      },
    },
    render: function Render({
      form,
      field: { arrayFields, title, description, fieldName, label },
    }) {
      return (
        <div className="@container col-span-2">
          {(title || description) && (
            <CardHeader className="px-0">
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent className="grid grid-cols-1 gap-4 @md:grid-cols-2 auto-cols-fr px-0">
            {/* Array Field Context */}
            <form.AppField name={fieldName} mode="array">
              {(field) => (
                <div className="space-y-3 col-span-2">
                  {Array.isArray(field.state.value) &&
                    field.state.value.map((_, i) => (
                      // Map through each array item
                      <Card key={i}>
                        <CardHeader className="">
                          <CardDescription>{`${label} ${i + 1}`}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {arrayFields?.map((field) => {
                            // Map through fields for each array item
                            if (field.blockType === 'text') {
                              return (
                                <form.AppField
                                  key={`${fieldName}[${i}].${field.name}`}
                                  name={`${fieldName}[${i}].${field.name}`}
                                  validators={{
                                    onChange: field.required
                                      ? z
                                          .string()
                                          .min(1, `${field.label || field.name} is required`)
                                      : z.string().optional(),
                                  }}
                                >
                                  {(subField) => (
                                    <subField.TextField
                                      {...field}
                                      id={`${fieldName}[${i}].${field.name}`}
                                      name={`${fieldName}[${i}].${field.name}`}
                                    />
                                  )}
                                </form.AppField>
                              )
                            }
                          })}
                        </CardContent>
                      </Card>
                    ))}

                  <Button
                    onClick={() =>
                      field.pushValue(
                        Array.isArray(defaultValues[fieldName]) ? defaultValues[fieldName][0] : {},
                      )
                    }
                    type="button"
                  >
                    Add person
                  </Button>
                </div>
              )}
            </form.AppField>
          </CardContent>
          <CardFooter className="px-0"></CardFooter>
        </div>
      )
    },
  })
  return (
    <FieldComponent
      form={form}
      field={{
        arrayFields,
        description,
        fieldName,
        label,
        title,
      }}
    />
  )
}
