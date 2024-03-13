import "./bootstrap";
import "../css/app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Warehouse from "./pages/Warehouse";
import Kitchen from "./pages/Kitchen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "warehouse",
        element: <Warehouse />,
    },
    {
        path: "kitchen",
        element: <Kitchen />,
    },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);
