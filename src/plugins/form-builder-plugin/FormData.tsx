import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data?.submissionData as Record<string, any[]>

  // Return early if no form data
  if (!formData) {
    return <div>No submission data available</div>
  }

  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

  return (
    <div className="space-y-6">
      {arrayFields.map(([fieldName, items]) => (
        <div key={fieldName}>
          <h2 className="text-2xl font-bold mb-3 capitalize">{fieldName}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {/* Display name if available, otherwise skip */}
                    {'label' in item && item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {Object.entries(item).map(([key, value]) => (
                    <p key={key} className="">
                      <span className="capitalize">{key}</span>: {value as string}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormData
