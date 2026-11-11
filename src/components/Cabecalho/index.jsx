import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function Cabecalho({ titulo, subtitulo }) {
  const navigate = useNavigate();

  return (
    <header className="cabecalho-registro">
      <div className="topo-cabecalho">
        <button
          type="button"
          className="btn-voltar"
          onClick={() => navigate(-1)}
          title="Voltar"
        >
          <X size={20} />
        </button>
        <h2>{titulo}</h2>
      </div>
      
      {subtitulo && <p className="subtitulo-cabecalho">{subtitulo}</p>}
    </header>
  );
}