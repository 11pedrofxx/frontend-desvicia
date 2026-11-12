
import { useState } from 'react';
import Cabecalho from '../../components/Cabecalho';

import {
    ClipboardList,
    CircleAlert,
    ChevronRight,
    Trash2,
    Plus,
    X,
    Phone
} from 'lucide-react';

import {
    listarContatos,
    adicionarContato,
    removerContato
} from '../../service/api';

import './index.scss';
import toast from 'react-hot-toast';

export default function Apoio() {
    const [contatos, setContatos] = useState([]);
    const [mostrarContatos, setMostrarContatos] = useState(false);
    const [mostrarEmergencia, setMostrarEmergencia] = useState(false);

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    async function abrirListaApoio() {
        try {
            const dados = await listarContatos();

            setContatos(dados);
            setMostrarContatos(true);
        } catch (erro) {
            console.error('Erro ao buscar contatos:', erro);
        }
    }

    async function cadastrarContato() {
        if (!nome.trim() || !telefone.trim()) {
            toast.error('Preencha o nome e o telefone do contato.')
            return;
        }

        try {
            await adicionarContato(nome, telefone);

            setNome('');
            setTelefone('');

            const dados = await listarContatos();
            setContatos(dados);
        } catch (erro) {
            console.error('Erro ao adicionar contato:', erro);
        }
    }

    async function excluirContato(id) {
        try {
            await removerContato(id);

            const dados = await listarContatos();
            setContatos(dados);
        } catch (erro) {
            console.error('Erro ao remover contato:', erro);
        }
    }

    function abrirAjudaEmergencial() {
        setMostrarEmergencia(true);
    }

    return (
        <main className="pagina-apoio">

            <Cabecalho
                titulo="Apoio"
                subtitulo="Você não está sozinho. Se este momento estiver difícil ou se você estiver lidando com um forte impulso, escolha uma das opções abaixo."
            />


            <section className="opcoes-apoio">

                <button
                    className="card-apoio"
                    onClick={abrirListaApoio}
                >
                    <div className="icone-apoio">
                        <ClipboardList size={23} />
                    </div>

                    <div className="texto-apoio">
                        <h3>Minha lista de apoio</h3>

                        <p>
                            Acessar meus contatos de apoio
                        </p>
                    </div>

                    <ChevronRight
                        className="seta-apoio"
                        size={23}
                    />
                </button>


                <button
                    className="card-apoio card-emergencial"
                    onClick={abrirAjudaEmergencial}
                >
                    <div className="icone-apoio icone-emergencial">
                        <CircleAlert size={23} />
                    </div>

                    <div className="texto-apoio">
                        <h3>Ajuda emergencial imediata</h3>

                        <p>
                            Canais especializados e serviços públicos
                        </p>
                    </div>

                    <ChevronRight
                        className="seta-apoio"
                        size={23}
                    />
                </button>

            </section>


            {/* MODAL DA LISTA DE APOIO */}

            {mostrarContatos && (
                <div
                    className="modal-overlay"
                    onClick={() => setMostrarContatos(false)}
                >
                    <section
                        className="modal-contatos"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <div className="titulo-contatos">

                            <div>
                                <h2>Minha lista de apoio</h2>

                                <p>
                                    Pessoas que você pode procurar quando precisar.
                                </p>
                            </div>

                            <button
                                className="fechar-modal"
                                onClick={() => setMostrarContatos(false)}
                                aria-label="Fechar"
                            >
                                <X size={21} />
                            </button>

                        </div>


                        <div className="form-contato">

                            <input
                                type="text"
                                placeholder="Nome do contato"
                                value={nome}
                                onChange={(event) =>
                                    setNome(event.target.value)
                                }
                            />

                            <input
                                type="text"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(event) =>
                                    setTelefone(event.target.value)
                                }
                            />

                            <button onClick={cadastrarContato}>
                                <Plus size={18} />
                                Adicionar contato
                            </button>

                        </div>


                        <div className="contatos-cadastrados">

                            {contatos.length === 0 ? (

                                <p className="sem-contatos">
                                    Você ainda não possui contatos cadastrados.
                                </p>

                            ) : (

                                contatos.map((contato) => (

                                    <div
                                        className="contato-item"
                                        key={contato.id}
                                    >

                                        <div>
                                            <strong>
                                                {contato.nome}
                                            </strong>

                                            <span>
                                                {contato.telefone}
                                            </span>
                                        </div>


                                        <button
                                            onClick={() =>
                                                excluirContato(contato.id)
                                            }
                                            aria-label={`Excluir ${contato.nome}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                ))

                            )}

                        </div>

                    </section>
                </div>
            )}


            {mostrarEmergencia && (
                <div
                    className="modal-overlay"
                    onClick={() => setMostrarEmergencia(false)}
                >
                    <section
                        className="modal-emergencia"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <div className="titulo-emergencia">

                            <div className="icone-modal-emergencia">
                                <CircleAlert size={24} />
                            </div>

                            <div>
                                <h2>Ajuda emergencial</h2>

                                <p>
                                    Se você precisar de apoio emocional,
                                    o CVV pode ajudar.
                                </p>
                            </div>

                            <button
                                className="fechar-modal"
                                onClick={() => setMostrarEmergencia(false)}
                                aria-label="Fechar"
                            >
                                <X size={21} />
                            </button>

                        </div>


                        <div className="cvv-card">

                            <div className="cvv-icone">
                                <Phone size={24} />
                            </div>

                            <div className="cvv-texto">

                                <span>Centro de Valorização da Vida</span>

                                <strong>188</strong>

                                <p>
                                    Apoio emocional e prevenção do suicídio.
                                </p>

                            </div>

                        </div>


                        <a
                            className="botao-ligar"
                            href="tel:188"
                        >
                            <Phone size={18} />
                            Ligar para o CVV
                        </a>


                        <p className="aviso-emergencia">
                            Em uma situação de emergência ou risco imediato,
                            procure um serviço de emergência ou peça ajuda
                            a alguém de confiança.
                        </p>

                    </section>
                </div>
            )}


            <div className="aviso-apoio">

                <p>
                    Nossos canais apoiam na autogestão emocional,
                    mas não substituem serviços públicos de
                    emergência médica ou psicológica.
                </p>

            </div>

        </main>
    );
}
