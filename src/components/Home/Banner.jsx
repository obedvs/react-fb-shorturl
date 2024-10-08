import Button from "../Button"

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-tr from-[#101010] to-[#5a5a5a]">
    <section className="md:px-10 md:flex-row flex flex-col w-full max-w-6xl gap-4 p-2 pt-10 pb-0 mx-auto">
        <article className="md:w-1/2 md:items-start flex flex-col items-center justify-start w-full gap-6 pb-10">
            <span className='md:text-start text-sm font-medium text-center text-white'>🔥 Growth Hack your way to the Top!</span>
            <h3 className='md:text-start text-4xl font-bold text-center text-white'>GET CLOSER TO YOUR CUSTOMERS TODAY</h3>
            <Button color='blue' text='Get Started For Free' />
        </article>
    </section>
    </div>
  )
}

export default Banner