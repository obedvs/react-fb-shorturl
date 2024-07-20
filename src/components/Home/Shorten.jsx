import Button from "../Button";

const Shorten = () => {
  return (
    <div className="bg-[#101010] w-full">
    <section className="md:flex-row md:px-10 flex flex-col items-center justify-between max-w-6xl gap-2 px-2 pt-10 mx-auto">
      <h4 className="text-3xl font-bold text-white">SHORTEN YOUR LINK NOW</h4>
      <form
        className="flex flex-row items-center justify-center p-1 bg-gray-800 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="url"
          placeholder="Shorten a link here..."
          className="md:w-96 !ring-0 !focus:outline-none placeholder:text-gray-300 ring-transparent p-2 text-white bg-transparent border-0 rounded-lg"
        />
        <Button text="ShortLink!" color="blue" type="button" />
      </form>
    </section>
    </div>
  );
};

export default Shorten;
