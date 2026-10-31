import "./index.scss";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../service/api";
import toast from "react-hot-toast";

export default function EsqueciSenha() {
  const [Email, setEmail] = useState("");

  const [Carregando, setCarregando] = useState(false);

  async function EnviarEmail(e) {
    e.preventDefault();

    try {
      setCarregando(true);

      await api.post("/esqueci-senha", {
        email: Email,
      });
      setEmail("");
    } catch (error) {

    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-esqueci-senha">
      <section className="imagem-recuperacao">
        <img
          src="/assets/images/Gemini_Generated_Image_ivgsnnivgsnnivgs.jfif"
          alt="Jovem caminhando em uma paisagem, representando uma nova jornada"
        />
      </section>

      <section className="formulario-recuperacao">
        <h1>Esqueceu sua senha?</h1>

        <h2>
          Digite seu e-mail cadastrado e enviaremos um link para redefinir sua
          senha.
        </h2>

        <form onSubmit={EnviarEmail}>
          <div className="campo-email">
            <Mail size={22} />

            <input
              type="email"
              placeholder="E-mail cadastrado"
              aria-label="E-mail cadastrado"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={Carregando}>
            {Carregando ? (
              <span className="carregar">
                <Loader2 className="girar" size={20} />
                Enviando Email...
              </span>
            ) : (
              "Enviar Email"
            )}
          </button>
        </form>

        <Link to="/login" className="voltar-login">
          <ArrowLeft size={20} />
          <span>Voltar para o login</span>
        </Link>
      </section>
    </div>
  );
}
