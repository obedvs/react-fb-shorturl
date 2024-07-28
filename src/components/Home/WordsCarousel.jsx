const words = ["MICROSITE", "CUSTOM LINK", "MANAGE", "SHORTLINK", "ANALYZE"];

import { useEffect } from "react";
import "../../styles/WordsCarousel.css";

const WordsCarousel = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <section className="md:px-10 w-full max-w-6xl mx-auto">
      <article className="scroller text-white bg-blue-600" data-speed="slow">
        <ul className="tag-list scroller__inner">
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default WordsCarousel;
