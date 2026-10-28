
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import './apresentacao.scss';

export default function ApresentationModal(){
const TextoMODAL = [ 
    {
        titulo:"Desvicia",
        text:"Olá seja bem-vindo ao nosso site, avance as etapas e conheça o nosso site."
    },

    {
        titulo:"Cuide de você no seu ritmo.",
        text:"O Equilibra ajuda você a compreender seus hábitos, reconhecer gatilhos emocionais e construir rotinas mais saudáveis, com segurança e acolhimento."
    },

    {
        titulo:"Entenda seus padrões.",
        text:"Acompanhe sua evolução diária, entenda as situações que geram vontade e desenvolva a autopercepção para agir de forma consciente."
    },

    {
        titulo:"Você não está sozinho.",
        text:"Sempre que as coisas ficarem difíceis, você terá acesso imediato a ferramentas de suporte, técnicas de respiração e canais de ajuda especializados."
    }
 ]

 const [Avancar, setAvancar] = useState('');
 const [paginaAtual, setPaginaAtual] = useState(0);

    function AvancoPAG(){

        if(paginaAtual < TextoMODAL.length){setPaginaAtual(paginaAtual +1);}
    };

    return(

        
        
        <div className='ApresentacaoMod'>
            <div>
                <div className='TUFOS'>

                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>
                    <div className='quadrado'></div>

                </div>

                {paginaAtual < TextoMODAL.length ? (
                    <div className='QUADRADO--MODAL-APRESENTACAO'>
                        <div>
                            <h1>{TextoMODAL[paginaAtual].titulo}</h1>
                            <p>{TextoMODAL[paginaAtual].text}</p>
                            <button onClick={AvancoPAG}>Avance</button>
                        </div>
                    </div>) : (
                    
                    <div className='QUADRADO--MODAL-APRESENTACAO-2'>
                        <h1>olá</h1>
                    </div>

                )}

            </div>
        </div>
    )
}