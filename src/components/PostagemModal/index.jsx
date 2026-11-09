import { useState } from "react";
import { Loader2 } from "lucide-react";
import api from '../../service/api.js';
import toast from "react-hot-toast";
import './index.scss';

export default function ModalPost({ isOpen, onClose, tipoInicial, usuarioId }) {

    const [tituloPost, setTituloPost] = useState("");
    const [conteudoPost, setConteudoPost] = useState("");
    const [carregando, setCarregando] = useState(false);

    if (!isOpen) return null;

    async function Enviar(e) {
        e.preventDefault();
        setCarregando(true);
        
        const json = {
            usuario_id: usuarioId,
            categoria: "GLOBAL",
            tipo: tipoInicial ? tipoInicial.toUpperCase() : "RELATO",
            titulo: tituloPost,
            conteudo: conteudoPost,
            titulo_conquista: null,
            subtitulo_conquista: null
        };
        
        try {
            await api.post('/Postar', json);
            setTituloPost("");
            setConteudoPost("");
            toast.success('Sua postagem foi realizada com sucesso!')
            onClose();

        } catch (err) {
    
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-caixa'>
                <div className='modal-topo'>
                    <h3>Escrever Postagem</h3>
                    <button type='button' className='btn-fechar' onClick={onClose}>×</button>
                </div>

                <form onSubmit={Enviar}>
                    
                    <div className='campo-grupo'>
                        <label>Título</label>
                        <input 
                            type="text" 
                            placeholder="Dê um título para sua postagem..." 
                            value={tituloPost}
                            onChange={(e) => setTituloPost(e.target.value)}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className='campo-grupo'>
                        <label>Conteúdo</label>
                        <input type="text" 
                            placeholder="Compartilhe o que está pensando..."
                            value={conteudoPost}
                            onChange={(e) => setConteudoPost(e.target.value)}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className='modal-botoes'>
                        <button 
                            type='button' 
                            className='botao-cancelar' 
                            onClick={onClose}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>
                        
                        <button 
                            type='submit' 
                            className='botao-publicar'
                            disabled={carregando}
                        >
                            {carregando ? (
                                <>
                                    <Loader2 className="icone-girando" size={18} /> Publicando...
                                </>
                            ) : (
                                'Publicar'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}