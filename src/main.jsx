import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { App } from "./App";
import { Body } from "./components/Body";
import { AboutUs } from "./components/AboutUs";
import { Contact } from "./components/Contact";
import Error from "./components/Error";
import { RestaurantMenu } from "./components/RestaurantMenu";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <AboutUs/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantMenu />
            }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={appRouter}/>
    </React.StrictMode>
);


