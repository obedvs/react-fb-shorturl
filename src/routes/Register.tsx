import { FirebaseError } from "firebase/app";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { formValidate } from "@/utils/formValidate";
import { UserContext } from "@/context/UserProvider";
import { erroresFirebase } from "@/utils/erroresFirebase";

import Title from "@/components/Title";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const { code, message } = erroresFirebase(error.code);
        setError(code, { type: "custom", message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title texto="Sign Up" />
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className="mx-auto max-w-sm"
      >
        <FormInput
          type="email"
          placeholder="example@email.com"
          {...register("email", { required, pattern: patternEmail })}
          label="Email"
          error={errors.email}
        />
        <FormInput
          type="password"
          placeholder="********"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
          label="Password"
          error={errors.password}
        />
        <FormInput
          type="password"
          placeholder="********"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repeat Password"
          error={errors.repassword}
        />
        <Button text="Sign Up" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Register;
