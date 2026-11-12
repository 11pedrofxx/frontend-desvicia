import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import Calendar from "react-calendar";
import api from '../../service/api';
import "./index.scss";

export default function Acompanhamento() {
  const [dataAtual, setDataAtual] = useState(new Date());

  const [checkins, setCheckins] = useState([]);
  const [sequencia, setSequencia] = useState(0);

  async function carregarCheckins() {
    try {
      let idUsuario = 1;
      
      let resposta = await api.get(`/checkins/${idUsuario}`);
      setCheckins(resposta.data);

    } catch (err) {

    }
  }

  useEffect(() => {
    carregarCheckins();
  }, []);

  function coresDias({ date, view }) {
    if (view === 'month') {
      
      const ano = date.getFullYear();
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const dia = String(date.getDate()).padStart(2, '0');
      const dataFormatada = `${ano}-${mes}-${dia}`;

      const checkinDoDia = checkins.find(c => c.data_checkin.split('T')[0] === dataFormatada);

      if (checkinDoDia) {
        return checkinDoDia.foi_dia_dificil ? 'bolinha-dificil' : 'bolinha-registrado';
      }
    }
    return null;
  }

  return (
    <div className="pagina-acompanhamento">

      <div className="topo-acompanhamento">
        <h2>Meu acompanhamento</h2>
        <div className="selo-ofensiva">🔥 7 DIAS</div>
      </div>
    
    <div className="mensagem">
        <ShieldCheck/>
        <p>Um dia difícil não apaga seu progresso. Continuamos juntos.</p>
    </div>

    <div className="container-calendario">
        <Calendar 
          onChange={setDataAtual} 
          value={dataAtual}
          tileClassName={coresDias}
          next2Label={null} 
          prev2Label={null}
        />
      </div>

      <div className="legenda">
        <div className="item-legenda">
          <span className="cor-registrado"></span> Registrado
        </div>
        <div className="item-legenda">
          <span className="cor-dificil"></span> Dia difícil
        </div>
        <div className="item-legenda">
          <span className="cor-vazio"></span> Sem registro
        </div>
      </div>

    </div>  
  );
}
