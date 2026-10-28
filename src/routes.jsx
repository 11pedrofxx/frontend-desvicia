import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './Pages/App/App.jsx'
import Login from './Pages/Login/index.jsx'
import Cadastro from './Pages/Cadastro'
import Saude from "./Pages/Noticias/saude.jsx";
import ApresentationModal from './components/ApresentacionModal/ApresentacaoModal.jsx'
import Distrair from './Pages/Distrair/index.jsx'

export default function Roteamento() {

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Cadastro" element={<Cadastro/>}/>
            <Route path="/Noticias" element={<Saude/>}/>
            <Route path="/TESTCOMP" element={<ApresentationModal/>}/> // pode apagar apenas para test
            <Route path="/Distrair" element={<Distrair/>}/>
            
        </Routes>
    </BrowserRouter>
    )
}