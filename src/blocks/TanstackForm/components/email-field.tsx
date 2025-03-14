'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'

export default function EmailField({
  id,
  label,
  width = 100,
}: {
  id: string
  label: string
  width: number
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errorMap['onChange'])

  return (
    <div className={cn('col-span-2', { 'col-span-1': width === 50 })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="email"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <div>
        {errors &&
          errors.length > 0 &&
          errors.map((error: any) => (
            <em key={error.code} className="text-destructive first:mt-1 text-sm block">
              {error.message}
            </em>
          ))}
      </div>
    </div>
  )
}
