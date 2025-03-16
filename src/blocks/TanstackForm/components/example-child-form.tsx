// import type { Form } from '@/payload-types'
// import { defaultValuesOpts } from '../form-options'
// import { withForm } from '../hooks/form'

// export const ChildForm = withForm({
//   defaultValues: ({fields}: {fields: Form['fields']}) => defaultValuesOpts(fields),
//   props: {
//     field: {
//       name: 'name' as const,
//       id: '1234',
//       label: 'Pet Name',
//       title: 'Child Form',
//       width: 100,
//       fields: {} as Form['fields'],
//     },
//   },
//   render: ({ form, field: { title, name, label, id, width } }) => {
//     return (
//       <div>
//         <p>{title}</p>
//         <form.AppField name={name}>
//           {(field) => <field.TextField label={label} id={id} width={width ?? 100} />}
//         </form.AppField>
//       </div>
//     )
//   },
// })
