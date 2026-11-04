import { useState } from 'react';
import axios from 'axios';
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

    const MAPA_VICIOS = {
        "Apostas": 1, 
        "Vape / Cigarro": 2, 
        "Álcool": 3, 
        "Drogas ilícitas": 4
    };

    const habitosPadrao = ["Apostas", "Vape / Cigarro", "Álcool", "Drogas ilícitas", "Outro"];

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([]);
    const [habitosCustomizados, setHabitosCustomizados] = useState([]);

    const [mostrarInputOutro, setMostrarInputOutro] = useState(false);
    const [textoOutro, setTextoOutro] = useState('');

    const [itemEditando, setItemEditando] = useState(null);
    const [textoEdicao, setTextoEdicao] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [erroEnvio, setErroEnvio] = useState('');

    const API_URL = 'http://localhost:5021';

    function avancarPagina() {
        if (paginaAtual < TextoMODAL.length) {
            setPaginaAtual(paginaAtual + 1);
        }
    }

    function escolherOpcao(opcaoClicada) {
        if (opcaoClicada === "Outro") {
            setMostrarInputOutro(!mostrarInputOutro);
            setTextoOutro('');
            setErroEnvio('');
            return;
        }

        if (opcoesSelecionadas.includes(opcaoClicada)) {
            setOpcoesSelecionadas(prev => prev.filter(item => item !== opcaoClicada));
        } else {
            setOpcoesSelecionadas(prev => [...prev, opcaoClicada]);
        }
    }

    function adicionarNovoHabito() {
        const textoLimpo = textoOutro.trim();
        const normalizar = (valor) => valor.toLocaleLowerCase('pt-BR');
        const jaExiste = [...habitosPadrao, ...habitosCustomizados]
            .some(item => normalizar(item) === normalizar(textoLimpo));

        if (!textoLimpo) {
            setErroEnvio('Digite o nome do hábito.');
            return;
        }
        if (textoLimpo.length > 100) {
            setErroEnvio('O nome do hábito deve ter no máximo 100 caracteres.');
            return;
        }
        if (jaExiste) {
            setErroEnvio('Esse hábito já está na lista.');
            return;
        }

        setHabitosCustomizados(prev => [...prev, textoLimpo]);
        setOpcoesSelecionadas(prev => [...prev, textoLimpo]);
        setTextoOutro('');
        setMostrarInputOutro(false);
        setErroEnvio('');
    }

    function excluirHabito(habitoParaExcluir, evento) {
        evento.stopPropagation();
        setHabitosCustomizados(prev => prev.filter(item => item !== habitoParaExcluir));
        setOpcoesSelecionadas(prev => prev.filter(item => item !== habitoParaExcluir));
    }

    function iniciarEdicao(habito, evento) {
        evento.stopPropagation();
        setItemEditando(habito);
        setTextoEdicao(habito);
    }

    function salvarEdicao(habitoAntigo) {
        const novoTexto = textoEdicao.trim();
        const normalizar = (valor) => valor.toLocaleLowerCase('pt-BR');
        const jaExiste = [...habitosPadrao, ...habitosCustomizados]
            .some(item => item !== habitoAntigo && normalizar(item) === normalizar(novoTexto));

        if (!novoTexto) {
            setErroEnvio('O nome do hábito não pode ficar vazio.');
            return;
        }
        if (novoTexto.length > 100) {
            setErroEnvio('O nome do hábito deve ter no máximo 100 caracteres.');
            return;
        }
        if (jaExiste) {
            setErroEnvio('Já existe um hábito com esse nome.');
            return;
        }

        setHabitosCustomizados(prev => prev.map(item => item === habitoAntigo ? novoTexto : item));
        setOpcoesSelecionadas(prev => prev.map(item => item === habitoAntigo ? novoTexto : item));
        setItemEditando(null);
        setTextoEdicao('');
        setErroEnvio('');
    }

    async function concluirCadastro() {
        if (enviando) return;

        if (opcoesSelecionadas.length === 0) {
            setErroEnvio('Selecione ao menos um hábito para continuar.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setErroEnvio('Sua sessão não foi encontrada. Entre novamente na sua conta.');
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const hoje = new Date();
        const dataInicio = [
            hoje.getFullYear(),
            String(hoje.getMonth() + 1).padStart(2, '0'),
            String(hoje.getDate()).padStart(2, '0')
        ].join('-');

        setEnviando(true);
        setErroEnvio('');

        try {
            for (const opcao of opcoesSelecionadas) {
                const idDoVicio = MAPA_VICIOS[opcao];

                if (idDoVicio !== undefined) {
                    await axios.post(`${API_URL}/userVicio`, {
                        VicioID: idDoVicio,
                        dataInicio
                    }, config);
                } else {
                    await axios.post(`${API_URL}/userVicioPersonalizado`, {
                        nomeVicio: opcao,
                        dataInicio
                    }, config);
                }
            }

            await axios.post(`${API_URL}/apresentacao/concluir`, {}, config);
            if (onComplete) onComplete();
        } catch (error) {
            console.error('Erro no envio dos hábitos:', error.response?.data || error);
            const mensagem = error.response?.data?.erro
                || error.response?.data?.mensagem
                || error.message;
            setErroEnvio(`Não foi possível salvar os hábitos. ${mensagem}`);
        } finally {
            setEnviando(false);
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
                                                maxLength={100}
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

                        {mostrarInputOutro && (
                            <div className="campo-adicionar-outro">
                                <input 
                                    type="text" 
                                    placeholder="Digite o hábito..."
                                    maxLength={100}
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

                    {erroEnvio && <p className="mensagem-erro" role="alert">{erroEnvio}</p>}

                    <div className="rodape-form">
                        <button className="botao-azul" onClick={concluirCadastro} disabled={enviando}>
                            {enviando ? 'Salvando...' : 'Concluir'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}