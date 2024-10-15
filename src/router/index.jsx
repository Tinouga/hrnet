import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateEmployee from "../pages/CreateEmployee/index.js";
import Root from "../pages/Root/Root.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                index: true,
                element: <CreateEmployee/>
            },
        ]
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router}/>
    );
};
