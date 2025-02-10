import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const FormError = ({
  error,
}: {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}) => {
  return (
    <>
      {error && (
        <p className="dark:text-red-500 mt-2 text-sm text-red-600">
          <span className="font-medium">Oops!</span>{" "}
          {typeof error.message === "string"
            ? error.message
            : "Error desconocido"}
        </p>
      )}
    </>
  );
};

export default FormError;
