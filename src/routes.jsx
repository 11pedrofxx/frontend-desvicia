import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './Pages/App/App.jsx'
import Login from './Pages/Login/index.jsx'
import Cadastro from './Pages/Cadastro'
import Saude from './Pages/Noticias/saude.jsx';
import ApresentationModal from './components/ApresentacionModal/ApresentacaoModal.jsx'
import Distrair from './Pages/Distrair/index.jsx'
import RedefinirSenha from './Pages/RedefinirSenha/index.jsx';
import NovaSenha from './Pages/NovaSenha/index.jsx';
import RotaProtegida from './components/RotaProtegida/index.jsx';
import RegistroDiario from './Pages/RegistroDiario/index.jsx';
import Layout from './components/Layout/index.jsx';
import Perfil from './Pages/Perfil/index.jsx';
import PrimeiroAcesso from './Pages/PrimeiroAcesso/index.jsx';
import RedeApoio from './Pages/RedeApoio/index.jsx';
import Gatilhos from "./Pages/DashboardGatilhos/index.jsx";
import Apoio from './Pages/Contato/apoio.jsx';
import Acompanhamento from "./Pages/Acompanhamento/index.jsx";

export default function Roteamento() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/TESTCOMP" element={<ApresentationModal />} />
                <Route path="/Distrair" element={<Distrair />} />
                <Route path="/esqueci-senha" element={<RedefinirSenha />} />
                <Route path="/nova-senha" element={<NovaSenha />} />

                {/* ROTAS PROTEGIDAS(Só podem ser acessadas após o Login) */}

                <Route element={<RotaProtegida />}>
                    <Route path="/registro-diario" element={<RegistroDiario />} />
                    <Route path="/primeiro-acesso" element={<PrimeiroAcesso />} />
                    <Route path="/gatilhos" element={<Gatilhos />} />
                    
                    <Route element={<Layout />}>
                        <Route path="/home" element={<RedeApoio />} />
                        <Route path="/acompanhamento" element={<Acompanhamento />} />
                        <Route path="/" element={<App />} />
                        <Route path="/aprender" element={<Saude />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/apoio" element={<Apoio />} />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}