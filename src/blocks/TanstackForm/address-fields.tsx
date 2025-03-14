'use client'

import { withForm } from './hooks/form'
import { peopleFormOpts } from './shared-form'

export const AddressFields = withForm({
  ...peopleFormOpts,
  render: ({ form }) => {
    return (
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Address</h2>
        <form.AppField name="address.line1">
          {(field) => <field.TextField label="Address Line 1" />}
        </form.AppField>
        <form.AppField name="address.line2">
          {(field) => <field.TextField label="Address Line 2" />}
        </form.AppField>
        <form.AppField name="address.city">
          {(field) => <field.TextField label="City" />}
        </form.AppField>
        <form.AppField name="address.state">
          {(field) => <field.TextField label="State" />}
        </form.AppField>
        <form.AppField name="address.zip">
          {(field) => <field.TextField label="ZIP Code" />}
        </form.AppField>
      </div>
    )
  },
})
