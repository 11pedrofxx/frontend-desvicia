import "./index.scss";
import { useState, useEffect, use } from "react";
import { X, Loader2, Trophy } from "lucide-react";
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
  const [Notas, setNotas] = useState('');

  const rotulosFissura = ["Não", "Um pouco", "Moderada", "Forte", "Muito forte"];
  const textoAtual = rotulosFissura[nivelFissura - 1];
  const coresFissura = ['#16a34a', '#2563eb', '#d97706', '#ea580c', '#dc2626'];
  const percentual = ((nivelFissura - 1) / 4) * 100;
  const corAtual = coresFissura[nivelFissura - 1];

  const gatilhoOutro = Array.isArray(gatilhos)
    ? gatilhos.find((g) => g?.nome?.toLowerCase() === "outro")
    : null;

  const OutroSelecionado = gatilhoOutro && gatilhosSelecionados.includes(gatilhoOutro.id);

  const [carregandoGatilhos, setCarregandoGatilhos] = useState(true);

  const [Carregando, setCarregando] = useState(false);

  const opcoesHumor = [
    { valor: 1, label: "Bem", img: "/assets/emojis/Happy.png" },
    { valor: 2, label: "Ok", img: "/assets/emojis/Ok.png" },
    { valor: 3, label: "Neutro", img: "/assets/emojis/neutro.png" },
    { valor: 4, label: "Mal", img: "/assets/emojis/mal.png" },
    { valor: 5, label: "Ruim", img: "/assets/emojis/ruim.png" },
  ];

  const conquistas = {
  1: { titulo: "Primeiro Passo", descricao: "Registrou o humor e hábitos pela primeira vez." },
  2: { titulo: "Em Busca de Mudança", descricao: "Deu o primeiro passo para a mudança." },
  3: { titulo: "1 Dia Limpo", descricao: "Acompanhou seus padrões por 1 dia." },
  4: { titulo: "3 Dias Consecutivos", descricao: "Acompanhou seus padrões por 3 dias seguidos." },
  5: { titulo: "1 Semana de Foco", descricao: "Alcançou uma semana inteira de autodescoberta." },
  6: { titulo: "30 Dias Inabalável", descricao: "Trinta dias transformando um passo de cada vez." },
  7: { titulo: "60 Dias de Vitória", descricao: "Dois meses de dedicação constante." },
  8: { titulo: "100 Dias Transformado", descricao: "Cem dias de uma nova vida." }
};

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

    }
  }
  function obterNome() {
    const token = localStorage.getItem('token');

    try {

      const payloadBase64 = token.split('.')[1];
      const payloadString = atob(payloadBase64);
      const payload = JSON.parse(payloadString);
      return payload.nome || payload.nome_usuario;

    } catch (error) {

    }
  }

  async function FazerCheckIn(e) {
    e.preventDefault();
    if (!nivelHumor) {
      toast.error('Você deve informar qual foi seu humor durante o dia');
      return;
    }

    if (gatilhosSelecionados.length === 0) {
      toast.error('Você deve selecionar algum gatilho');
      return;
    }

    let DiaAvali = 0;
    if (nivelFissura >= 3) {
      DiaAvali = true
    }

    else {
      DiaAvali = false
    }

    try {
      const dataHoje = new Date().toISOString().split('T')[0];

      setCarregando(true);
      let objParaSalvar = {
        data_checkin: dataHoje,
        nivel_humor: nivelHumor,
        nivel_fissura: nivelFissura,
        foi_dia_dificil: DiaAvali,
        notas: Notas,
        gatilhos_sentidos: gatilhosSelecionados
      }
      
      const user = JSON.parse(localStorage.getItem('user'));

      let resposta = await api.post('/checkin', objParaSalvar);
      console.log(resposta)
if (resposta.data.novasConquistas && resposta.data.novasConquistas.length > 0) {
        resposta.data.novasConquistas.forEach((idConquista) => {
          const conquistaInfo = conquistas[idConquista] || { 
            titulo: "Nova Conquista", 
            descricao: "Você desbloqueou um novo marco." 
          };

          toast(
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '6px',
              width: '100%'
            }}>
              <strong style={{ 
                fontSize: '15px', 
                color: '#15479e', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                justifyContent: 'center'
              }}> 
                <Trophy size={18} /> {conquistaInfo.titulo}
              </strong>
              <span style={{ 
                fontSize: '13px', 
                color: '#64748b', 
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                {conquistaInfo.descricao}
              </span>
            </div>, 
            {
              duration: 6000,
              position: 'top-center',              
              style: {
                borderRadius: '16px',
                background: '#f0f9ff',
                color: '#15479e',
                border: '1px solid #bae6fd',
                padding: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '380px',
                boxSizing: 'border-box',
                textAlign: 'center'
              },
            }
          );
        });
      }
      toast.success(`Checkin diário realizado! Muito bem, ${user.nome}`);
      navigate('/acompanhamento')
    } catch (error) {
        
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-registroDiario">
      <Cabecalho titulo="Registro Diário" />

      <form onSubmit={FazerCheckIn}>
        <div className="container-form">
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
                min='1'
                max='5'
                step='1'
                value={nivelFissura}
                onChange={(e) => setNivelFissura(Number(e.target.value))}
                className={`AjusteNivel-${nivelFissura}`}
                style={{
                  background: `linear-gradient(to right, ${corAtual} 0%, ${corAtual} ${percentual}%, #e2e8f0 ${percentual}%, #e2e8f0 100%)`
                }} />

              <div className="nivel-fissura">
                Nível: <span className={`nivel-${nivelFissura}`}>{rotulosFissura[nivelFissura - 1]}</span>
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
          <section>
            <h3>Deseja comentar algo sobre o seu dia? (Opcional)</h3>
            <p className="subtitulo">Comentar sobre dia ajuda a acompanhar seu progresso.</p>
            <input type="text" value={Notas} onChange={(e) => setNotas(e.target.value)} />
          </section>
          <button type="submit" disabled={Carregando}>
            {Carregando ? (
              <span className="carregar">
                <Loader2 className="girar" size={20} />
                Realizando Checkin diário...
              </span>
            ) : (
              "Fazer Checkin diário"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
