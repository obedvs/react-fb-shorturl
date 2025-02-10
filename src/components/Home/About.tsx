import Button from "@/components/Button";

const About = () => {
  return (
    <div className="w-full bg-gradient-to-bl from-[#101010] to-[#5a5a5a]">
      <section className="md:px-10 px-2 py-10 mx-auto max-w-6xl text-white">
        {/* <hr className="border-t border-gray-800"/> */}
        <article className="md:flex-row md:justify-between flex flex-col gap-y-4 items-center mb-8">
          <h4 className="text-3xl font-bold">HOW WE WORK 👇🏻</h4>
          <p className="md:w-1/2 md:text-start w-full text-sm text-center">
            All the products you need to build brand connections, manage links
            and QR Codes, and connect with audience everywhere, in a single
            united platform.
          </p>
        </article>
        <article className="md:flex-row flex flex-col flex-wrap gap-2 justify-around items-center p-2 w-full bg-gray-800 rounded-xl">
          <Button text="1 Put Link" color="blue" />
          <Button text="2 Click Shortener" color="gray-2" />
          <Button text="3 Create Custom URL" color="gray-2" />
          <Button text="4 Create QR Code" color="gray-2" />
          <Button text="5 Put Tracker Link" color="gray-2" />
        </article>
      </section>
    </div>
  );
};

export default About;
