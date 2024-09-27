import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import html2canvas from "html2canvas-pro";

import { useFirestore } from "../hooks/useFirestore.js";
import { formValidate } from "../utils/formValidate.js";

import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";
import FormInput from "../components/FormInput.jsx";
import { erroresFirebase } from "../utils/erroresFirebase.js";

const Dashboard = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  const { required, patternUrl } = formValidate();

  const [copy, setCopy] = useState({});
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    getData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  const onSubmit = ({ url }) => {
    if (!url.startsWith("https://")) {
      setError("url", {
        type: "manual",
        message: "Invalid URL format (https://)",
      });
      return;
    }
    try {
      if (newOriginID) {
        updateData(newOriginID, url);
        setNewOriginID(null);
      } else {
        addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { type: "manual", message });
    }
  };

  const handleDelete = (nanoid) => {
    deleteData(nanoid);
  };

  const handleEdit = (nanoid, origin) => {
    setValue("url", origin);
    setNewOriginID(nanoid);
  };

  const pathUrl = window.location.origin;

  const handleCopy = async (nanoid) => {
    await navigator.clipboard.writeText(`${pathUrl}/${nanoid}`);
    setCopy((prev) => ({ ...prev, [nanoid]: true }));
    setInterval(() => {
      setCopy((prev) => ({ ...prev, [nanoid]: false }));
      return clearInterval();
    }, 1500);
  };

  const handleDownloadPNG = async (nanoid) => {
    const card = document.getElementById(nanoid);
    try {
      const canvas = await html2canvas(card, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-card.png";
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="md:px-10 max-w-6xl px-2 mx-auto mt-24">
      <Title texto="Short your URL" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-x-4 flex flex-col items-center justify-center w-full max-w-lg px-4 mx-auto mb-4"
      >
        <FormInput
          type="text"
          placeholder="https://example.com"
          {...register("url", { required, pattern: patternUrl })}
          label="Write the URL"
          error={errors.url}
        />
        {newOriginID ? (
          <Button
            text="Edit URL"
            type="submit"
            color="yellow"
            loading={loading.updateData}
          />
        ) : (
          <Button text="Generate URL" type="submit" loading={loading.addData} />
        )}
      </form>

      <article className="md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 grid w-full max-w-6xl grid-cols-1 mx-auto">
        {loading.getData ? (
          <p>Loading...</p>
        ) : (
          data.map(({ nanoid, origin, uid }) => (
            <article
              className="gap-y-2 md:items-end z-10 flex flex-col items-center w-full text-black"
              key={nanoid}
            >
              <div className="rounded-2xl relative w-full p-4 border-2 border-gray-200 shadow">
                <header className="flex flex-row items-center justify-between w-full gap-2 mb-4">
                  <h3 className="text-nowrap w-3/4 font-bold">URL</h3>
                  <Button
                    color="blue"
                    text="Download PNG"
                    onClick={() => handleDownloadPNG(nanoid)}
                    type="button"
                  />
                </header>
                <footer className="gap-x-4 flex items-center">
                  <a
                    href={origin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nowrap text-sm font-semibold"
                  >
                    {origin}
                  </a>
                  {/* <img src={qrimage} alt="QR Code" width={96} height={96} /> */}
                </footer>
                <div className="size-16 -bottom-10 right-10 absolute z-10 flex items-center justify-center text-3xl bg-blue-600 rounded-full">
                  🔗
                </div>
              </div>
              <div
                className="-z-20 rounded-2xl relative w-full p-4 border-2 border-gray-200 shadow"
                id={nanoid}
              >
                <header className="flex items-center justify-between w-full mb-4">
                  <h3 className="font-bold">CUSTOM LINK</h3>
                </header>
                <footer className="gap-x-4 flex items-center">
                  <div className="w-full px-4 py-2 bg-gray-100 rounded-lg">
                    <a
                      href={`${pathUrl}/${nanoid}`}
                      className=" text-sm font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-blue-700">{pathUrl}/</span>
                      <span>{nanoid}</span>
                    </a>
                  </div>
                </footer>
              </div>
              <div className="-z-10 rounded-2xl relative w-full p-4 bg-white border border-gray-200 shadow">
                <div className="size-16 -top-10 right-10 absolute z-10 flex items-center justify-center text-3xl bg-blue-600 rounded-full">
                  🔗
                </div>
                <h4 className="mb-4 font-bold tracking-tight">OPTIONS</h4>
                <div className="flex space-x-2">
                  <Button
                    text="Delete"
                    type="button"
                    loading={loading[nanoid]}
                    color="red"
                    onClick={() => handleDelete(nanoid)}
                  />
                  <Button
                    text="Edit"
                    type="button"
                    color="yellow"
                    onClick={() => handleEdit(nanoid, origin)}
                  />
                  <Button
                    text={copy[nanoid] ? "Copied" : "Copy"}
                    type="button"
                    color="indigo"
                    onClick={() => handleCopy(nanoid)}
                  />
                </div>
              </div>
            </article>
          ))
        )}
      </article>
    </section>
  );
};

export default Dashboard;
