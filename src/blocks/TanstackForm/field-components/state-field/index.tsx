'use client'

import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '../../hooks/form-context'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'
import type { StateFormField } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { stateOptions } from './options'

export default function StateField({ id, label, name, width }: StateFormField) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={cn('col-span-2', { '@md:col-span-1': width === 50 })}>
      <div className={cn('grid gap-2 w-full')}>
        <Label htmlFor={id ?? name}>{label}</Label>
        <Select onValueChange={(e) => field.handleChange(e)}>
          <SelectTrigger id={id ?? name}>
            <SelectValue placeholder="Pick a state" />
          </SelectTrigger>
          <SelectContent>
            {stateOptions.map(({ label, value }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        {errors && <em className="text-destructive first:mt-1 text-sm">{errors[0]?.message}</em>}
      </div>
    </div>
  )
}
