import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './Pages/App/App.jsx'

export default function Roteamento() {

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>

        </Routes>
    </BrowserRouter>
    )
}