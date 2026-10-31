import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RotaProtegida() {

    const token = localStorage.getItem('token');

    useEffect(() => {
        
        if (!token) {
            toast.error('Você precisa estar logado em uma conta para acessar essa página.')
    }
    }, [token]);

    if (!token) {
        return <Navigate to='/Login' replace/>
    }
    return <Outlet />;

}