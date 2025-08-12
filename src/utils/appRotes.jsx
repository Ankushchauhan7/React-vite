
import React from "react";
import { createBrowserRouter } from "react-router";
import Body from "../components/Body";
import AboutPage from "../pages/About";
import ContactPage from "../pages/contact";
import App from "../App";
import DummyProduct from "../components/DummyProduct";
import DummyProductPage from "../components/DummyProductPage";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DummyProduct />,
      },
      {
        path: "/about-us",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/product/:productId",
        element: <DummyProductPage />,
      },
    ],
    errorElement: <h1>not Found </h1>,
  },
]);