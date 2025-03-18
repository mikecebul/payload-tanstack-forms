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
import { RenderFields } from '../render-fields'
import { cn } from '@/utilities/ui'

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
                      <Card
                        key={i}
                        className={cn('', {
                          'p-0 pb-2shadow-none border-none': arrayFields.length < 2,
                        })}
                      >
                        {arrayFields.length > 1 && (
                          <CardHeader className="">
                            <CardDescription>{`${label} ${i + 1}`}</CardDescription>
                          </CardHeader>
                        )}
                        <CardContent
                          className={cn('space-y-3', {
                            'p-0 pb-2': arrayFields.length < 2,
                          })}
                        >
                          {arrayFields?.map((field) => {
                            const newField = { ...field, label: `${field.label} ${i + 1}` }
                            return (
                              <RenderFields
                                key={field.id}
                                field={arrayFields.length < 2 ? newField : field}
                                fields={fields}
                                form={form}
                              />
                            )
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
