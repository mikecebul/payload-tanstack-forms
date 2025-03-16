'use client'

import { withForm } from '../hooks/form'
import { defaultValuesOpts } from '../form-options'
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

export const ArrayFieldComponent = ({
  form,
  field: { fields: arrayFields, description, name: fieldName, label, title },
}: {
  form: any
  field: ArrayFormField
}) => {
  const { defaultValues } = defaultValuesOpts(arrayFields)

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
            <form.AppField name={fieldName} mode="array">
              {(field) => {
                // console.log('field:', field.form.options.defaultValues)
                return (
                  <div className="space-y-3">
                    {Array.isArray(field.state.value) &&
                      field.state.value.map((fieldStateValue, i) => {
                        // console.log("Field state value:", fieldStateValue)
                        return (
                          <Card key={`people${i}`}>
                            <CardHeader className="">
                              <CardDescription>{`${label} ${i++}`}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {arrayFields?.map((field) => {
                                // console.log('field.name:', 'name' in field && field.name)
                                if (field.blockType === 'text') {
                                  // const arrayFieldName = field.name
                                  return (
                                    <form.AppField
                                      key={`people[${i}].${field.name}`}
                                      name={`people[${i}].${field.name}`}
                                      validators={{
                                        onChange: field.required
                                          ? z
                                              .string()
                                              .min(1, `${field.label || field.name} is required`)
                                          : z.string().optional(),
                                      }}
                                    >
                                      {(subField) => {
                                        return (
                                          <subField.TextField
                                            label={field.label ?? field.name}
                                            width={field.width ?? 100}
                                            id={field.id ?? field.name}
                                          />
                                        )
                                      }}
                                    </form.AppField>
                                  )
                                }
                              })}
                            </CardContent>
                          </Card>
                        )
                      })}

                    <Button
                      onClick={() =>
                        // @ts-expect-error
                        field.pushValue(defaultValues)
                      }
                      type="button"
                    >
                      Add person
                    </Button>
                  </div>
                )
              }}
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
