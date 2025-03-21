'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'
import { Checkbox } from '@/components/ui/checkbox'

export default function CheckboxField({
  id,
  label,
  width = 100,
}: {
  id: string
  label: string
  width: number
}) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div
      className={cn('col-span-2 flex flex-col justify-start', { '@md:col-span-1': width === 50 })}
    >
      <div className={cn('flex items-center space-x-2')}>
        <Checkbox
          id={id}
          checked={field.state.value ?? false}
          onBlur={() => field.handleBlur()}
          onCheckedChange={(checked) => field.handleChange(!!checked)}
        />
        <Label htmlFor={id}>{label}</Label>
      </div>
      <div>{errors && <em className="text-destructive first:mt-1 text-sm">{errors[0]}</em>}</div>
    </div>
  )
}
