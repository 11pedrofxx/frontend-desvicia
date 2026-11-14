import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RotaProtegida() {

    const location = useLocation();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    useEffect(() => {

        if (!token) {
            toast.error('Você precisa estar logado para acessar essa página.');
        }

    }, [token, location.pathname]);

    if (!token) {
        return <Navigate
            to="/login"
            replace
        />;
    }

    return <Outlet />;
}
