import { useEffect, useState } from "react";
import "./index.scss";
import { Info, Check, Loader2, User, X} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import toast from "react-hot-toast";

export default function PrimeiroAcesso() {
  const Navigate = useNavigate();

  const [Nome, setNome] = useState("");
  const [Foto, setFoto] = useState("");
  const [Vicio, setVicio] = useState("");
  const [OutroVicio, setOutroVicio] = useState("");
  const [Distracoes, setDistracoes] = useState([]);
  const [OutraDistracao, setOutraDistracao] = useState("");
  const [cidade, setCidade] = useState('');

  const [cidades, setCidades] = useState([]);

  const [avatarAberto, setavatarAberto] = useState(false);

  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarCidades() {
      try {
        const resposta = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?ordenar=nome"
        );
        const dados = await resposta.json();

        const listaFormatada = dados.map((item) => {
          const siglaUF =
            item.microrregiao?.mesorregiao?.UF?.sigla ||
            item["regiao-imediata"]?.["regiao-intermediaria"]?.UF?.sigla ||
            "";
          return siglaUF ? `${item.nome} - ${siglaUF}` : item.nome;
        });

        setCidades(listaFormatada);
      } catch (erro) {
        console.error(erro);
      }
    }

    carregarCidades();
  }, []);

  const cidadesFiltradas =
    cidade.trim().length >= 2
      ? cidades
        .filter((item) => item.toLowerCase().includes(cidade.toLowerCase()))
        .slice(0, 12)
      : [];

  function SelecionarDistracao(item) {
    if (Distracoes.includes(item)) {
      setDistracoes(Distracoes.filter((distracao) => distracao !== item))
    } else {
      setDistracoes([...Distracoes, item])
    }
  };

  async function FinalizarPerfil(e) {
    e.preventDefault();

    if (!Nome.trim()) {
      toast.error('O campo "Nome" não pode estar vazio');
      return;
    }

    if (!Foto) {
      toast.error('Você deve selecionar um avatar de perfil');
      return;
    }

    if(!cidade.trim()) {
      toast.error('O campo "Cidade" não pode ficar vazio')
      return;
    }

    if (!Vicio) {
      toast.error('Você deve selecionar algum vício');
      return;
    }

    if (Vicio === 'Outro' && !OutroVicio.trim()) {
      toast.error('Por favor, especifique qual é o outro vício');
      return;
    }

    if (Distracoes.length === 0) {
      toast.error('Você deve selecionar pelo menos uma distração');
      return;
    }

    if (Distracoes.includes('Outra atividade') && !OutraDistracao.trim()) {
      toast.error('Por favor, especifique a outra atividade');
      return;
    }

    try {
      setCarregando(true)
      const vicioFinal = Vicio === 'Outro' ? OutroVicio : Vicio;

      const distracoesFinais = Distracoes.map((item) =>
        item === 'Outra atividade' ? OutraDistracao : item
      );

      const usuarioSalvo = localStorage.getItem('usuario') || localStorage.getItem('user');
      const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
      const usuario_id = usuarioLogado?.id;

      const dados = {
        usuario_id: usuario_id,
        foto_perfil: Foto,
        nome_exibicao: Nome,
        cidade: cidade,
        vicio_principal: vicioFinal,
        distracoes: distracoesFinais,
      };

      const respostaApi = await api.put("/usuario/primeiro-acesso", dados);

      const usuarioAtualizado = {
        ...usuarioLogado,
        ...dados,
        primeiro_acesso: false 
      };

      const chaveArmazenamento = localStorage.getItem('usuario') ? 'usuario' : 'user';
      localStorage.setItem(chaveArmazenamento, JSON.stringify(usuarioAtualizado));

      toast.success('Perfil configurado com sucesso!');
      Navigate("/home");

    } catch (error) {
      toast.error(error.response?.data?.erro || "Ocorreu um erro ao salvar suas informações.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-primeiro-acesso">
      <main className="conteudo-principal">
        <section className="titulos">
          <h1>O seu começo é do seu jeito</h1>
          <p>
            Vamos conhecer um pouco de você para começar sua jornada na comunidade.
          </p>
        </section>

        <form className="card-formulario" onSubmit={FinalizarPerfil}>
          <div className="campo-grupo">
            <label className="campo-titulo">Como você quer ser chamado?</label>
            <input
              type="text"
              className="input-texto"
              placeholder="Pode ser um apelido. Não precisa ser seu nome real."
              value={Nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="campo-grupo">
            <label className="campo-titulo">Escolha seu avatar</label>
            <span className="campo-subtitulo">
              Toque para selecionar. Você pode trocar quando quiser.
            </span>

            <button
            type="button"
            className="mostrar-avatares"
            onClick={() => setavatarAberto(true)}>
              
              <div className="avatar-escolhi">
                {Foto ? (
                  <img
                  src={`/assets/avatares/${Foto}`}
                  alt="avatar selecionado"
                  />
                ) : (
                  <User size={26} color="#15479e" />
                )}
              </div>
              <span>{Foto ? "Alterar Avatar" : "Selecionar Avatar"}</span>
            </button>

            <div className="aviso-avatar">
              <Info className="icone-info" />
              <span>
                Você pode trocar seu avatar a qualquer momento nas configurações.
              </span>
            </div>
          </div>

          <div className="campo-grupo">
            <label className="campo-titulo">Onde você mora?</label>
            <input
              type="text"
              className="input-texto"
              placeholder="Digite para buscar sua cidade..."
              list="lista-cidades"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />

            <datalist id="lista-cidades">
              {cidadesFiltradas.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>
            
            <label className="campo-titulo">
              Qual vício você está acompanhando?
            </label>
            <span className="campo-subtitulo">
              Escolha uma opção para acompanhar agora.
            </span>

            <div className="grid-vicios">
              <button type="button"
                className={`btn-opcao ${Vicio === 'Apostas' ? 'ativo' : ''}`}
                onClick={() => setVicio('Apostas')}>
                Apostas
              </button>
              <button type="button"
                className={`btn-opcao ${Vicio === 'Cigarro OU Vape' ? "ativo" : ''}`}
                onClick={() => setVicio('Cigarro OU Vape')}>
                Cigarro/Vape
              </button>
              <button type="button" className={`btn-opcao ${Vicio === 'Drogas' ? "ativo" : ''}`}
                onClick={() => setVicio('Drogas')}>
                Drogas
              </button>
              <button type="button" className={`btn-opcao ${Vicio === 'Outro' ? "ativo" : ''}`}
                onClick={() => setVicio('Outro')}>
                Outro
              </button>
            </div>
            {Vicio === "Outro" && (
              <div className="campo-subgrupo">
                <label className="campo-titulo-menor">Qual outro vício?</label>
                <input
                  type="text"
                  className="input-texto"
                  placeholder="Ex: Redes sociais"
                  value={OutroVicio}
                  onChange={(e) => setOutroVicio(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="campo-grupo">
            <label className="campo-titulo">
              O que você gosta de fazer para se distrair?
            </label>

            <span className="campo-subtitulo">
              Você pode escolher mais de uma atividade.
            </span>

            <div className="grid-distracoes">
              <button
                type="button"
                className={`btn-opcao-check ${Distracoes.includes("Ouvir música") ? "ativo" : ""}`}
                onClick={() => SelecionarDistracao("Ouvir música")}
              >
                <span className="icon-check">
                  {Distracoes.includes("Ouvir música") && <Check size={14} color="#ffffff" strokeWidth={3} />}
                </span>
                Ouvir música
              </button>

              <button
                type="button"
                className={`btn-opcao-check ${Distracoes.includes("Caminhar") ? "ativo" : ""}`}
                onClick={() => SelecionarDistracao("Caminhar")}
              >
                <span className="icon-check">
                  {Distracoes.includes("Caminhar") && <Check size={14} color="#ffffff" strokeWidth={3} />}
                </span>
                Caminhar
              </button>

              <button
                type="button"
                className={`btn-opcao-check ${Distracoes.includes("Ler") ? "ativo" : ""}`}
                onClick={() => SelecionarDistracao("Ler")}
              >
                <span className="icon-check">
                  {Distracoes.includes("Ler") && <Check size={14} color="#ffffff" strokeWidth={3} />}
                </span>
                Ler
              </button>

              <button
                type="button"
                className={`btn-opcao-check ${Distracoes.includes("Exercitar-se") ? "ativo" : ""}`}
                onClick={() => SelecionarDistracao("Exercitar-se")}
              >
                <span className="icon-check">
                  {Distracoes.includes("Exercitar-se") && <Check size={14} color="#ffffff" strokeWidth={3} />}
                </span>
                Exercitar-se
              </button>

              <button
                type="button"
                className={`btn-opcao-check ${Distracoes.includes("Outra atividade") ? "ativo" : ""}`}
                onClick={() => SelecionarDistracao("Outra atividade")}
              >
                <span className="icon-check">
                  {Distracoes.includes("Outra atividade") && <Check size={14} color="#ffffff" strokeWidth={3} />}
                </span>
                Outra atividade
              </button>
            </div>

            {Distracoes.includes('Outra atividade') && (
              <div className="campo-subgrupo">
                <label className="campo-titulo-menor">
                  Qual outra atividade?
                </label>
                <input
                  type="text"
                  className="input-texto"
                  placeholder="Desenhar"
                  value={OutraDistracao}
                  onChange={(e) => setOutraDistracao(e.target.value)}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit" disabled={carregando}>
            {carregando ? (
              <>
                <Loader2 className="spin" size={20} />
                <span>Salvando...</span>
              </>
            ) : (
              "Começar minha jornada"
            )}
          </button>
        </form>
      </main>

      {avatarAberto && (
        <div
          className="selecionar-avatar"
          onClick={() => setavatarAberto(false)}
        >
          <div
            className="div-avatar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="escolha-avatar">
              <h3>Escolha seu avatar</h3>
              <button
                type="button"
                className="botao-fechar"
                onClick={() => setavatarAberto(false)}
              >
                <X size={20} color="#616161" />
              </button>
            </div>

            <div className="secaoavatares">
              {[1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((item) => {
                const nomeFoto = `pfp${item}.png`;
                return (
                  <button
                    type="button"
                    key={item}
                    className={`item-avatar ${Foto === nomeFoto ? "ativo" : ""}`}
                    onClick={() => {
                      setFoto(nomeFoto);
                      setavatarAberto(false);
                    }}
                  >
                    <img
                      src={`/assets/avatares/${nomeFoto}`}
                      alt={`Avatar ${item}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}