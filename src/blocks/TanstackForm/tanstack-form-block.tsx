'use client'

import { useAppForm } from './hooks/form'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { FormBlock } from '@/payload-types'
import { useState } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import RichText from '@/components/RichText'
import { getDefaultValuesOpts } from './form-options'
import { useStore } from '@tanstack/react-form'
import { RenderFields } from './render-fields'

export const TanstackFormBlock = ({
  form: formFromProps,
  enableIntro,
  introContent,
}: FormBlock) => {
  const {
    confirmationMessage,
    confirmationType,
    fields,
    id: formId,
    redirect,
    submitButtonLabel,
  } = typeof formFromProps !== 'string' ? formFromProps : {}
  const [postError, setPostError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const form = useAppForm({
    ...getDefaultValuesOpts(fields),
    onSubmit: async ({ value: data }) => {
      console.log('Submit data:', data)
      setPostError(undefined)
      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formId,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          setPostError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })

          return
        }

        if (confirmationType === 'redirect' && redirect) {
          const { url } = redirect
          const redirectUrl = url

          if (redirectUrl) router.push(redirectUrl)
        }

        form.reset()
      } catch (err) {
        console.warn(err)
        setPostError({
          message: 'Something went wrong.',
        })
      }
    },
  })
  const [isSubmitSuccessful] = useStore(form.store, (state) => [state.isSubmitSuccessful])

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
                {fields &&
                  fields?.map((field) => (
                    <RenderFields key={field.id} field={field} fields={fields} form={form} />
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
