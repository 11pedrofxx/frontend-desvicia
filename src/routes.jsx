import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './Pages/App/App.jsx'
import Login from './Pages/Login/index.jsx'
import Cadastro from './Pages/Cadastro'
import Saude from "./Pages/Noticias/saude.jsx";


export default function Roteamento() {

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Cadastro" element={<Cadastro/>}/>
            <Route path="/Noticias" element={<Saude/>}/>

        </Routes>
    </BrowserRouter>
    )
}