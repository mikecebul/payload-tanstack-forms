'use client'

import { useAppForm } from './hooks/form'
import { defaultValuesOpts } from './form-options'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { FormBlock } from '@/payload-types'
import { useState } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import RichText from '@/components/RichText'
import { z } from 'zod'

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
    ...defaultValuesOpts(fields),
    onSubmit: async ({ value: data }) => {
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

  return (
    <div className="max-w-lg mx-auto">
      {enableIntro && introContent && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <form.Subscribe selector={(state) => [state.isSubmitSuccessful]}>
        {([isSubmitSuccessful]) =>
          isSubmitSuccessful && confirmationType === 'message' && confirmationMessage ? (
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
                  <CardContent className="grid grid-cols-1 gap-4 @lg:grid-cols-2 p-6">
                    {fields &&
                      fields?.map((field) => {
                        switch (field.blockType) {
                          case 'message':
                            return null

                          case 'text':
                            return (
                              <form.AppField
                                key={field.id}
                                name={field.name}
                                validators={{
                                  onChange: field.required
                                    ? z.string().min(1, `${field.label || field.name} is required`)
                                    : z.string().optional(),
                                }}
                              >
                                {(formField) => (
                                  <formField.TextField
                                    label={field.label ?? field.name}
                                    width={field.width ?? 100}
                                    id={field.id ?? field.name}
                                  />
                                )}
                              </form.AppField>
                            )
                          case 'email':
                            return (
                              <form.AppField
                                key={field.id}
                                name={field.name}
                                validators={{
                                  onChange: field.required
                                    ? z.string().min(1, 'Email is required').email()
                                    : z.string().email().optional(),
                                }}
                              >
                                {(formField) => (
                                  <formField.TextField
                                    label={field.label ?? field.name}
                                    width={field.width ?? 100}
                                    id={field.id ?? field.name}
                                  />
                                )}
                              </form.AppField>
                            )
                          case 'phone':
                            return (
                              <form.AppField
                                key={field.id}
                                name={field.name}
                                validators={{
                                  onChange: field.required
                                    ? z
                                        .string()
                                        .min(1, 'Phone number required')
                                        .regex(
                                          /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                          'Invalid phone number',
                                        )
                                    : z
                                        .string()
                                        .regex(
                                          /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                          'Invalid phone number',
                                        )
                                        .optional(),
                                }}
                              >
                                {(formField) => (
                                  <formField.TextField
                                    label={field.label ?? field.name}
                                    width={field.width ?? 100}
                                    id={field.id ?? field.name}
                                  />
                                )}
                              </form.AppField>
                            )
                          case 'textarea':
                            return (
                              <form.AppField
                                key={field.id}
                                name={field.name}
                                validators={{
                                  onChange: field.required
                                    ? z.string().min(1, `${field.label || field.name} is required`)
                                    : z.string().optional(),
                                }}
                              >
                                {(formField) => (
                                  <formField.TextareaField
                                    label={field.label ?? field.name}
                                    width={field.width ?? 100}
                                    id={field.id ?? field.name}
                                  />
                                )}
                              </form.AppField>
                            )
                    
                          default:
                            break
                        }                          
                      })}
                  </CardContent>
                  <CardFooter>
                    <form.AppForm>
                      <form.SubscribeButton label={submitButtonLabel ?? 'Submit'} />
                    </form.AppForm>
                  </CardFooter>
                </Card>
              </form>
            </>
          )
        }
      </form.Subscribe>
    </div>
  )
}
