import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

import Button from "@/components/Button";
import qrimage from "@/assets/qr-obed.png";

const Hero = () => {
  const cardRef = useRef(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleDownloadPNG = async () => {
    setIsButtonVisible(false);
    const card = cardRef.current;
    try {
      if (!card) {
        console.error("Card element not found");
        return;
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
    } finally {
      setIsButtonVisible(true);
    }
  };

  return (
    <section className="md:grid-cols-2 md:px-10 grid gap-y-4 px-2 py-4 mx-auto w-full max-w-6xl">
      <article className="flex flex-col gap-y-4 items-start w-full">
        <span className="bg-blue-100/60 px-4 py-2 text-xs font-semibold text-blue-700 rounded-full">
          Let&apos;s make with simply one click. 👈🏻
        </span>
        <h2 className="text-5xl font-bold">
          BIO LINK & LINK SHORTENER 🌌 FOR BUSINESS NEEDS
        </h2>
        <p className="text-sm font-semibold text-gray-500">
          On a single platform, you&apos;ll find all the tools you need to
          connect audience worldwide, manage links and QR Codes, and create
          brand relationships.
        </p>

        <div className="flex gap-x-4">
          <Button color="blue" text="Get Started For Free" />
          <Button color="white" text="Get a Quote" />
        </div>
      </article>
      <article
        className="md:items-end flex flex-col gap-y-4 items-center w-full text-black"
        ref={cardRef}
      >
        <div className="md:w-4/5 relative p-4 w-full rounded-lg border-2 border-gray-200">
          <header className="flex flex-row gap-x-2 justify-between items-center mb-4 w-full">
            <h3 className="text-nowrap font-bold">QR CODE</h3>
            {isButtonVisible && (
              <Button
                color="blue"
                text="Download PNG"
                onClick={handleDownloadPNG}
                type="button"
              />
            )}
          </header>
          <footer className="flex gap-x-4 items-center">
            <img src={qrimage} alt="QR Code" width={96} height={96} />
            <a
              href="https://blog.obedvs.dev/"
              target="_blank"
              className="font-semibold"
            >
              blog.obedvs.dev
            </a>
          </footer>
          <div className="size-16 flex absolute right-10 -bottom-10 z-10 justify-center items-center text-3xl bg-blue-600 rounded-full">
            🔗
          </div>
        </div>
        <div className="md:w-4/5 -z-20 p-4 w-full rounded-lg border-2 border-gray-200">
          <header className="flex justify-between items-center mb-4 w-full">
            <h3 className="font-bold">YOUR CUSTOM LINK</h3>
          </header>
          <footer className="flex gap-x-4 items-center">
            <p className="px-4 py-2 w-full text-sm font-semibold bg-gray-100 rounded-lg">
              <span className="text-blue-700">url.abbr.social/</span>
              <span>obedvega</span>
            </p>
          </footer>
        </div>
      </article>
    </section>
  );
};

export default Hero;
