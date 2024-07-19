import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserProvider.jsx";
import { formValidate } from "../utils/formValidate.js";
import { erroresFirebase } from "../utils/erroresFirebase.js";

import FormInput from "../components/FormInput.jsx";
import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";

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

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/dashboard");
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
      <Title texto="Inicia Sesión" />
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
          {...register("password", { required })}
          label="Contraseña"
          error={errors.password}
        />
        <Button text="Iniciar sesión" type="submit" loading={loading} color="blue" />
      </form>
    </>
  );
};

export default Login;
