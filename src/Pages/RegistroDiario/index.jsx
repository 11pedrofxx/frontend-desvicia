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
        setGatilhos(resposta.data);
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
                onClick={() => setNivelHumor(item.valor)}
              >
                <img src={item.img} alt={item.label} className="emoji" />
                <span className="label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
