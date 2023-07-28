import { useState } from "react";
import Header from "./components/Header"
import Lawyers from "./components/Lawyers";
import Banner from "./components/Banner";
import About from "./components/About";
import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, Outlet } from 'react-router-dom'

import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
	return (
        <Provider store={appStore}>
            <Header />
            <Outlet />
        </Provider>
    )
};

export const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Banner />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/hire-lawyers",
          element: <Lawyers />
        }
      ]
    }
])

export default App;
