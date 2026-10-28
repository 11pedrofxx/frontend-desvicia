import "./index.scss";
import { LockKeyhole, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NovaSenha() {

    const [parametros] = useSearchParams();
    const token = parametros.get("token");

    const [NovaSenha, setNovaSenha] = useState("");
    const [ConfirmarSenha, setConfirmarSenha] = useState("");

  return (
    <div className="pagina-redefinir-senha">
      <section className="imagem-redefinicao">
        <img
          src="/assets/images/Gemini_Generated_Image_ivgsnnivgsnnivgs.jfif"
          alt="Jovem caminhando em uma paisagem, representando uma nova jornada"
        />
      </section>

      <section className="formulario-redefinicao">
        <h1>Crie uma nova senha</h1>

        <h2>
          Escolha uma nova senha para continuar sua jornada com o Desvicia.
        </h2>

        <form>
          <div className="campo-senha">
            <LockKeyhole size={22} />

            <input
              type="password"
              placeholder="Nova senha"
              aria-label="Nova senha"
              value={NovaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />

            <EyeOff size={20} className="icone-visualizacao" />
          </div>

          <div className="campo-senha">
            <LockKeyhole size={22} />

            <input
              type="password"
              placeholder="Confirmar nova senha"
              aria-label="Confirmar nova senha"
              value={ConfirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <Eye size={20} className="icone-visualizacao" />
          </div>

          <button type="submit">Redefinir senha</button>
        </form>

        <Link to="/login" className="voltar-login">
          <ArrowLeft size={20} />
          <span>Voltar para o login</span>
        </Link>
      </section>
    </div>
  );
}