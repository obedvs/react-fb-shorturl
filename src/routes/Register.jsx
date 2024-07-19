import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserProvider.jsx";
import { erroresFirebase } from "../utils/erroresFirebase.js";
import { formValidate } from "../utils/formValidate.js";

import FormInput from "../components/FormInput.jsx";
import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";

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

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/login");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { type: "custom", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title texto="Registrate" />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <FormInput
          type="email"
          placeholder="example@email.com"
          {...register("email", { required, pattern: patternEmail })}
          label="Correo Electrónico"
          error={errors.email}
        />
        <FormInput
          type="password"
          placeholder="123456"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
          label="Contraseña"
          error={errors.password}
        />
        <FormInput
          type="password"
          placeholder="123456"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repita su contraseña"
          error={errors.repassword}
        />
        <Button text="Registrarse" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Register;
