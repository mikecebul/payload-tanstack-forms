'use client'

import { useAppForm } from './hooks/form'
import { AddressFields } from './address-fields'
import { peopleFormOpts } from './shared-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const TanstackFormBlock = () => {
  const form = useAppForm({
    ...peopleFormOpts,
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }
        if (!value.fullName) {
          errors.fields.fullName = 'Full name is required'
        }
        if (!value.phone) {
          errors.fields.phone = 'Phone is required'
        }
        if (!value.emergencyContact.fullName) {
          errors.fields['emergencyContact.fullName'] = 'Emergency contact full name is required'
        }
        if (!value.emergencyContact.phone) {
          errors.fields['emergencyContact.phone'] = 'Emergency contact phone is required'
        }

        return errors
      },
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tanstack Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <form.AppField name="fullName">
              {(field) => <field.TextField label="Full Name" />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.TextField label="Email" />}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => <field.TextField label="Phone" />}
            </form.AppField>
            <AddressFields form={form} />

            <h2 className="text-lg font-semibold">Emergency Contact</h2>
            <form.AppField name="emergencyContact.fullName">
              {(field) => <field.TextField label="Full Name" />}
            </form.AppField>
            <form.AppField name="emergencyContact.phone">
              {(field) => <field.TextField label="Phone" />}
            </form.AppField>
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
