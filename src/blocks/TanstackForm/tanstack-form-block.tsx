'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { FormBlock } from '@/payload-types'
import { useState } from 'react'
import RichText from '@/components/RichText'
import { useStore } from '@tanstack/react-form'
import { RenderFields } from './renders/render-fields'
import { useDynamicForm } from './hooks/use-dynamic-form'

export const TanstackFormBlock = ({ form: payloadForm, enableIntro, introContent }: FormBlock) => {
  const { confirmationMessage, confirmationType, fields, submitButtonLabel } =
    typeof payloadForm !== 'string' ? payloadForm : {}
  const [postError, setPostError] = useState<{ message: string; status?: string } | undefined>()

  const { form, defaultValues } = useDynamicForm({ payloadForm, setPostError })
  const [isSubmitSuccessful] = useStore(form.store, (state) => [state.isSubmitSuccessful])

  console.log('Default vaules:', defaultValues)

  return (
    <div className="max-w-2xl mx-auto">
      {enableIntro && introContent && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      {isSubmitSuccessful && !postError && confirmationType === 'message' && confirmationMessage ? (
        <RichText data={confirmationMessage} />
      ) : (
        <>
          {postError && <div>{`${postError.status || '500'}: ${postError.message || ''}`}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <Card className="@container">
              <CardContent className="grid grid-cols-1 gap-4 @lg:grid-cols-2 p-6 auto-cols-fr">
                {fields?.map((field) => (
                  <RenderFields
                    key={field.id}
                    field={field}
                    defaultValues={defaultValues}
                    form={form}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <form.AppForm>
                  <form.SubscribeButton label={submitButtonLabel ?? 'Submit'} />
                </form.AppForm>
              </CardFooter>
            </Card>
          </form>
        </>
      )}
    </div>
  )
}
