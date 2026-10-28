import { useEffect, useState } from 'react';
import {
    Music,
    Footprints,
    MessageCircle,
    Gamepad2,
    Activity,
    Star,
    ChevronLeft,
    ChevronRight,
    PlusCircle
} from 'lucide-react';

import api from '../../service/api';
import './index.scss';

const icones = {
    'Ouvir música': Music,
    'Caminhar': Footprints,
    'Conversar com alguém': MessageCircle,
    'Jogar': Gamepad2,
    'Fazer exercício': Activity
};

export default function Atividades() {
    const [atividades, setAtividades] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erroCarregamento, setErroCarregamento] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [novaAtividade, setNovaAtividade] = useState('');
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
    const [salvando, setSalvando] = useState(false);

    async function carregarAtividades() {
        try {
            setErroCarregamento('');

            const resposta = await api.get('/estrategias');

            if (!Array.isArray(resposta.data)) {
                throw new Error(
                    'A API não retornou uma lista de estratégias.'
                );
            }

            setAtividades(resposta.data);
        } catch (erro) {
            console.error('Erro ao carregar estratégias:', erro);

            setErroCarregamento(
                erro.response?.data?.erro ||
                erro.response?.data?.error ||
                erro.response?.data?.mensagem ||
                'Não foi possível carregar as atividades.'
            );
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarAtividades();
    }, []);

    async function criarAtividade(e) {
        e.preventDefault();

        const titulo = novaAtividade.trim();

        if (!titulo) {
            return;
        }

        try {
            setSalvando(true);

            await api.post('/estrategia', { titulo });

            setNovaAtividade('');
            setMostrarFormulario(false);
            setCarregando(true);

            await carregarAtividades();
        } catch (erro) {
            console.error('Erro ao criar estratégia:', erro);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <main className="atividades">
            <header className="atividades-cabecalho">
                <button
                    type="button"
                    className="botao-voltar"
                    onClick={() => window.history.back()}
                    aria-label="Voltar"
                >
                    <ChevronLeft size={22} />
                </button>

                <h1>Vamos distrair a mente?</h1>
            </header>

            <section className="mensagem-incentivo">
                <p>
                    Essa vontade vai passar. Vamos tentar
                    outra coisa por alguns minutos?
                </p>
            </section>

            <section className="lista-atividades">
                <h2>O que posso fazer agora?</h2>

                <p className="descricao">
                    Escolha uma atividade saudável para desviar
                    sua atenção do impulso.
                </p>

                {carregando ? (
                    <p>Carregando atividades...</p>
                ) : erroCarregamento ? (
                    <div className="erro-atividades">
                        <p>{erroCarregamento}</p>

                        <button
                            type="button"
                            onClick={() => {
                                setCarregando(true);
                                carregarAtividades();
                            }}
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : atividades.length === 0 ? (
                    <p>Nenhuma atividade encontrada.</p>
                ) : (
                    <div className="opcoes-atividades">
                        {atividades.map((atividade) => {
                            const Icone = icones[atividade.titulo] || Star;

                            return (
                                <button
                                    type="button"
                                    key={atividade.id}
                                    className={`atividade-card ${
                                        atividadeSelecionada === atividade.id
                                            ? 'selecionada'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setAtividadeSelecionada(atividade.id)
                                    }
                                >
                                    <span className="atividade-icone">
                                        <Icone size={19} strokeWidth={1.8} />
                                    </span>

                                    <span className="atividade-titulo">
                                        {atividade.titulo}
                                    </span>

                                    <ChevronRight
                                        className="atividade-seta"
                                        size={18}
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}

                {atividadeSelecionada !== null && (
                    <div className="atividade-confirmacao">
                        <p>
                            Boa escolha! Experimente essa atividade
                            por alguns minutos.
                        </p>

                        <button
                            type="button"
                            onClick={() => setAtividadeSelecionada(null)}
                        >
                            Entendi
                        </button>
                    </div>
                )}

                <button
                    type="button"
                    className="botao-personalizada"
                    onClick={() =>
                        setMostrarFormulario(!mostrarFormulario)
                    }
                >
                    <PlusCircle size={17} />
                    Criar atividade personalizada
                </button>

                {mostrarFormulario && (
                    <form
                        className="formulario-atividade"
                        onSubmit={criarAtividade}
                    >
                        <label htmlFor="nomeAtividade">
                            Nome da atividade
                        </label>

                        <input
                            id="nomeAtividade"
                            type="text"
                            placeholder="Ex.: Desenhar, ler um livro..."
                            value={novaAtividade}
                            onChange={(e) =>
                                setNovaAtividade(e.target.value)
                            }
                            maxLength={100}
                            required
                        />

                        <div className="formulario-botoes">
                            <button
                                type="submit"
                                disabled={salvando}
                            >
                                {salvando
                                    ? 'Salvando...'
                                    : 'Salvar atividade'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    setNovaAtividade('');
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
}