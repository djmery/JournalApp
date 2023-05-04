import { Navigate, Routes, Route } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage";
import { useSelector } from "react-redux";


export const JournalRoutes = () => {

    const { status } = useSelector(state => state.auth);
    if (status === 'not-authenticated') {
        return <Navigate to={'/auth/login'} />
    }

    return (
        <Routes>
            <Route path="/" element={<JournalPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );

}
