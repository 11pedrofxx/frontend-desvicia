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
      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (!user?.id) {
        console.error("Não foi possível identificar o usuário.");
        return;
      }

      const [respostaCheckins, respostaOfensiva] = await Promise.all([
        api.get(`/checkins/${user.id}`),
        api.get('/ofensiva')
      ]);

      const dadosCheckins = Array.isArray(respostaCheckins.data)
        ? respostaCheckins.data
        : respostaCheckins.data?.checkins ||
          respostaCheckins.data?.registros ||
          respostaCheckins.data?.dados ||
          [];

      setCheckins(dadosCheckins);

      const dias = Number(
        respostaOfensiva.data?.ofensiva_atual ??
        respostaOfensiva.data?.dias ??
        respostaOfensiva.data?.ofensiva ??
        0
      );

      setSequencia(Number.isFinite(dias) ? dias : 0);
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    }
  }

  useEffect(() => {
    carregarCheckins();
  }, []);

  // Compara as datas no formato YYYY-MM-DD, usando o calendário local.
  function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  const fezCheckinHoje = checkins.some((checkin) => {
    const valorData = checkin?.data_checkin ||
      checkin?.dataCheckin ||
      checkin?.dt_checkin ||
      checkin?.data;

    if (!valorData) return false;

    const dataCheckin = String(valorData).slice(0, 10);
    return dataCheckin === formatarData(new Date());
  });

  const fogoAtivo = sequencia > 0 && fezCheckinHoje;

  function coresDias({ date, view }) {
    if (view === 'month') {
      const dataFormatada = formatarData(date);

      const checkinDoDia = checkins.find((c) => {
        const valorData = c?.data_checkin ||
          c?.dataCheckin ||
          c?.dt_checkin ||
          c?.data;

        return valorData && String(valorData).slice(0, 10) === dataFormatada;
      });

      if (checkinDoDia) {
        return checkinDoDia.foi_dia_dificil
          ? 'bolinha-dificil'
          : 'bolinha-registrado';
      }
    }

    return null;
  }

  return (
    <div className="pagina-acompanhamento">

      <div className="topo-acompanhamento">
        <h2>Meu acompanhamento</h2>

        <div
          className="selo-ofensiva"
          aria-label={`${sequencia} ${sequencia === 1 ? 'dia' : 'dias'} de sequência`}
        >
          <span className="selo-ofensiva__fogo" aria-hidden="true">
            <img
              className={`selo-ofensiva__gif${fogoAtivo ? '' : ' inativo'}`}
              src={
                fogoAtivo
                  ? '../../assets/gif/Fire.gif'
                  : '../../assets/gif/Frame-Fire.png'
              }
              alt=""
            />
          </span>

          <span className="selo-ofensiva__valor">
            <strong>{sequencia}</strong>
            <span>{sequencia === 1 ? 'DIA' : 'DIAS'}</span>
          </span>
        </div>
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
