import Button from "../Button"

const About = () => {
  return (
    <div className="bg-[#101010] w-full">
    <section className=" md:px-10 max-w-6xl px-2 py-10 mx-auto text-white">
        <hr className="border-t border-gray-800"/>
        <article className="md:flex-row md:justify-between gap-y-4 flex flex-col items-center my-8">
            <h4 className="text-3xl font-bold">HOW WE WORK 👇🏻</h4>
            <p className="md:w-1/2 md:text-start w-full text-sm text-center">All the products you need to build brand connections, manage links and QR Codes, and connect with audience everywhere, in a single united platform.</p>
        </article>
        <article className="rounded-xl md:flex-row flex flex-col flex-wrap items-center justify-around w-full gap-2 p-2 bg-gray-800">
            <Button text="1 Put Link" color="blue" />
            <Button text="2 Click Shortener" color="gray" />
            <Button text="3 Create Custom URL" color="gray" />
            <Button text="4 Create QR Code" color="gray" />
            <Button text="5 Put Tracker Link" color="gray" />
        </article>
    </section>
    </div>
  )
}

export default About