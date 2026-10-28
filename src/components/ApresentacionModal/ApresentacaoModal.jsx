import { useState } from 'react';
import { Sparkles, MapPin, BarChart2, HeartHandshake, Check } from 'lucide-react';
import './apresentacao.scss';

export default function ApresentationModal({ onComplete }) {
    const TextoMODAL = [
        {
            titulo: "Equilibra",
            text: "Um passo de cada vez. Avance as etapas e conheça o nosso espaço seguro.",
            icon: <Sparkles size={48} />,
            textoBotao: "Começar"
        },
        {
            titulo: "Cuide de você no seu ritmo.",
            text: "O Equilibra ajuda você a compreender seus hábitos, reconhecer gatilhos emocionais e construir rotinas mais saudáveis, com segurança e acolhimento.",
            icon: <MapPin size={48} />,
            textoBotao: "Continuar"
        },
        {
            titulo: "Entenda seus padrões.",
            text: "Acompanhe sua evolução diária, entenda as situações que geram vontade e desenvolva a autopercepção para agir de forma consciente.",
            icon: <BarChart2 size={48} />,
            textoBotao: "Continuar"
        },
        {
            titulo: "Você não está sozinho.",
            text: "Sempre que as coisas ficarem difíceis, você terá acesso imediato a ferramentas de suporte, técnicas de respiração e canais de ajuda especializados.",
            icon: <HeartHandshake size={48} />,
            textoBotao: "Começar"
        }
    ];

    const listaDeComportamentos = [
        "Apostas",
        "Vape / Cigarro",
        "Álcool",
        "Drogas ilícitas",
        "Outro"
    ];

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([]);

    function avancarPagina() {
        if (paginaAtual < TextoMODAL.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    }

    function escolherOpcao(opcaoClicada) {
        if (opcoesSelecionadas.includes(opcaoClicada)) {
            const novasOpcoes = opcoesSelecionadas.filter(item => item !== opcaoClicada);
            setOpcoesSelecionadas(novasOpcoes);
        } else {
            setOpcoesSelecionadas([...opcoesSelecionadas, opcaoClicada]);
        }
    }

    function concluirCadastro() {
        console.log("Comportamentos escolhidos:", opcoesSelecionadas);
        if (onComplete) {
            onComplete(opcoesSelecionadas);
        }
    }

    return (
        <div className='ApresentacaoMod'>
            {paginaAtual < TextoMODAL.length ? (

                <div className='cartao-modal centralizado'>
                    <div className="circulo-icone">
                        {TextoMODAL[paginaAtual].icon}
                    </div>

                    <h1>{TextoMODAL[paginaAtual].titulo}</h1>
                    <p>{TextoMODAL[paginaAtual].text}</p>

                    <div className="area-inferior">
                        <div className="bolinhas-progresso">
                            {TextoMODAL.map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`bolinha ${paginaAtual === index ? 'ativa' : ''}`}
                                ></div>
                            ))}
                        </div>

                        <button className="botao-azul" onClick={avancarPagina}>
                            {TextoMODAL[paginaAtual].textoBotao}
                        </button>
                    </div>
                </div>
            ) : (

                <div className='cartao-modal alinhado-esquerda'>
                    <div className="cabecalho-form">
                        <h1>Configure seu perfil</h1>
                        <p>Esta é uma zona segura e privada.</p>
                    </div>

                    <div className="campo-formulario">
                        <label>O que você gostaria de acompanhar?</label>
                        <span className="dica">Selecione uma ou mais opções:</span>
                        
                        <div className="area-opcoes">
                            {listaDeComportamentos.map((opcao) => (
                                <button 
                                    key={opcao}
                                    type="button"
                                    className={`botao-opcao ${opcoesSelecionadas.includes(opcao) ? 'selecionado' : ''}`}
                                    onClick={() => escolherOpcao(opcao)}
                                >
                                    {opcao}
                                    {opcoesSelecionadas.includes(opcao) && <Check size={18} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rodape-form">
                        <button className="botao-azul" onClick={concluirCadastro}>
                            Concluir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}