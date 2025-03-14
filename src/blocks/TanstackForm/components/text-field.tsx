'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../hooks/form-context'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor={label}>{label}</Label>
        <Input
          id={label}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      {errors.map((error: string) => (
        <em key={error} className="text-destructive">
          {error}
        </em>
      ))}
    </div>
  )
}
