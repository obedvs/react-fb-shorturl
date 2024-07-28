import { useRef, useState } from "react";
import html2canvas from 'html2canvas-pro';

import qrimage from "../../assets/qr-obed.png";
import Button from "../Button.jsx";

const Hero = () => {
  const cardRef = useRef(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleDownloadPNG = async () => {
    setIsButtonVisible(false);
    const card = cardRef.current;
    try {
      const canvas = await html2canvas(card, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-card.png";
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsButtonVisible(true);
    }
  };

  return (
    <section className="md:grid-cols-2 gap-y-4 md:px-10 grid w-full max-w-6xl px-2 py-4 mx-auto">
      <article className="gap-y-4 flex flex-col items-start w-full">
        <span className="bg-blue-100/60 px-4 py-2 text-xs font-semibold text-blue-700 rounded-full">
          Let's make with simply one click. 👈🏻
        </span>
        <h2 className="text-5xl font-bold">
          BIO LINK & LINK SHORTENER 🌌 FOR BUSINESS NEEDS
        </h2>
        <p className="text-sm font-semibold text-gray-500">
          On a single platform, you'll find all the tools you need to connect
          audience worldwide, manage links and QR Codes, and create brand
          relationships.
        </p>
        <div className="gap-x-4 flex">
          <Button color="blue" text="Get Started For Free" />
          <Button color="white" text="Get a Quote" />
        </div>
      </article>
      <article
        className="gap-y-4 md:items-end flex flex-col items-center w-full text-black"
        ref={cardRef}
      >
        <div className="md:w-4/5 relative w-full p-4 border-2 border-gray-200 rounded-lg">
          <header className="gap-x-2 flex flex-row items-center justify-between w-full mb-4">
            <h3 className="text-nowrap font-bold">QR CODE</h3>
            {isButtonVisible && <Button
              color="blue"
              text="Download PNG"
              onClick={handleDownloadPNG}
              type="button"
            />}
          </header>
          <footer className="gap-x-4 flex items-center">
            <img
              src={qrimage}
              alt="QR Code"
              width={96}
              height={96}
            />
            <div className="gap-y-2 grid font-semibold">
              <a href="https://obedvega.vercel.app/" target="_blank">
                obedvega.vercel.app
              </a>
              <time dateTime="2024-10-17">17 October 2024</time>
            </div>
          </footer>
          <div className="size-16 -bottom-10 right-10 absolute z-10 flex items-center justify-center text-3xl bg-blue-600 rounded-full">🔗</div>
        </div>
        <div className="md:w-4/5 -z-20 w-full p-4 border-2 border-gray-200 rounded-lg">
          <header className="flex items-center justify-between w-full mb-4">
            <h3 className="font-bold">YOUR CUSTOM LINK</h3>
          </header>
          <footer className="gap-x-4 flex items-center">
            <p className="w-full px-4 py-2 text-sm font-semibold bg-gray-100 rounded-lg">
              <span className="text-blue-700">smll</span>
              <span>.space/obedvega</span>
            </p>
          </footer>
        </div>
      </article>
    </section>
  );
};

export default Hero;
