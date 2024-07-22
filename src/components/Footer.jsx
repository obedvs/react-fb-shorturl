import { Link } from "react-router-dom";
import Button from "./Button";

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
]

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
]

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
]

const List = ({ title, items }) => {
  return (
    <article>
      <h5 className="mb-2 text-lg font-semibold">{title}</h5>
      <ul className="grid gap-1 text-gray-500">
        {items.map((item, index) => (
          <li key={index}>
            <Link className="hover:text-gray-900" to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

const Footer = () => {
  return (
    <footer className="md:p-10 gap-y-4 flex flex-col items-start w-full max-w-6xl px-2 py-4 mx-auto">
      <Link to="/" className="flex items-center w-auto">
        <span className="whitespace-nowrap sm:text-2xl self-center text-lg font-semibold">
          URLShort
        </span>
      </Link>
      <section className="md:grid-cols-5 gap-y-4 grid grid-cols-2 pb-4 border-b border-gray-300">
        <List title="MENU" items={menu} />
        <List title="COMPANY" items={company} />
        <List title="SERVICES" items={services} />
        <article className="md:col-span-2 md:block hidden">
          <h5 className="mb-2 text-lg font-semibold">SUBSCRIBE TO NEWSLETTER</h5>
          <form
            className="flex items-center justify-center p-1 bg-transparent border border-gray-300 rounded-lg"
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
      <section className="md:flex-row flex flex-col items-center justify-between w-full gap-2 text-gray-500">
        <p className="text-center">
          &copy; 2024 URLShort. All rights reserved.
        </p>
        <div className="flex gap-2">
          <Link className="hover:text-gray-900" to='/#'>Terms of Service</Link>
          <Link className="hover:text-gray-900" to='/#'>Privacy Policy</Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
