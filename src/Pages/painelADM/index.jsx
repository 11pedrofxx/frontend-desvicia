import { useState, useEffect } from 'react';
import api from '../../service/api';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PainelAdministrativo() {

    const navigate = useNavigate();
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalCheckins, setTotalCheckins] = useState(0);
    const [mediaSequencia, setMediaSequencia] = useState(0);
    const [listaGatilhos, setListaGatilhos] = useState([]);
    const [dadosHumor, setDadosHumor] = useState({ mediaGeral: 0, distribuicao: [] });

    useEffect(() => {
        const token = localStorage.getItem('admToken');
        if (!token) {
            toast.error('Você não tem acesso a essa página');
            navigate('/');
        }
    }, [navigate]);

    async function carregarDadosPainel() {
        try {
            const respostaUsuarios = await api.get('/todosUsuarios');
            const respostaCheckins = await api.get('/TodosCheckins');
            const respostaOfensiva = await api.get('/mediaOfensiva');
            const respostaGatilhos = await api.get('/mediaGatilho');
            const respostaHumor = await api.get('/mediaHumor');

            const extrairNumero = (dados) => {
                if (typeof dados === 'number') return dados;
                if (!dados) return 0;
                if (Array.isArray(dados)) return dados[0] ? Object.values(dados[0])[0] : 0;
                if (typeof dados === 'object') {
                    const valores = Object.values(dados);
                    return typeof valores[0] === 'number' ? valores[0] : 0;
                }
                return Number(dados) || 0;
            };

            setTotalUsuarios(extrairNumero(respostaUsuarios.data));
            setTotalCheckins(extrairNumero(respostaCheckins.data));
            setMediaSequencia(extrairNumero(respostaOfensiva.data));

            setListaGatilhos(Array.isArray(respostaGatilhos.data) ? respostaGatilhos.data : []);

            const distribuicaoArray = Array.isArray(respostaHumor.data) ? respostaHumor.data : [];

            let somaTotal = 0;
            let qtdTotal = 0;
            distribuicaoArray.forEach(item => {
                somaTotal += Number(item.nivel_humor) * Number(item.total);
                qtdTotal += Number(item.total);
            });
            const mediaGeralCalculada = qtdTotal > 0 ? (somaTotal / qtdTotal).toFixed(1) : 0;

            setDadosHumor({
                mediaGeral: mediaGeralCalculada,
                distribuicao: distribuicaoArray
            });

        } catch (erro) {
            console.error('Erro ao carregar dados do painel', erro);
        }
    }

    useEffect(() => {
        carregarDadosPainel();
    }, []);

    return (
        <div className="painel-administrativo">
            <header className="cabecalho-topo">
                <div className="logo-area">
                    <span className="logo-titulo">DESVICIA</span>
                    <span className="badge-admin">ADMIN</span>
                </div>
            </header>

            <div className="conteudo-principal">
                <div className="cabecalho-painel">
                    <span>VISÃO GERAL DA COMUNIDADE</span>
                    <h1>Painel Administrativo</h1>
                    <p>Visão geral das estatísticas e métricas da comunidade DESVICIA.</p>
                </div>

                <div className="cards-superiores">
                    <div className="card-metrica">
                        <span>Contas criadas</span>
                        <h2>{totalUsuarios}</h2>
                    </div>
                    <div className="card-metrica">
                        <span>Check-ins realizados</span>
                        <h2>{totalCheckins}</h2>
                    </div>
                    <div className="card-metrica">
                        <span>Sequência média</span>
                        <h2>{Number(mediaSequencia).toFixed(1)} <small>dias</small></h2>
                    </div>
                </div>

                <div className="blocos-inferiores">
                    <div className="bloco-card">
                        <h3>Gatilhos Mais Frequentes</h3>
                        <p>O que a comunidade mais relatou nos check-ins</p>

                        <div className="lista-gatilhos">
                            {listaGatilhos.map((item, indice) => (
                                <div key={indice} className="linha-gatilho">
                                    <div className="info-gatilho">
                                        <span>{item.gatilho}</span>
                                        <span>{Number(item.porcentagem || 0).toFixed(0)}%</span>
                                    </div>
                                    <div className="barra-progresso">
                                        <div
                                            className="preenchimento"
                                            style={{ width: `${item.porcentagem || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bloco-card">
                        <h3>Como está a comunidade?</h3>
                        <p>Média de humor registrada nos check-ins</p>

                        <div className="destaque-media">
                            <h2>{dadosHumor.mediaGeral}</h2>
                        </div>

                        <div className="distribuicao-humor">
                            {dadosHumor.distribuicao?.map((nivel, indice) => (
                                <div key={indice} className="coluna-humor">
                                    <span>{Number(nivel.media || 0).toFixed(0)}%</span>
                                    <div className="barra-coluna" style={{ height: `${nivel.media || 0}%` }}></div>
                                    <small>{nivel.nivel_humor}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}