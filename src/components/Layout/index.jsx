import { useState } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from "../BarraLateral";
import ModalPost from "../PostagemModal";
import './index.scss';

export default function Layout() {
    const [modalAberto, setModalAberto] = useState(false);
    const [tipoPostagem, setTipoPostagem] = useState('relato');

    const usuarioSalvo = localStorage.getItem("usuario") || localStorage.getItem("user");
    const dadosUsuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

    return (
        <div className="app-layout">
            <NavBar onAbrirModal={() => setModalAberto(true)} />

            <main className="conteudo-rodando">
                <Outlet />
            </main>

            <ModalPost 
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                tipoInicial={tipoPostagem}
                usuarioId={dadosUsuario?.id}
            />
        </div>
    );
}