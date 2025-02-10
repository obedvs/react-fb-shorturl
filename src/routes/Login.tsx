import { useContext, useState } from "react";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { UserContext } from "@/context/UserProvider";
import { formValidate } from "@/utils/formValidate";
import { erroresFirebase } from "@/utils/erroresFirebase";

import Title from "@/components/Title";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { loginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { required, patternEmail } = formValidate();

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      setLoading(true);

      await loginUser(email, password);
      navigate("/dashboard");
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
      <Title texto="Log In" />
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
          {...register("password", { required })}
          label="Password"
          error={errors.password}
        />
        <Button text="Log In" type="submit" loading={loading} color="blue" />
      </form>
    </>
  );
};

export default Login;
