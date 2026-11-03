import { Outlet } from "react-router-dom";
import NavBar from "../BarraLateral";
import './index.scss';

export default function Layout() {
    return(
        <div className="app-layout">
            <NavBar />

            <main className="conteudo-rodando">
                <Outlet/>
            </main>
        </div>
    );
}