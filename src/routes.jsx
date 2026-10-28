import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './Pages/App/App.jsx'
import Login from './Pages/Login/index.jsx'
import Cadastro from './Pages/Cadastro'
import Saude from "./Pages/Noticias/saude.jsx";
import ApresentationModal from './components/ApresentacionModal/ApresentacaoModal.jsx'
import Distrair from './Pages/Distrair/index.jsx'
import RedefinirSenha from './Pages/RedefinirSenha/index.jsx';
import NovaSenha from './Pages/NovaSenha/index.jsx';

export default function Roteamento() {

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Cadastro" element={<Cadastro/>}/>
            <Route path="/Noticias" element={<Saude/>}/>
            <Route path="/TESTCOMP" element={<ApresentationModal/>}/>


            <Route path="/Distrair" element={<Distrair/>}/>
            <Route path="/esqueci-senha" element={<RedefinirSenha/>}/> 
            <Route path="/nova-senha" element={<NovaSenha/>}/>

        </Routes>
    </BrowserRouter>
    )
}
