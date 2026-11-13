
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import ApresentationModal from '../../components/ApresentacionModal/ApresentacaoModal.jsx';

const API_URL = 'http://localhost:5021';
const ROTA_CHECKIN = `${API_URL}/checkinDiario`;

function Icone({ nome, tamanho = 22 }) {
    const desenhos = {
        editar: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z" /></>,
        alerta: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></>,
        apoio: <><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
        seta: <path d="m9 18 6-6-6-6" />
    };

    return (
        <svg
            width={tamanho}
            height={tamanho}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
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

function pegarData(registro) {
    if (typeof registro === 'string') return registro.slice(0, 10);
    if (!registro) return '';

    const valor = registro.data_checkin || registro.dataCheckin || registro.data ||
        registro.data_registro || registro.created_at || registro.createdAt;

    if (!valor) return '';
    if (typeof valor === 'string') return valor.slice(0, 10);

    const data = new Date(valor);

    return Number.isNaN(data.getTime()) ? '' : criarData(data);
}

function pegarDias(valor) {
    const dados = Array.isArray(valor) ? valor[0] : valor;

    if (typeof dados === 'number') return dados;

    return Number(
        dados?.ofensiva_atual ??
        dados?.dias ??
        dados?.ofensiva ??
        dados?.diasOfensiva ??
        dados?.dias_ofensiva ??
        dados?.dias_consecutivos ??
        dados?.dias_sem_vicio ??
        dados?.total_dias ??
        0
    );
}

export default function App() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [checkins, setCheckins] = useState([]);
    const [diasOfensiva, setDiasOfensiva] = useState(null);
    const [mostrarApresentacao, setMostrarApresentacao] = useState(null);

    const navigate = useNavigate();

    const horas = new Date().getHours();

    const Ola = horas >= 6 && horas < 12
        ? 'Bom dia'
        : horas >= 12 && horas < 18
            ? 'Boa tarde'
            : 'Boa noite';

    useEffect(() => {
        async function buscarDados() {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const resposta = await axios.get(`${API_URL}/usuario`, config);
                setNomeUsuario(resposta.data.nome || '');
            } catch (error) {
                console.error('Erro ao carregar nome do usuário:', error);
            }

            try {
                const resposta = await axios.get(
                    `${ROTA_CHECKIN}/buscarCheckins`,
                    config
                );

                const lista = Array.isArray(resposta.data)
                    ? resposta.data
                    : resposta.data?.checkins ||
                    resposta.data?.registros ||
                    resposta.data?.dados ||
                    [];

                setCheckins(lista);

            } catch (error) {
                console.error('Erro ao buscar check-ins:', error);
            }

            try {
                const resposta = await axios.get(
                    `${API_URL}/ofensiva`,
                    config
                );

                const dias = pegarDias(resposta.data);

                setDiasOfensiva(dias);

                console.log('Sequência atual:', dias);

            } catch (error) {
                console.error('Erro ao buscar ofensiva:', error);
                setDiasOfensiva(0);
            }

            try {
                const resposta = await axios.get(
                    `${API_URL}/apresentacao/status`,
                    config
                );

                setMostrarApresentacao(!resposta.data.viuApresentacao);

            } catch (error) {
                console.error('Erro ao consultar apresentação:', error);
                setMostrarApresentacao(true);
            }
        }

        buscarDados();
    }, []);

    const hoje = new Date();
    const inicioSemana = new Date(hoje);

    inicioSemana.setDate(hoje.getDate() - hoje.getDay());

    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const datasCheckins = checkins.map(pegarData);

    const semana = diasSemana.map((dia, index) => {
        const data = new Date(inicioSemana);

        data.setDate(inicioSemana.getDate() + index);

        const chave = criarData(data);

        return {
            dia,
            chave,
            hoje: chave === criarData(hoje),
            feito: datasCheckins.includes(chave)
        };
    });

    return (
        <div className="Perfil">

            {mostrarApresentacao === true && (
                <ApresentationModal
                    onComplete={() => setMostrarApresentacao(false)}
                />
            )}

            <main className="Conteudo">

                <header className="Topo">
                    <div className="Bem-vindo-site">
                        <h1>{Ola}, {nomeUsuario}!</h1>

                        <img
                            className="emoji-mao"
                            src="../../assets/emojis/Balanco_Mao.png"
                            alt=""
                        />
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

                        <div
                            className="Selo-ofensiva"
                            aria-label={`${diasOfensiva ?? 'Carregando'} dias de sequência`}
                        >
                            <div className="Selo-ofensiva__fogo" aria-hidden="true">
                                <img
                                    className="Selo-ofensiva__gif"
                                    src="../../assets/gif/Fire.gif"
                                    alt="Fogo de sequência"
                                />
                            </div>

                            <span className="Selo-ofensiva__valor">
                                <strong>
                                    {diasOfensiva === null ? '—' : diasOfensiva}
                                </strong>

                                <span>
                                    {diasOfensiva === 1 ? 'DIA' : 'DIAS'}
                                </span>
                            </span>
                        </div>

                    </div>

                    <div className="Dias-semana">
                        {semana.map((dia) => (
                            <div
                                className="Dia"
                                key={dia.chave}
                                title={dia.chave}
                            >
                                <div
                                    className={`Bolinha ${dia.feito ? 'feito' : dia.hoje ? 'hoje' : 'vazio'
                                        }`}
                                >
                                    {dia.feito
                                        ? '✓'
                                        : dia.hoje
                                            ? <span />
                                            : ''}
                                </div>

                                <span className={dia.hoje ? 'dia-atual' : ''}>
                                    {dia.dia}
                                </span>
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

                        <button
                            type="button"
                            className="Acao"
                            onClick={() => navigate('/registro-diario')}
                        >
                            <div className="Icone-acao azul">
                                <Icone nome="editar" tamanho={22} />
                            </div>

                            <div className="Texto-acao">
                                <h3>Registrar como foi meu dia</h3>
                                <p>Acompanhe seu progresso e conquistas.</p>
                            </div>

                            <Icone nome="seta" tamanho={20} />
                        </button>

                        <button
                            type="button"
                            className="Acao"
                            onClick={() => navigate('/gatilhos')}
                        >
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
                        <p>
                            Saiba que você não está sozinho. Entre em contato com alguém.
                        </p>
                    </div>

                    <a href="/apoio" className="Botao-apoio">
                        Apoio
                    </a>

                </section>

            </main>
        </div>
    );
}
