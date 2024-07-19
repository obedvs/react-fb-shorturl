import { forwardRef } from "react"

import FormError from "./FormError.jsx"

const FormInput = forwardRef(({type, placeholder, name, onChange, onBlur, label, error}, ref) => {

  const classLabel = error ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'

  const classInput = error
    ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

  return (
    <div className="w-full mb-2">
      <label className={`block mb-2 text-sm font-medium ${classLabel}`} htmlFor={name}>{label}</label>
      <input type={type} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} ref={ref}
        className={`border text-sm rounded-lg block w-full p-2.5 ${classInput}`} />
      <FormError error={error} />
    </div>
  )
})

export default FormInput