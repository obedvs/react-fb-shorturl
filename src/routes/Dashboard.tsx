import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import html2canvas from "html2canvas-pro";

import { useFirestore } from "@/hooks/useFirestore";
import { formValidate } from "@/utils/formValidate";

import Title from "../components/Title.js";
import Button from "../components/Button.js";
import FormInput from "../components/FormInput.js";
import { erroresFirebase } from "../utils/erroresFirebase.js";
import { FirebaseError } from "firebase/app";

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

  const [copy, setCopy] = useState<Record<string, boolean>>({});
  const [newOriginID, setNewOriginID] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  const onSubmit = ({ url }: { url: string }) => {
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
      if (error instanceof FirebaseError) {
        const { code, message } = erroresFirebase(error.code);
        setError(code, { type: "manual", message });
      }
    }
  };

  const handleDelete = (nanoid: string) => {
    deleteData(nanoid);
  };

  const handleEdit = (nanoid: string, origin: string) => {
    setValue("url", origin);
    setNewOriginID(nanoid);
  };

  const pathUrl = window.location.origin;

  const handleCopy = async (nanoid: string) => {
    await navigator.clipboard.writeText(`${pathUrl}/${nanoid}`);
    setCopy((prev) => ({ ...prev, [nanoid]: true }));
    const interval = setInterval(() => {
      setCopy((prev) => ({ ...prev, [nanoid]: false }));
      return clearInterval(interval);
    }, 1500);
  };

  const handleDownloadPNG = async (nanoid: string) => {
    const card = document.getElementById(nanoid);
    try {
      if (!card) {
        throw new Error("Card element not found");
      }
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
    <section className="md:px-10 px-2 mx-auto mt-24 max-w-6xl">
      <Title texto="Short your URL" />

      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className="flex flex-col gap-x-4 justify-center items-center px-4 mx-auto mb-4 w-full max-w-lg"
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

      <article className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-x-4 gap-y-6 mx-auto w-full max-w-6xl">
        {loading.getData ? (
          <p>Loading...</p>
        ) : (
          data.map(({ nanoid, origin }) => (
            <article
              className="md:items-end flex z-10 flex-col gap-y-2 items-center w-full text-black"
              key={nanoid}
            >
              <div className="relative p-4 w-full rounded-2xl border-2 border-gray-200 shadow">
                <header className="flex flex-row gap-2 justify-between items-center mb-4 w-full">
                  <h3 className="text-nowrap w-3/4 font-bold">URL</h3>
                  <Button
                    color="blue"
                    text="Download PNG"
                    onClick={() => handleDownloadPNG(nanoid)}
                    type="button"
                  />
                </header>
                <footer className="flex gap-x-4 items-center">
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
                <div className="size-16 flex absolute right-10 -bottom-10 z-10 justify-center items-center text-3xl bg-blue-600 rounded-full">
                  🔗
                </div>
              </div>
              <div
                className="-z-20 relative p-4 w-full rounded-2xl border-2 border-gray-200 shadow"
                id={nanoid}
              >
                <header className="flex justify-between items-center mb-4 w-full">
                  <h3 className="font-bold">CUSTOM LINK</h3>
                </header>
                <footer className="flex gap-x-4 items-center">
                  <div className="px-4 py-2 w-full bg-gray-100 rounded-lg">
                    <a
                      href={`${pathUrl}/${nanoid}`}
                      className="text-sm font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-blue-700">{pathUrl}/</span>
                      <span>{nanoid}</span>
                    </a>
                  </div>
                </footer>
              </div>
              <div className="-z-10 relative p-4 w-full bg-white rounded-2xl border border-gray-200 shadow">
                <div className="size-16 flex absolute -top-10 right-10 z-10 justify-center items-center text-3xl bg-blue-600 rounded-full">
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
