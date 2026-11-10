import "./index.scss";
import { X } from "lucide-react";
import { useNavigate} from "react-router-dom";

export default function Cabecalho(props) {
   const navigate = useNavigate();

  return (
    <header className="cabecalho-registro">
      <button
        type="button"
        className="btn-voltar"
        onClick={() => navigate(-1)}
        title="Voltar"
      >
        <X size={20} />
      </button>
      <h2>{props.titulo}</h2>
    </header>
  );
}
