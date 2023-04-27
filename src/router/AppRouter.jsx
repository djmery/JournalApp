import { createBrowserRouter, Route, RouterProvider, Routes, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/";
import { useCheckAuth } from "../hooks";


const routesConfig = createBrowserRouter([

    // Login y Registro
    {
        path: "/auth/*",
        element: <AuthRoutes />
    },
    //JournalApp
    {
        path: "/*",
        element: <JournalRoutes />
    }
]);

export const AppRouter = () => {

    const status = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }


    return (
        <RouterProvider router={routesConfig} />
    )
}
