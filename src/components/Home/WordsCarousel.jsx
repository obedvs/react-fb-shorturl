const words = ["MICROSITE", "CUSTOM LINK", "MANAGE", "SHORTLINK"];

import '../../styles/WordsCarousel.css';

const WordsCarousel = () => {
  return (
    <div className='overflow-x-clip relative flex w-full'>
    <section className="word-carousel w-full text-white bg-blue-600">
      <article className="word-carousel-inner">
        {words.concat(words).concat(words).map((word, index) => (
          <div key={index} className="word-carousel-item">
            {word}
          </div>
        ))}
      </article>
    </section>
    <section className="word-carousel -z-10 -rotate-[2deg] absolute -translate-y-[50%] bg-[#1a1a1a] text-gray-600 w-[125%]">
      <article className="word-carousel-inner">
        {words.concat(words).concat(words).map((word, index) => (
          <div key={index} className="word-carousel-item">
            {word}
          </div>
        ))}
      </article>
    </section>
    </div>
  );
};

export default WordsCarousel;
