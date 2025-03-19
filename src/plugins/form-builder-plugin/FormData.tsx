import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { DefaultValues } from '@/blocks/TanstackForm/form-options'
import { convertLexicalNodesToJSX } from '@payloadcms/richtext-lexical/react'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const formData = data?.submissionData as DefaultValues

  // Return early if no form data
  if (!formData) {
    return <div>No submission data available</div>
  }

  const topLevelFields = Object.entries(formData).filter(([_, value]) => !Array.isArray(value))
  const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))
  console.log(arrayFields)

  return (
    <Card>
      <CardContent className="p-6">
        {topLevelFields.map(([key, value]) => (
          <div key={key} className="mb-2">
            <p>
              <span className="font-bold capitalize">{key}: </span>
              <span>{String(value)}</span>
            </p>
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
