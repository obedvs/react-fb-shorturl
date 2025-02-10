export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "This field is required",
    },
    minLength: {
      value: 6,
      message: "This field must be at least 6 characters",
    },
    patternEmail: {
      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid email format",
    },
    patternUrl: {
      value: /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/,
      message: "Invalid URL format (https://)",
    },

    validateTrim: {
      trim: (v: string) => {
        if (!v.trim()) {
          return "This field is required";
        }
        return true;
      },
    },
    validateEquals(value: string) {
      return {
        equals: (v: string) => v === value || "The passwords do not match",
      };
    },

  };
};
