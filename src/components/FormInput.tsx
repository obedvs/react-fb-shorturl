import { forwardRef, LegacyRef } from "react";

import FormError from "@/components/FormError.tsx";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FormInputProps = {
  type: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const FormInput = forwardRef(
  (
    {
      type,
      placeholder = "",
      name,
      onChange,
      onBlur,
      label,
      error,
    }: FormInputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const classLabel = error
      ? "text-red-700 dark:text-red-500"
      : "text-gray-900 dark:text-white";

    const classInput = error
      ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    return (
      <div className="mb-2 w-full">
        <label
          className={`${classLabel} block mb-2 text-sm font-medium`}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          id={name}
          autoComplete="on"
          className={`border text-sm rounded-lg block w-full p-2.5 ${classInput}`}
        />
        <FormError error={error} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
