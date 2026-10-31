import "./index.scss";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api.js";
import toast from "react-hot-toast";
import Cabecalho from "../../components/Cabecalho/index.jsx";

export default function RegistroDiario() {
  const navigate = useNavigate();

  const [nivelHumor, setNivelHumor] = useState(null);
  const [nivelFissura, setNivelFissura] = useState(1);
  const [gatilhos, setGatilhos] = useState([]);
  const [gatilhosSelecionados, setGatilhosSelecionados] = useState([]);
  const [OutroGatilho, setOutroGatilho] = useState('')

  const gatilhoOutro = Array.isArray(gatilhos)
    ? gatilhos.find((g) => g?.nome?.toLowerCase() === "outro")
    : null;

  const OutroSelecionado = gatilhoOutro && gatilhosSelecionados.includes(gatilhoOutro.id);

  const [carregandoGatilhos, setCarregandoGatilhos] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const opcoesHumor = [
    { valor: 1, label: "Bem", img: "/assets/emojis/Happy.png" },
    { valor: 2, label: "Ok", img: "/assets/emojis/Ok.png" },
    { valor: 3, label: "Neutro", img: "/assets/emojis/neutro.png" },
    { valor: 4, label: "Mal", img: "/assets/emojis/mal.png" },
    { valor: 5, label: "Ruim", img: "/assets/emojis/ruim.png" },
  ];

  useEffect(() => {
    async function CarregarGatilho() {
      try {
        const resposta = await api.get("/gatilhos");
        const lista = Array.isArray(resposta.data) ? resposta.data : (resposta.data.gatilhos || []);
        setGatilhos(lista);
      } catch (error) {
        toast.error(
          "Aconteceu um erro ao carregar os gatilhos. Tente novamente mais tarde",
        );
      } finally {
        setCarregandoGatilhos(false);
      }
    }

    CarregarGatilho();
  }, []);

  function SelecionarGatilho(id) {
    if (gatilhosSelecionados.includes(id)) {
      setGatilhosSelecionados(gatilhosSelecionados.filter(item => item !== id))
    }
    else {
      setGatilhosSelecionados([...gatilhosSelecionados, id])
    }
  }

  async function adicionarNovoGatilho() {
  const nomeGatilho = OutroGatilho.trim();
  if (!nomeGatilho) return;

  try {
    const resposta = await api.post("/gatilhos", { nome: nomeGatilho });

    const novoGatilho = {
      id: resposta.data.id,
      nome: nomeGatilho
    };

    setGatilhos((listaAnterior) => {
      const atual = Array.isArray(listaAnterior) ? listaAnterior : [];
      return [...atual, novoGatilho];
    });

    setGatilhosSelecionados((selecionados) => [...selecionados, novoGatilho.id]);

    setOutroGatilho("");
  } catch (error) {
    console.error("Erro ao adicionar gatilho:", error);
  }
}

  return (
    <div className="pagina-registroDiario">
      <Cabecalho titulo="Registro Diário" />

      <section>
        <h3>Como foi o seu dia em geral?</h3>

        <div className="humor">
          {opcoesHumor.map((item) => {
            const ativo = nivelHumor === item.valor;

            return (
              <button
                key={item.valor}
                type="button"
                className={`BotaoHumor ${ativo ? "ativo" : ""}`}
                onClick={() => setNivelHumor(item.valor)}>

                <img src={item.img} alt={item.label} className="emoji" />
                <span className="label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3>Você sentiu vontade de recaír ao vício hoje?</h3>

        <div className="recaida">
          <input type="range"
            min="1"
            max="5"
            step="1"
            value={nivelFissura}
            onChange={(e) => setNivelFissura(Number(e.target.value))}
            className="NivelDeFissura" />

          <div className="nomes">
            {['Não', 'Um pouco', 'Moderada', 'Forte', 'Muito forte'].map((texto, index) => {
              const valor = index + 1;
              const ativo = nivelFissura === valor

              return (
                <span
                  key={valor}
                  className={`rotulo ${ativo ? 'ativo' : ''}`}
                  onClick={() => setNivelFissura(valor)}>
                  {texto}
                </span>
              )

            })}

          </div>

        </div>
      </section>

      <section>
        <h3>O que aconteceu antes?</h3>
        <p className="subtitulo">Identificar a causa ajuda a evitar reações futuras</p>

        <div className="cont-gatilhos">
          {carregandoGatilhos ? (
            <span className="carregando">Carregando gatilhos...</span>
          ) : (
            gatilhos.map((gatilho) => {
              const ativo = gatilhosSelecionados.includes(gatilho.id);

              return (
                <button
                  key={gatilho.id}
                  type="button"
                  className={`chip-gatilho ${ativo ? "ativo" : ""}`}
                  onClick={() => SelecionarGatilho(gatilho.id)}
                >
                  {gatilho.nome}
                </button>
              );
            })
          )}
        </div>

        {OutroSelecionado && (
          <div className="campo-outro">
            <input
              type="text"
              placeholder="Qual foi o outro motivo? (ex: cansaço, insônia...)"
              value={OutroGatilho}
              onChange={(e) => setOutroGatilho(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  adicionarNovoGatilho();
                }
              }}
              maxLength={30}
            />
            <button type="button" className="botao-add" onClick={adicionarNovoGatilho}>Adicionar</button>
          </div>
        )}
      </section>
    </div>
  );
}
