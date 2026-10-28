import { useState } from 'react';
import { Sparkles, MapPin, BarChart2, HeartHandshake, Check, Plus, X, Pencil } from 'lucide-react';
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

    const habitosPadrao = ["Apostas", "Vape / Cigarro", "Álcool", "Drogas ilícitas", "Outro"];

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([]);
    const [habitosCustomizados, setHabitosCustomizados] = useState([]);

    const [mostrarInputOutro, setMostrarInputOutro] = useState(false);
    const [textoOutro, setTextoOutro] = useState('');

    const [itemEditando, setItemEditando] = useState(null);
    const [textoEdicao, setTextoEdicao] = useState('');

    function avancarPagina() {
        if (paginaAtual < TextoMODAL.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    }

    function escolherOpcao(opcaoClicada) {
        if (opcaoClicada === "Outro") {
            setMostrarInputOutro(!mostrarInputOutro);
            setTextoOutro('');
            return;
        }

        if (opcoesSelecionadas.includes(opcaoClicada)) {
            setOpcoesSelecionadas(opcoesSelecionadas.filter(item => item !== opcaoClicada));
        } else {
            setOpcoesSelecionadas([...opcoesSelecionadas, opcaoClicada]);
        }
    }

    function adicionarNovoHabito() {
        const textoLimpo = textoOutro.trim();
        if (textoLimpo !== '' && !habitosCustomizados.includes(textoLimpo) && !habitosPadrao.includes(textoLimpo)) {
            setHabitosCustomizados([...habitosCustomizados, textoLimpo]);
            setOpcoesSelecionadas([...opcoesSelecionadas, textoLimpo]);
            setTextoOutro('');
            setMostrarInputOutro(false);
        }
    }

    function excluirHabito(habitoParaExcluir, evento) {
        evento.stopPropagation();
        setHabitosCustomizados(habitosCustomizados.filter(item => item !== habitoParaExcluir));
        setOpcoesSelecionadas(opcoesSelecionadas.filter(item => item !== habitoParaExcluir));
    }

    function iniciarEdicao(habito, evento) {
        evento.stopPropagation();
        setItemEditando(habito);
        setTextoEdicao(habito);
    }

    function salvarEdicao(habitoAntigo) {
        const novoTexto = textoEdicao.trim();
        if (novoTexto !== '' && novoTexto !== habitoAntigo) {
            setHabitosCustomizados(habitosCustomizados.map(item => item === habitoAntigo ? novoTexto : item));
            if (opcoesSelecionadas.includes(habitoAntigo)) {
                setOpcoesSelecionadas(opcoesSelecionadas.map(item => item === habitoAntigo ? novoTexto : item));
            }
        }
        setItemEditando(null);
        setTextoEdicao('');
    }

    function concluirCadastro() {
        if (onComplete) {
            onComplete(opcoesSelecionadas);
        }
    }

    const todosOsHabitos = [
        ...habitosPadrao.slice(0, -1),
        ...habitosCustomizados,
        "Outro"
    ];

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
                            {todosOsHabitos.map((opcao) => {
                                const eCustomizado = habitosCustomizados.includes(opcao);
                                const estaEditando = itemEditando === opcao;
                                const estaSelecionado = opcao === "Outro" ? mostrarInputOutro : opcoesSelecionadas.includes(opcao);

                                if (estaEditando) {
                                    return (
                                        <div key={opcao} className="item-em-edicao">
                                            <input 
                                                type="text" 
                                                value={textoEdicao}
                                                onChange={(e) => setTextoEdicao(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && salvarEdicao(opcao)}
                                                autoFocus
                                            />
                                            <button type="button" onClick={() => salvarEdicao(opcao)} title="Salvar">
                                                <Check size={16} />
                                            </button>
                                        </div>
                                    );
                                }

                                return (
                                    <div 
                                        key={opcao}
                                        className={`botao-opcao ${estaSelecionado ? 'selecionado' : ''}`}
                                        onClick={() => escolherOpcao(opcao)}
                                    >
                                        <span>{opcao}</span>
                                        
                                        {estaSelecionado && <Check size={16} className="icone-check" />}

                                        {}
                                        {eCustomizado && (
                                            <div className="acoes-customizadas">
                                                <button 
                                                    type="button" 
                                                    onClick={(e) => iniciarEdicao(opcao, e)}
                                                    title="Editar"
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={(e) => excluirHabito(opcao, e)}
                                                    title="Excluir"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {}
                        {mostrarInputOutro && (
                            <div className="campo-adicionar-outro">
                                <input 
                                    type="text" 
                                    placeholder="Digite o hábito..."
                                    value={textoOutro}
                                    onChange={(e) => setTextoOutro(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && adicionarNovoHabito()}
                                    autoFocus
                                />
                                <button type="button" onClick={adicionarNovoHabito}>
                                    <Plus size={20} />
                                </button>
                            </div>
                        )}
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