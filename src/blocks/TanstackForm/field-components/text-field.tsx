'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import { TextFormField } from '@/payload-types'

export default function TextField({ id, label, name, width }: TextFormField) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errorMap['onChange'])

  return (
    <div className={cn('col-span-2', { '@md:col-span-1': width === 50 })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={id ?? name}>{label}</Label>
        <Input
          id={id ?? name}
          type="text"
          value={field.state.value}
          onBlur={() => field.handleBlur()}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <div>
        {errors && <em className="text-destructive first:mt-1 text-sm">{errors[0].message}</em>}
      </div>
    </div>
  )
}
