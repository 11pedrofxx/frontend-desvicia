import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, PenSquare, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import ModalPost from '../../components/PostagemModal';
import './index.scss';

export default function RedeApoio() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);

    const [tipoPostagem, setTipoPostagem] = useState(""); 
    const [conteudoPost, setConteudoPost] = useState("");
    const [tituloConquista, setTituloConquista] = useState("");

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario") || localStorage.getItem("user");

        if (!usuarioSalvo) {
            toast.error('Você precisa fazer o cadastro para acessar a Rede de Apoio.');
            navigate("/primeiro-acesso");
            return;
        }

        try {
            const dadosUsuario = JSON.parse(usuarioSalvo);

            if (dadosUsuario.primeiro_acesso === true || !dadosUsuario?.foto_perfil || dadosUsuario.foto_perfil === '') {
                toast.error('Complete seu cadastro para acessar a rede.');
                navigate("/primeiro-acesso");
                return;
            }

            setUsuario(dadosUsuario);
        } catch (error) {
            localStorage.removeItem("usuario");
            localStorage.removeItem("user");
            navigate("/primeiro-acesso");
        } finally {
            setCarregando(false);
        }
    }, [navigate]);

    if (carregando || !usuario) {
        return null;
    }

    let listaDistracoes = "";
    if (usuario?.distracoes) {
        if (Array.isArray(usuario.distracoes)) {
            listaDistracoes = usuario.distracoes.join(", ");
        } else if (typeof usuario.distracoes === "string") {
            try {
                const dist = JSON.parse(usuario.distracoes);
                listaDistracoes = Array.isArray(dist) ? dist.join(", ") : usuario.distracoes;
            } catch {
                listaDistracoes = usuario.distracoes;
            }
        }
    }

    return (
        <div className='pagina-rede-apoio'>
            <div className='conteudo-rede'>
                
                <div className='card-perfil'>
                    <span className='titulo-card'>Seu Perfil na Comunidade</span>
                    
                    <div className='info-perfil'>
                        <div className='avatar-box'>
                            <img 
                                src={`/assets/avatares/${usuario?.foto_perfil}`} 
                                alt="Avatar" 
                            />
                        </div>

                        <div className='detalhes-perfil'>
                            <div className='linha-topo'>
                                <h2>{usuario?.nome_exibicao}</h2>
                                <button type='button' className='btn-editar'>Editar Perfil</button>
                            </div>

                            <span className='tag-vicio'>Vício em {usuario?.vicio_principal}</span>

                            {listaDistracoes && (
                                <p className='distracao-texto'>
                                    <Sparkles size={14} /> Distração: {listaDistracoes}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className='Postagem'>
                <div className='pergunta'>
                    <span className='avatar'>
                        <img 
                            src={`/assets/avatares/${usuario?.foto_perfil}`} 
                            alt="Avatar" 
                        />
                    </span>
                    <p className='pergunta-texto'
                    onClick={() => {
                        setTipoPostagem('relato');
                        setModalAberto(true);
                    }}
                    >Como está sendo seu dia hoje, {usuario?.nome_exibicao}?</p>
                </div>

                <div className='botoes-post'>
                    
                    <button type='button'
                    className='botao-acao'
                    onClick={() => {
                        setTipoPostagem('relato');
                        setModalAberto(true);
                    }}>
                        <PenSquare size={18} />
                        Escrever relato
                    </button>

                    <button type='button' className='botao-acao'
                    onClick={() => {
                        setTipoPostagem('conquista');
                        setModalAberto(true);
                    }}>
                        <Trophy size={18} />
                        Compartilhar conquista
                    </button>
                </div>
            </div>

            <div>
                <ModalPost 
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                tipoInicial={tipoPostagem}
                usuarioId={usuario?.id}
            />
            </div>
        </div>
    );
}