import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { DefaultValues } from '@/blocks/TanstackForm/hooks/use-form-opts'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data?.jsonData as DefaultValues

  if (!formData) {
    return <div>No json data available</div>
  }
  const groupFields = Object.entries(formData).filter(
    ([_, value]) => typeof value === 'object' && !Array.isArray(value),
  )
  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))
  const individualFields = Object.entries(formData).filter(
    ([_, value]) => typeof value !== 'object' && !Array.isArray(value),
  )

  return (
    <Card className="">
      <CardContent className="p-6 space-y-4">
        <div>
          {individualFields.map(([key, value]) => (
            <div key={key} className="mb-2">
              <p>
                <span className="font-bold capitalize">{key}: </span>
                <span>{String(value)}</span>
              </p>
            </div>
          ))}
        </div>
        {groupFields.map(([fieldName, groupValue], index) => (
          <div key={`${fieldName}${index}`}>
            <h2 className="text-2xl font-bold pt-5 pb-2 capitalize">{fieldName}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="space-y-1 p-6">
                  {Object.entries(groupValue as Record<string, any>).map(([key, value]) => (
                    <p key={key} className="">
                      <span className="font-bold capitalize">{key}</span>:{' '}
                      <span>{String(value)}</span>
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        {arrayFields.map(([fieldName, items], index) => (
          <div key={`${fieldName}${index}`}>
            <h2 className="text-2xl font-bold pt-5 pb-2 capitalize">{fieldName}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {Array.isArray(items) &&
                items.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="space-y-1 p-6">
                      {Object.entries(item).map(([key, value]) => (
                        <p key={key} className="">
                          <span className="font-bold capitalize">{key}</span>:{' '}
                          <span>{String(value)}</span>
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default FormData
