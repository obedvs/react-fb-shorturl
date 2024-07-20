import About from '../components/Home/About.jsx'
import Banner from '../components/Home/Banner.jsx'
import Companies from '../components/Home/Companies.jsx'
import Hero from '../components/Home/Hero.jsx'
import Shorten from '../components/Home/Shorten.jsx'
import Why from '../components/Home/Why.jsx'
import WordsCarousel from '../components/Home/WordsCarousel.jsx'

const Home = () => {
  return (
    <main className='mt-20'>
      <Hero />
      <WordsCarousel />
      <Shorten />
      <About />
      <Companies />
      <Why />
      <Banner />
    </main>
  )
}

export default Home