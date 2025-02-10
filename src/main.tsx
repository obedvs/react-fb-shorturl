import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/index.css";
import App from "@/App.tsx";
import UserProvider from "@/context/UserProvider.tsx";

import "flowbite";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);
