import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useFirestore } from "../hooks/useFirestore.js";
import { formValidate } from "../utils/formValidate.js";

import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";
import FormInput from "../components/FormInput.jsx";
import { erroresFirebase } from "../utils/erroresFirebase.js";

const Dashboard = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue
  } = useForm();

  const { required, patternUrl } = formValidate();

  const [copy, setCopy] = useState({});
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    getData();
  }, []);
  
  if (error) return <p>Error: {error}</p>;

  const onSubmit = ({url}) => {
    try {
      if (newOriginID) {
        updateData(newOriginID, url);
        setNewOriginID(null);
      } else {
        addData(url);
      }
      resetField('url');
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { type: 'manual', message });
    }
  }

  const handleDelete = (nanoid) => {
    deleteData(nanoid);
  }

  const handleEdit = (nanoid, origin) => {
    setValue('url', origin);
    setNewOriginID(nanoid);
  }

  const pathUrl = window.location.origin;

  const handleCopy = async (nanoid) => {
    await navigator.clipboard.writeText(`${pathUrl}/${nanoid}`);
    setCopy(prev => ({...prev, [nanoid]: true}));
    setInterval(() => {
      setCopy(prev => ({...prev, [nanoid]: false}));
      return clearInterval();
    }, 1500);
  }

  return (
    <section className="md:px-10 max-w-6xl px-2 mx-auto mt-20">
      <Title texto="Acorta tu URL" />

      <form onSubmit={handleSubmit(onSubmit)} className="md:flex-row gap-x-4 flex flex-col items-center justify-center w-full max-w-lg px-4 mx-auto mb-4">
        <FormInput type="text" placeholder="Ejemplo: https://example.com" {...register("url", { required, pattern: patternUrl })} label='Ingresa la URL' error={errors.url} />
        {newOriginID ? <Button text='Editar URL' type="submit" color="yellow" loading={loading.updateData} /> : <Button text='Generar URL' type="submit" loading={loading.addData} />}
      </form>

      <article className="md:grid-cols-2 lg:grid-cols-3 grid w-full max-w-6xl grid-cols-1 gap-4 mx-auto">
      {loading.getData ?
        <p>Cargando...</p>
      :
      data.map(({nanoid, origin, uid}) => (
        <div key={nanoid} className="dark:bg-gray-800 dark:border-gray-700 w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="dark:text-white mb-2 text-xl font-bold tracking-tight text-gray-900">{pathUrl}/{nanoid}</h5>
          <p className="dark:text-gray-400 mb-3 font-normal text-gray-700">{origin}</p>
          <div className="flex space-x-2">
            <Button text='Eliminar' type="button" loading={loading[nanoid]} color="red" onClick={() => handleDelete(nanoid)}/>
            <Button text='Editar' type="button" color="yellow" onClick={() => handleEdit(nanoid, origin)}/>
            <Button text={copy[nanoid] ? 'Copiado' : 'Copiar'} type="button" color="indigo" onClick={() => handleCopy(nanoid)}/>
          </div>
        </div>
      ))}
      </article>
    </section>
  );
};

export default Dashboard;
