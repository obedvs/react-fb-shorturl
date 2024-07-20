import Button from "../Button";

const Companies = () => {
  return (
    <div className="w-full bg-blue-700">
    <section className="gap-y-4 place-items-center md:px-10 grid justify-center max-w-6xl px-2 py-10 mx-auto text-white">
      <h4 className="text-3xl font-bold text-center">COMPANIES THAT TRUST US</h4>
      <p className="text-center max-w-[90ch]">
        We already used by more than 8,000 companies. We help businesses,
        influencers, and creative individuals create a professional presence on
        the web without the need for technical skills.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-12 my-4">
        <img src="https://via.placeholder.com/150" alt="logo1" className="w-36 h-14" />
        <img src="https://via.placeholder.com/150" alt="logo2" className="w-36 h-14" />
        <img src="https://via.placeholder.com/150" alt="logo3" className="w-36 h-14" />
        <img src="https://via.placeholder.com/150" alt="logo4" className="w-36 h-14" />
      </div>
      <Button text='See More Companies' color="white" />
    </section>
    </div>
  );
};

export default Companies;
