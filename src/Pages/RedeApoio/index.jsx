import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, PenSquare, Trophy, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ModalPost from "../../components/PostagemModal";
import api from "../../service/api";
import "./index.scss";

export default function RedeApoio() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  const [tipoPostagem, setTipoPostagem] = useState("");

  const [postagens, setPostagens] = useState([]);
  const [categoriaAtual, setCategoriaAtual] = useState("Global");

  const [atualizarFeed, setAtualizarFeed] = useState(false);

  useEffect(() => {
    const usuarioSalvo =
      localStorage.getItem("usuario") || localStorage.getItem("user");

    if (!usuarioSalvo) {
      toast.error(
        "Você precisa fazer o cadastro para acessar a Rede de Apoio.",
      );
      navigate("/primeiro-acesso");
      return;
    }

    try {
      const dadosUsuario = JSON.parse(usuarioSalvo);

      if (
        dadosUsuario.primeiro_acesso === true ||
        !dadosUsuario?.foto_perfil ||
        dadosUsuario.foto_perfil === ""
      ) {
        toast.error("Complete seu cadastro para acessar a rede.");
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

  useEffect(() => {
    if (!usuario) return;

    async function CarregarFeed() {
      try {
        let resposta;
        if (categoriaAtual === "Global") {
          resposta = await api.get("/postagens");
        } else {
          const categoriaFormatada = encodeURIComponent(categoriaAtual);
          resposta = await api.get(`/postagens/categoria/${categoriaFormatada}`);
        }
        setPostagens(resposta.data);
      } catch (error) { }
    }
    console.log(postagens);
    CarregarFeed();
  }, [categoriaAtual, usuario, atualizarFeed]);

  let listaDistracoes = "";
  if (usuario?.distracoes) {
    if (Array.isArray(usuario.distracoes)) {
      listaDistracoes = usuario.distracoes.join(", ");
    } else if (typeof usuario.distracoes === "string") {
      try {
        const dist = JSON.parse(usuario.distracoes);
        listaDistracoes = Array.isArray(dist)
          ? dist.join(", ")
          : usuario.distracoes;
      } catch {
        listaDistracoes = usuario.distracoes;
      }
    }
  }

  function NovaPostagem() {
    setAtualizarFeed((prev) => !prev);
  }

  async function CurtirPostagem(postagemId) {
    try {
      const postAtual = postagens.find(post => post.id === postagemId);
      if (postAtual.jaCurtiu === 0 || postAtual.jaCurtiu === false) {

        await api.post(`/apoiar/${postagemId}`);

        setPostagens((prevPostagens) =>
          prevPostagens.map((post) => {
            if (post.id === postagemId) {
              return {
                ...post,
                total_apoios: Number(post.total_apoios) + 1,
                jaCurtiu: true,
              };
            }
            return post;
          }),
        );

      }

      else {
        await api.post(`/Remover-Like/${postagemId}`);
        setPostagens((prevPostagens) =>
          prevPostagens.map((post) => {
            if (post.id === postagemId) {
              return {
                ...post,
                total_apoios: Number(post.total_apoios) - 1,
                jaCurtiu: false,
              };
            }
            return post;
          }),
        );
        toast.success("Apoio removido!");
        return;
      }
      toast.success("Você apoiou esta publicação! 💙");
    } catch (error) { }
  }

  return (
    <div className="pagina-rede-apoio">
      <div className="conteudo-rede">
        <div className="card-perfil">
          <span className="titulo-card">Seu Perfil na Comunidade</span>

          <div className="info-perfil">
            <div className="avatar-box">
              <img
                src={`/assets/avatares/${usuario?.foto_perfil}`}
                alt="Avatar"
              />
            </div>

            <div className="detalhes-perfil">
              <div className="linha-topo">
                <h2>{usuario?.nome_exibicao}</h2>

                <Link to="/primeiro-acesso">
                  <button type="button" className="btn-editar">
                    Editar Perfil
                  </button>
                </Link>
              </div>

              <span className="tag-vicio">
                Vício em {usuario?.vicio_principal}
              </span>

              {listaDistracoes && (
                <p className="distracao-texto">
                  <Sparkles size={14} /> Distração: {listaDistracoes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="Postagem">
        <div className="pergunta">
          <span className="avatar">
            <img
              src={`/assets/avatares/${usuario?.foto_perfil}`}
              alt="Avatar"
            />
          </span>
          <p
            className="pergunta-texto"
            onClick={() => {
              setTipoPostagem("relato");
              setModalAberto(true);
            }}
          >
            Como está sendo seu dia hoje, {usuario?.nome_exibicao}?
          </p>
        </div>

        <div className="botoes-post">
          <button
            type="button"
            className="botao-acao"
            onClick={() => {
              setTipoPostagem("relato");
              setModalAberto(true);
            }}
          >
            <PenSquare size={18} />
            Escrever relato
          </button>

          <button
            type="button"
            className="botao-acao"
            onClick={() => {
              setTipoPostagem("conquista");
              setModalAberto(true);
            }}
          >
            <Trophy size={18} />
            Compartilhar conquista
          </button>
        </div>
      </div>

      <div className="feed">
        <div className="cabecalho-feed">
          <h3>Comunidade Desvicia</h3>
          <span className="filtro-recente">Mais recente</span>
        </div>

        <div className="botoes-filtro">
          {["Global", "Apostas", "Cigarro OU Vape", "Drogas", "Outros"].map(
            (categoria) => (
              <button
                key={categoria}
                type="button"
                className={`btn-filtro ${categoriaAtual === categoria ? "ativo" : ""}`}
                onClick={() => setCategoriaAtual(categoria)}
              >
                {categoria}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="postagens">
        {postagens.map((post) => (
          <div className="card-postagem-feed" key={post.id}>
            <div className="post-topo">
              <div className="post-autor-info">
                <div className="avatar-feed">
                  <img
                    src={`/assets/avatares/${post.autor_foto}`}
                    alt="Avatar"
                  />
                </div>
                <div>
                  <div className="linha-nome-tempo">
                    <h4>{post.autor_nome}</h4>
                  </div>
                  <span className="vicio-feed">Vício em {post.categoria}</span>
                </div>
              </div>
            </div>

            {post.titulo && (
              <h3 className="titulo-relato-feed">{post.titulo}</h3>
            )}

            <p className="conteudo-texto-post">{post.conteudo}</p>

            <div className="post-rodape">
              <button
                type="button"
                className="btn-acao-rodape"
                onClick={() => CurtirPostagem(post.id)}
              >
                <Heart
                  size={18}
                  color={
                    Number(post.jaCurtiu) === 1 ? "#ff3b3b" : "currentColor"
                  }
                  fill={Number(post.jaCurtiu) === 1 ? "#ff3b3b" : "none"}
                />
                Apoiar · {post.total_apoios || 0}
              </button>
              <button type="button" className="btn-acao-rodape">
                {post.total_comentarios || 0} comentários
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <ModalPost
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          tipoInicial={tipoPostagem}
          usuarioId={usuario?.id}
          onPostCriado={NovaPostagem}
        />
      </div>
    </div>
  );
}
