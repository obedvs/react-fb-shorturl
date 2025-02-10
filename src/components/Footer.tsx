import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Logo from "@/components/Icons/Logo";

const menu = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "Product",
    link: "/#",
  },
  {
    title: "Pricing",
    link: "/#",
  },
  {
    title: "Resource",
    link: "/#",
  },
];

const company = [
  {
    title: "About Us",
    link: "/#",
  },
  {
    title: "Help Center",
    link: "/#",
  },
  {
    title: "The Community",
    link: "/#",
  },
  {
    title: "Partner Program",
    link: "/#",
  },
];

const services = [
  {
    title: "Link Shortener",
    link: "/#",
  },
  {
    title: "Microsite Builder",
    link: "/#",
  },
  {
    title: "Subscription",
    link: "/#",
  },
];

const List = ({
  title,
  items,
}: {
  title: string;
  items: { title: string; link: string }[];
}) => {
  return (
    <article>
      <h5 className="mb-2 text-lg font-semibold">{title}</h5>
      <ul className="grid gap-1 text-gray-500">
        {items.map((item, index) => (
          <li key={index}>
            <Link className="hover:text-gray-900" to={item.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

const Footer = () => {
  return (
    <footer className="md:p-10 flex flex-col gap-y-4 items-start px-2 py-4 mx-auto w-full max-w-6xl">
      <Link to="/" className="flex gap-x-2 items-center w-auto">
        <Logo />
        <span className="sm:text-2xl self-center text-lg font-semibold whitespace-nowrap">
          url.abbr
        </span>
      </Link>
      <section className="flex flex-wrap gap-4 justify-between pb-4 w-full border-b border-gray-300">
        <List title="MENU" items={menu} />
        <List title="COMPANY" items={company} />
        <List title="SERVICES" items={services} />
        <article className="md:w-2/5 w-full">
          <h5 className="mb-2 text-lg font-semibold">
            SUBSCRIBE TO NEWSLETTER
          </h5>
          <form
            className="flex justify-center items-center p-1 bg-transparent rounded-lg border border-gray-300"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              name="subscribe-email"
              placeholder="youremail@email.com"
              className="md:w-96 !ring-0 !focus:outline-none placeholder:text-gray-300 ring-transparent p-2 bg-transparent border-0 rounded-lg"
            />
            <Button text="Subscribe" color="blue" type="button" />
          </form>
        </article>
      </section>
      <section className="md:flex-row flex flex-col gap-2 justify-between items-center w-full text-gray-500">
        <p className="text-center">
          &copy; 2024 url.abbr. All rights reserved.
        </p>
        <div className="flex gap-2">
          <Link className="hover:text-gray-900" to="/#">
            Terms of Service
          </Link>
          <Link className="hover:text-gray-900" to="/#">
            Privacy Policy
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
