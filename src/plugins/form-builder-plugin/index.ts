import type { Field, Plugin } from 'payload'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { fields } from '@/plugins/form-builder-plugin/fields'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const customFormBuilderPlugin: Plugin = formBuilderPlugin({
  fields: {
    array: fields.array,
    checkbox: fields.checkbox,
    country: fields.country,
    email: fields.email,
    group: fields.group,
    message: fields.message,
    number: fields.number,
    payment: false,
    phone: fields.phone,
    select: fields.select,
    state: fields.state,
    text: fields.text,
    textarea: fields.textarea,
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'confirmationMessage') {
          return {
            ...field,
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                ]
              },
            }),
          }
        }
        return field
      })
    },
  },
  formSubmissionOverrides: {
    admin: {
      useAsTitle: 'createdAt',
    },
    fields: ({ defaultFields }) => {
      const formField = defaultFields.find((field) => 'name' in field && field.name === 'form')
      const submissionData = defaultFields.find(
        (field) => 'name' in field && field.name === 'submissionData',
      )
      return [
        ...(formField ? [formField] : []),
        {
          name: 'formType',
          type: 'text',
          admin: {
            hidden: true,
          },
        },
        ...(submissionData
          ? [
              {
                ...submissionData,
                admin: {
                  ...(submissionData.admin ?? {}),
                  hidden: true,
                },
              } as Field,
            ]
          : []),
        {
          name: 'jsonData',
          type: 'json',
          admin: {
            components: {
              Field: '@/plugins/form-builder-plugin/components/FormData',
            },
          },
        },
      ]
    },
  },
})
