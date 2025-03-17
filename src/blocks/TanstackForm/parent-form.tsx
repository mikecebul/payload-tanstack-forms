// 'use client'

// import { FormBlock } from '@/payload-types'
// import { createContext, useEffect, useState } from 'react'
// import { TanstackFormBlock } from './tanstack-form-block'
// import { getDefaultValuesOpts } from './form-options'

// export const DefaultValuesContext = createContext<
//   Record<string, string | number | boolean | any[] | undefined>
// >({})

// export const ParentForm = (props: FormBlock) => {
//   const [defaultValues, setDefaultValues] = useState({})

//   useEffect(() => {
//     if (typeof props.form === 'object' && props.form.fields) {
//       setDefaultValues(getDefaultValuesOpts(props.form.fields))
//     }
//     console.log('Parent Form Rerender')
//   }, [props.form])
//   return (
//     <DefaultValuesContext.Provider value={defaultValues}>
//       <TanstackFormBlock {...props} />
//     </DefaultValuesContext.Provider>
//   )
// }
