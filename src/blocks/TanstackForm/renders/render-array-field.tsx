import type { DefaultValues } from '../hooks/use-form-opts'
import type { DynamicFormType } from '../hooks/use-dynamic-form'
import { RenderFields } from './render-fields-with-validation'

import type { ArrayFormField } from '@/payload-types'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export const ArrayFieldComponent = ({
  defaultValues,
  field: { fields: arrayFields, description, name: arrayFieldName, label, title },
  form,
}: {
  defaultValues: DefaultValues
  field: ArrayFormField
  form: DynamicFormType
}) => {
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
        <form.AppField name={arrayFieldName} mode="array">
          {(field) => (
            <div className="space-y-3 col-span-2">
              {Array.isArray(field.state.value) &&
                field.state.value.map((_, i) => (
                  // Map through each array item
                  <Card
                    key={i}
                    className={cn('', {
                      'p-0 shadow-none border-none': arrayFields.length < 2,
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
                        const newField = {
                          ...field,
                          name: `${arrayFieldName}[${i}].${field.name}`,
                          label: arrayFields.length < 2 ? `${field.label} ${i + 1}` : field.label,
                        }
                        return (
                          <RenderFields
                            key={field.id}
                            field={newField}
                            defaultValues={defaultValues}
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
                    Array.isArray(defaultValues[arrayFieldName])
                      ? defaultValues[arrayFieldName][0]
                      : {},
                  )
                }
                type="button"
              >
                Add {label}
              </Button>
            </div>
          )}
        </form.AppField>
      </CardContent>
    </div>
  )
}
