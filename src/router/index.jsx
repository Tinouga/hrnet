import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateEmployee from "../pages/CreateEmployee/index.js";
import Root from "../pages/Root/Root.jsx";
import EmployeeList from "../pages/EmployeeList/index.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                index: true,
                element: <CreateEmployee/>
            },
            {
                path: 'employees-list',
                element: <EmployeeList />
            }
        ]
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router}/>
    );
};
