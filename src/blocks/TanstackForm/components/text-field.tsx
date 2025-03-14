'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'

export default function TextField({ label, width = 100 }: { label: string; width: number }) {
  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div>
      <div className={cn('grid gap-2 @max-3xs:bg-red-500')}>
        <Label htmlFor={label}>{label}</Label>
        <Input
          id={label}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      {errors.map((error: string) => (
        <em key={error} className="text-destructive mt-1">
          {error}
        </em>
      ))}
    </div>
  )
}
