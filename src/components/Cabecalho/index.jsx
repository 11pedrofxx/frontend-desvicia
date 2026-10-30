import "./index.scss";
import { X } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Cabecalho(props) {
  return (
    <header className="cabecalho-registro">
      <button
        type="button"
        className="btn-voltar"
        onClick={() => Navigate(-1)}
        title="Voltar"
      >
        <X size={20} />
      </button>
      <h2>{props.titulo}</h2>
    </header>
  );
}
