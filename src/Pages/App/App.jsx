import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import api from '../../service/api';
import './index.scss';
import ApresentationModal from '../../components/ApresentacionModal/ApresentacaoModal.jsx';

function Icone({ nome, tamanho = 22 }) {
    const desenhos = {
        editar: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z" /></>,
        alerta: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></>,
        apoio: <><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
        seta: <path d="m9 18 6-6-6-6" />
    };

    return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {desenhos[nome]}
        </svg>
    );
}

function criarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function formatarData(valor) {
    if (!valor) return '';
    if (typeof valor === 'string') return valor.slice(0, 10);
    return criarData(new Date(valor));
}

function pegarIdToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]))?.id || null;
    } catch {
        return null;
    }
}

export default function App() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [checkins, setCheckins] = useState([]);
    const [diasOfensiva, setDiasOfensiva] = useState(null);
    const [mostrarApresentacao, setMostrarApresentacao] = useState(false);

    const navigate = useNavigate();
    const horas = new Date().getHours();
    const saudacao = horas >= 6 && horas < 12 ? 'Bom dia' : horas >= 12 && horas < 18 ? 'Boa tarde' : 'Boa noite';

    useEffect(() => {
        async function buscarDados() {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            const config = { headers: { Authorization: `Bearer ${token}` } };
            let idUsuario = pegarIdToken(token);

            try {
                const res = await api.get('/usuario', config);
                setNomeUsuario(res.data.nome || '');
                idUsuario = res.data.id || idUsuario;
            } catch (err) {
                console.error('Erro ao carregar usuário:', err);
            }

            try {
                if (idUsuario) {
                    const res = await api.get(`/checkins/${idUsuario}`, config);
                    setCheckins(Array.isArray(res.data) ? res.data : []);
                }
            } catch (err) {
                console.error('Erro ao buscar check-ins:', err);
            }

            try {
                const res = await api.get('/ofensiva', config);
                setDiasOfensiva(Number(res.data?.ofensiva_atual ?? 0));
            } catch (err) {
                console.error('Erro ao buscar ofensiva:', err);
                setDiasOfensiva(0);
            }

            try {
                const res = await api.get('/apresentacao/status', config);
                setMostrarApresentacao(!res.data.viuApresentacao);
            } catch (err) {
                console.error('Erro ao consultar apresentação:', err);
            }
        }

        buscarDados();
    }, [navigate]);

    const hoje = new Date();
    const hojeChave = criarData(hoje);
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());

    const datasCheckins = checkins.map(item => formatarData(item.data_checkin));
    const fogoAtivo = (diasOfensiva ?? 0) > 0 && datasCheckins.includes(hojeChave);

    const semana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, index) => {
        const data = new Date(inicioSemana);
        data.setDate(inicioSemana.getDate() + index);
        const chave = criarData(data);

        return {
            dia,
            chave,
            hoje: chave === hojeChave,
            feito: datasCheckins.includes(chave)
        };
    });

    return (
        <div className="Perfil">
            {mostrarApresentacao && (
                <ApresentationModal onComplete={() => setMostrarApresentacao(false)} />
            )}

            <main className="Conteudo">
                <header className="Topo">
                    <div className="Bem-vindo-site">
                        <h1>{saudacao}, {nomeUsuario}!</h1>
                        <img className="emoji-mao" src="/assets/emojis/Balanco_Mao.png" alt="" />
                    </div>
                </header>

                <section className="Semana">
                    <div className="Topo-semana">
                        <div className="Texto-topo-semana">
                            <h2>Meu acompanhamento</h2>
                            <p>
                                {diasOfensiva === null
                                    ? 'Carregando seu acompanhamento...'
                                    : `Você está há ${diasOfensiva} ${diasOfensiva === 1 ? 'dia' : 'dias'} longe do seu vício. Continue assim!`}
                            </p>
                        </div>

                        <div className="Selo-ofensiva" aria-label={`${diasOfensiva ?? 'Carregando'} dias de sequência`}>
                            <div className="Selo-ofensiva__fogo" aria-hidden="true">
                                <img
                                    className="Selo-ofensiva__gif"
                                    src={fogoAtivo ? '/assets/gif/Fire.gif' : '/assets/gif/Frame-Fire.png'}
                                    alt="Fogo de sequência"
                                />
                            </div>

                            <span className="Selo-ofensiva__valor">
                                <strong>{diasOfensiva === null ? '—' : diasOfensiva}</strong>
                                <span>{diasOfensiva === 1 ? 'DIA' : 'DIAS'}</span>
                            </span>
                        </div>
                    </div>

                    <div className="Dias-semana">
                        {semana.map((dia) => (
                            <div className="Dia" key={dia.chave} title={dia.chave}>
                                <div className={`Bolinha ${dia.feito ? 'feito' : dia.hoje ? 'hoje' : 'vazio'}`}>
                                    {dia.feito ? '✓' : dia.hoje ? <span /> : ''}
                                </div>
                                <span className={dia.hoje ? 'dia-atual' : ''}>{dia.dia}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="Rede">
                    <h2>Rede de apoio Desvicia</h2>
                    <div className="Texto-rede">
                        <Icone nome="apoio" tamanho={25} />
                        <p>
                            Acesse a rede de apoio para conversar com pessoas reais
                            sobre seus problemas e ver relatos que possam te ajudar
                            nessa batalha.
                        </p>
                    </div>
                </section>

                <section className="Hoje">
                    <h2>Hoje</h2>
                    <div className="Acoes">
                        <button type="button" className="Acao" onClick={() => navigate('/registro-diario')}>
                            <div className="Icone-acao azul">
                                <Icone nome="editar" tamanho={22} />
                            </div>
                            <div className="Texto-acao">
                                <h3>Registrar como foi meu dia</h3>
                                <p>Acompanhe seu progresso e conquistas.</p>
                            </div>
                            <Icone nome="seta" tamanho={20} />
                        </button>

                        <button type="button" className="Acao" onClick={() => navigate('/gatilhos')}>
                            <div className="Icone-acao amarelo">
                                <Icone nome="alerta" tamanho={22} />
                            </div>
                            <div className="Texto-acao">
                                <h3>Registrar uma vontade/gatilho</h3>
                                <p>Sentiu impulso? Anote para desarmá-lo.</p>
                            </div>
                            <Icone nome="seta" tamanho={20} />
                        </button>
                    </div>
                </section>

                <section className="Ajuda">
                    <div className="Icone-ajuda">
                        <Icone nome="alerta" tamanho={23} />
                    </div>
                    <div className="Texto-ajuda">
                        <h2>Precisa de ajuda agora?</h2>
                        <p>Saiba que você não está sozinho. Entre em contato com alguém.</p>
                    </div>
                    <Link to="/apoio" className="Botao-apoio">Apoio</Link>
                </section>
            </main>
        </div>
    );
}