import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

export default function RotaProtegida() {

    const token = localStorage.getItem('token');

    if (!token) {
        toast.error('Você precisa estar logado para acessar essa página.');
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}