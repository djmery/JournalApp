import { Navigate, Routes, Route } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import { useSelector } from "react-redux";


export const AuthRoutes = () => {

    const { status } = useSelector(state => state.auth);
    if (status === 'authenticated') {
        return <Navigate to={'/'} />
    }

    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="auth/login" />} />
        </Routes>
    );

}
