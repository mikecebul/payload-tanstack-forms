'use client'

import { useAppForm } from './hooks/form'
import { defaultValuesOpts } from './default-values'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FormBlock } from '@/payload-types'

export const TanstackFormBlock = ({ form: formFromProps }: FormBlock) => {
  const { fields, submitButtonLabel } = typeof formFromProps !== 'string' ? formFromProps : {}
  const form = useAppForm({
    ...defaultValuesOpts(fields),
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }

        fields?.forEach((field) => {
          if ('required' in field && field?.required && !value[field.name]) {
            errors.fields[field.name] = `${field.label || field.name} is required`
          }
        })

        return errors
      },
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      form.reset()
    },
  })

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tanstack Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fields &&
              fields?.map((field) => {
                if (!field || field.blockType === 'message') return null
                if (field.blockType === 'text') console.log('Width:', field.width)
                return (
                  <form.AppField key={field.id} name={field.name}>
                    {(formField) => (
                      <formField.TextField
                        label={field.label ?? field.name}
                        width={field.width ?? 100}
                      />
                    )}
                  </form.AppField>
                )
              })}
          </CardContent>
          <CardFooter>
            <form.AppForm>
              <form.SubscribeButton label={submitButtonLabel ?? 'Submit'} />
            </form.AppForm>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
