import Footer from "@/components/Footer";
import About from "@/components/Home/About";
import Banner from "@/components/Home/Banner";
import Hero from "@/components/Home/Hero";
import Why from "@/components/Home/Why";
import WordsCarousel from "@/components/Home/WordsCarousel";
// import Companies from '../components/Home/Companies.jsx'
// import Shorten from '../components/Home/Shorten.jsx'

const Home = () => {
  return (
    <main className="mt-24">
      <Hero />
      <WordsCarousel />
      {/* <Shorten /> */}
      <About />
      {/* <Companies /> */}
      <Why />
      <Banner />
      <Footer />
    </main>
  );
};

export default Home;
