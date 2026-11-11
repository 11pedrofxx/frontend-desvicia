import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Cabecalho from "../../components/Cabecalho";
import api from "../../service/api";
import "./index.scss";
import toast from "react-hot-toast";

export default function Gatilhos() {
  const [gatilhos, setGatilhos] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoGatilho, setNovoGatilho] = useState('');
  const [Carregando, setCarregando] = useState(false);

    async function carregarGatilhos() {
      try {
        let resposta = await api.get("/gatilhos/dashboard");
        setGatilhos(resposta.data);
      } catch (erro) {
        console.error(erro);
      }
    }

  useEffect(() => {
    carregarGatilhos();
  }, []);



  function calcularIntensidade(total) {
    const valor = Number(total);

    if (valor >= 7) {
      return { texto: "Frequente", cor: "#d32f2f", porcentagem: "85%" };
    }
    if (valor >= 4) {
      return { texto: "Moderado", cor: "#e67e22", porcentagem: "55%" };
    }
    if (valor >= 2) {
      return { texto: "Eventual", cor: "#f39c12", porcentagem: "30%" };
    }
    if (valor === 1) {
      return { texto: "Raro", cor: "#7f8c8d", porcentagem: "15%" };
    }

    return { texto: "Sem registros", cor: "#bdc3c7", porcentagem: "0%" };
  }

async function SalvarNovoGatilho(e) {
    e.preventDefault();

    try {
      setCarregando(true);
      await api.post('/gatilhos', { nome: novoGatilho });

      setNovoGatilho("");
      carregarGatilhos();
      setModalAberto(false);
      toast.success('Gatilho adicionado');

    } catch (error) {}
    
      finally {
      setCarregando(false);
    }
  }


  return (
    <div className="pagina-DashboardGatilhos">
      <Cabecalho 
      titulo='Meus gatilhos'
      subtitulo='Reconhecer o que desencadeia uma vontade pode ajudar você a lidar melhor com ela.'/>

      <div className="lista-gatilhos">
        {gatilhos
          .filter((gatilho) => gatilho.total_registros > 0)
          .map((gatilho) => {
            const status = calcularIntensidade(gatilho.total_registros);

            return (
              <div className="card-gatilho" key={gatilho.id}>
                <div className="linha-topo">
                  <div className="nome-gatilho">
                    <span
                      className="bolinha"
                      style={{ backgroundColor: status.cor }}
                    ></span>
                    <h3>{gatilho.nome}</h3>
                  </div>
                  <span className="contagem">{gatilho.total_registros} registros</span>
                </div>

                <div className="linha-barra">
                  <div className="barra-fundo">
                    <div
                      className="barra-preenchida"
                      style={{
                        width: status.porcentagem,
                        backgroundColor: status.cor,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="linha-rodape">
                  <span className="texto-status" style={{ color: status.cor }}>
                    {status.texto}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      <button
        className="botao-adicionar"
        onClick={() => setModalAberto(true)}
      >
        <PlusCircle size={20} />
        Adicionar gatilho
      </button>

      {modalAberto && (
        <div className="modal">
          <div className="modal-conteudo">
            <h3>Novo gatilho</h3>
            <p>O que despertou sua vontade?</p>
            
            <form onSubmit={SalvarNovoGatilho}>
              <input 
                type="text" 
                placeholder="Ex: Ansiedade, Estresse..." 
                value={novoGatilho}
                onChange={(e) => setNovoGatilho(e.target.value)}
                disabled={Carregando}
                required
              />
              
              <div className="modal-botoes">
                <button 
                  type="button" 
                  className="btn-cancelar"
                  onClick={() => setModalAberto(false)}
                  disabled={Carregando}
                >
                  Cancelar
                </button>
                
                <button 
                  type="submit" 
                  className="btn-salvar"
                  disabled={Carregando}
                >
                  {Carregando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}