import { useState } from 'react';
import axios from 'axios';
import { Sparkles, MapPin, BarChart2, HeartHandshake, Check, Plus, X, Pencil } from 'lucide-react';
import './apresentacao.scss';

export default function ApresentationModal({ onComplete }) {
    const TextoMODAL = [
        {
            titulo: "Desvicia",
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
        if (textoLimpo.length > 50) {
            setErroEnvio('O nome do hábito deve ter no máximo 50 caracteres.');
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
        if (novoTexto.length > 50) {
            setErroEnvio('O nome do hábito deve ter no máximo 50 caracteres.');
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

    console.clear();
    console.log('========== DIAGNÓSTICO DO MODAL ==========');

    if (opcoesSelecionadas.length === 0) {
        setErroEnvio('Selecione pelo menos um hábito.');
        console.error('ERRO: Nenhum hábito selecionado.');
        return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
        setErroEnvio('Token não encontrado. Faça login novamente.');
        console.error('ERRO: Token não encontrado no localStorage.');
        return;
    }

    const hoje = new Date();

    const dataInicio = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, '0'),
        String(hoje.getDate()).padStart(2, '0')
    ].join('-');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        timeout: 15000
    };

    setEnviando(true);
    setErroEnvio('');

    try {
        console.log('1. API:', API_URL);
        console.log('2. Token encontrado:', !!token);
        console.log('3. Hábitos selecionados:', opcoesSelecionadas);
        console.log('4. Data de início:', dataInicio);

        for (const opcao of opcoesSelecionadas) {
            const idDoVicio = MAPA_VICIOS[opcao];

            console.log('--------------------------------');
            console.log('SALVANDO HÁBITO:', opcao);

            let resposta;

            if (idDoVicio !== undefined) {
                console.log('Tipo: Hábito padrão');
                console.log('ID:', idDoVicio);

                resposta = await axios.post(
                    `${API_URL}/userVicio`,
                    {
                        VicioID: idDoVicio,
                        dataInicio
                    },
                    config
                );

            } else {
                console.log('Tipo: Hábito personalizado');

                resposta = await axios.post(
                    `${API_URL}/userVicioPersonalizado`,
                    {
                        nomeVicio: opcao,
                        dataInicio
                    },
                    config
                );
            }

            console.log('HÁBITO SALVO:', resposta.status);
            console.log('RESPOSTA DO BACKEND:', resposta.data);
        }

        console.log('--------------------------------');
        console.log('CONCLUINDO APRESENTAÇÃO...');

        const respostaFinal = await axios.post(
            `${API_URL}/apresentacao/concluir`,
            {},
            config
        );

        console.log('APRESENTAÇÃO CONCLUÍDA!');
        console.log('RESPOSTA:', respostaFinal.data);

        console.log('========== TUDO SALVO COM SUCESSO ==========');

        if (onComplete) onComplete();

    } catch (error) {
        console.error('========== ERRO ENCONTRADO ==========');
        console.error('Mensagem:', error.message);
        console.error('Código:', error.code);
        console.error('URL:', error.config?.url);
        console.error('Método:', error.config?.method);
        console.error('Status HTTP:', error.response?.status);
        console.error('Resposta do servidor:', error.response?.data);
        console.error('Erro completo:', error);

        const mensagem =
            error.response?.data?.erro ||
            error.response?.data?.mensagem ||
            error.message;

        setErroEnvio(`Falha ao salvar: ${mensagem}`);

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

                        <button type="button" className="botao-azul" onClick={avancarPagina}>
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
                                                maxLength={50}
                                                value={textoEdicao}
                                                onChange={(e) => setTextoEdicao(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), salvarEdicao(opcao))}
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
                                    maxLength={50}
                                    value={textoOutro}
                                    onChange={(e) => setTextoOutro(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarNovoHabito())}
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
                        <button type="button" className="botao-azul" onClick={concluirCadastro} disabled={enviando}>
                            {enviando ? 'Salvando...' : 'Concluir'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}