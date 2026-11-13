import { useEffect, useState } from "react";
import { Sparkles, Award, Trophy, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho";
import api from "../../service/api";
import './index.scss'

export default function Conquistas() {
  const [conquistas, setConquistas] = useState([]);
  const descricoes = {
    1: "Registrou o humor e hábitos pela primeira vez.",
    2: "Deu o primeiro passo para a mudança.",
    3: "Acompanhou seus padrões por 1 dia.",
    4: "Acompanhou seus padrões por 3 dias seguidos.",
    5: "Alcançou uma semana inteira de autodescoberta.",
    6: "Trinta dias transformando um passo de cada vez.",
    7: "Dois meses de dedicação constante.",
    8: "Cem dias de uma nova vida.",
  };

  async function CarregarConq() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const UsuarioID = user.id;

      let resposta = await api.get(`/conquistas/${UsuarioID}`);
      setConquistas(resposta.data);
      console.log("Conquistas que vieram do banco:", resposta.data);
    } catch (error) {}
  }

  useEffect(() => {
    CarregarConq();
  }, []);

  function formatarData(dataString) {
    if (!dataString) return '';
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const data = new Date(dataString.substring(0, 10) + 'T12:00:00');
    return `${data.getDate()} de ${meses[data.getMonth()]}`;
  }

  return (
    <div className="pagina-conquistas">
      <Cabecalho
      titulo="Minhas Conquistas"
      subtitulo='Cada pequeno passo conta para construir novos caminhos. Continue
          preenchendo seu diário para liberar novos marcos.'/>

      <div className="lista-conquistas">
          {conquistas.map((item) => {
            const foiConquistado = item.data_conquista !== null;
            const classeStatus = foiConquistado ? "desbloqueado" : "bloqueado";
            

            const Icone = item.dias_meta >= 30 ? Trophy : Award;

            return (
              <div key={item.id} className={`card-conquista ${classeStatus}`}>
                
                <div className="icone-fundo">
                  <Icone size={24} />
                </div>
                
                <div className="textos-conquista">
                  <h3>{item.titulo}</h3>
                  <p>{descricoes[item.id]}</p>
                  
                  {foiConquistado && (
                    <span className="data">
                      Conquistado em {formatarData(item.data_conquista)}
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
    </div>
  );
}
