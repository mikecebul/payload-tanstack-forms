import type { Block, Field } from 'payload'
import { PaymentFieldConfig } from '@payloadcms/plugin-form-builder/types'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}

const Select: Block = {
  slug: 'select',
  interfaceName: 'SelectFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    {
      name: 'options',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%',
              },
              label: 'Label',
              localized: true,
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              admin: {
                width: '50%',
              },
              label: 'Value',
              required: true,
            },
          ],
        },
      ],
      label: 'Select Attribute Options',
      labels: {
        plural: 'Options',
        singular: 'Option',
      },
    },
    required,
  ],
  labels: {
    plural: 'Select Fields',
    singular: 'Select',
  },
}

const Text: Block = {
  slug: 'text',
  interfaceName: 'TextFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Text Fields',
    singular: 'Text',
  },
}

const Textarea: Block = {
  slug: 'textarea',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Text Area Fields',
    singular: 'Text Area',
  },
}

const Number: Block = {
  slug: 'number',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'number',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
        },
      ],
    },
    required,
  ],
  labels: {
    plural: 'Number Fields',
    singular: 'Number',
  },
}

const Email: Block = {
  slug: 'email',
  interfaceName: 'EmailFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    width,
    required,
  ],
  labels: {
    plural: 'Email Fields',
    singular: 'Email',
  },
}

const State: Block = {
  slug: 'state',
  interfaceName: 'StateFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    width,
    required,
  ],
  labels: {
    plural: 'State Fields',
    singular: 'State',
  },
}

const Country: Block = {
  slug: 'country',
  interfaceName: 'CountryFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    width,
    required,
  ],
  labels: {
    plural: 'Country Fields',
    singular: 'Country',
  },
}

const Checkbox: Block = {
  slug: 'checkbox',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'errorMsg',
          type: 'text',
          label: 'Error Message',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'defaultValue',
          type: 'checkbox',
          label: 'Default Value',
          admin: {
            width: '33%',
          },
        },
        {
          ...required,
          admin: {
            width: '33%',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Checkbox Fields',
    singular: 'Checkbox',
  },
}

const Payment = (fieldConfig: PaymentFieldConfig): Block => {
  let paymentProcessorField = null
  if (fieldConfig?.paymentProcessor) {
    paymentProcessorField = {
      name: 'paymentProcessor',
      type: 'select',
      label: 'Payment Processor',
      options: [],
      ...fieldConfig.paymentProcessor,
    }
  }

  const fields = {
    slug: 'payment',
    fields: [
      {
        type: 'row',
        fields: [
          {
            ...name,
            admin: {
              width: '50%',
            },
          },
          {
            ...label,
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            ...width,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'basePrice',
            type: 'number',
            admin: {
              width: '50%',
            },
            label: 'Base Price',
          },
        ],
      },
      paymentProcessorField,
      {
        name: 'priceConditions',
        type: 'array',
        fields: [
          {
            name: 'fieldToUse',
            type: 'text',
            admin: {
              components: {
                Field: '@payloadcms/plugin-form-builder/client#DynamicFieldSelector',
              },
            },
          },
          {
            name: 'condition',
            type: 'select',
            defaultValue: 'hasValue',
            label: 'Condition',
            options: [
              {
                label: 'Has Any Value',
                value: 'hasValue',
              },
              {
                label: 'Equals',
                value: 'equals',
              },
              {
                label: 'Does Not Equal',
                value: 'notEquals',
              },
            ],
          },
          {
            name: 'valueForCondition',
            type: 'text',
            admin: {
              condition: (_: any, { condition }: any) =>
                condition === 'equals' || condition === 'notEquals',
            },
            label: 'Value',
          },
          {
            name: 'operator',
            type: 'select',
            defaultValue: 'add',
            options: [
              {
                label: 'Add',
                value: 'add',
              },
              {
                label: 'Subtract',
                value: 'subtract',
              },
              {
                label: 'Multiply',
                value: 'multiply',
              },
              {
                label: 'Divide',
                value: 'divide',
              },
            ],
          },
          {
            name: 'valueType',
            type: 'radio',
            admin: {
              width: '100%',
            },
            defaultValue: 'static',
            label: 'Value Type',
            options: [
              {
                label: 'Static Value',
                value: 'static',
              },
              {
                label: 'Value Of Field',
                value: 'valueOfField',
              },
            ],
          },
          {
            name: 'valueForOperator',
            type: 'text',
            admin: {
              components: {
                Field: '@payloadcms/plugin-form-builder/client#DynamicPriceSelector',
              },
            },
            label: 'Value',
          },
        ],
        label: 'Price Conditions',
        labels: {
          plural: 'Price Conditions',
          singular: 'Price Condition',
        },
      },
      required,
    ].filter(Boolean) as Field[],
    labels: {
      plural: 'Payment Fields',
      singular: 'Payment',
    },
  }

  return fields
}

const Message: Block = {
  slug: 'message',
  fields: [
    {
      name: 'message',
      type: 'richText',
      localized: true,
    },
  ],
  labels: {
    plural: 'Message Blocks',
    singular: 'Message',
  },
}

const Phone: Block = {
  slug: 'phone',
  interfaceName: 'PhoneFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    width,
    required,
  ],
  labels: {
    plural: 'Phone Fields',
    singular: 'Phone',
  },
}

export const ArrayBlock: Block = {
  slug: 'array',
  interfaceName: 'ArrayFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Array Item Label',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Array Title',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Array Description',
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          defaultValue: 100,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'minRows',
          type: 'number',
          label: 'Minimum Rows',
          required: true,
          defaultValue: 1,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'maxRows',
          type: 'number',
          label: 'Maximum Rows',
          required: true,
          defaultValue: 4,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      type: 'blocks',
      name: 'fields',
      label: 'Fields',
      required: true,
      blocks: [Text, Textarea, Email, Number, Checkbox, Phone],
    },
  ],
}

export const Group: Block = {
  slug: 'group',
  interfaceName: 'GroupFormField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'blocks',
      name: 'fields',
      label: 'Fields',
      required: true,
      blocks: [Text, Textarea, Email, Number, Checkbox, Phone, ArrayBlock],
    },
  ],
}

export type FormFields = keyof typeof fields

export const fields = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  payment: Payment,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
  phone: Phone,
  array: ArrayBlock,
  group: Group,
}
