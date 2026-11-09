import "./index.scss";
import { LockKeyhole, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../service/api";

export default function NovaSenha() {
  const navegar = useNavigate();

  const [parametros] = useSearchParams();
  const token = parametros.get("token");

  const [NovaSenha, setNovaSenha] = useState("");
  const [ConfirmarSenha, setConfirmarSenha] = useState("");

  const [MostrarSenha, setMostrarSenha] = useState(false);
  const [MostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [Carregando, setCarregando] = useState(false);

  async function MudarSenha(e) {
    e.preventDefault();

    if (NovaSenha.length < 6) {
      toast.error("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (NovaSenha !== ConfirmarSenha) {
      toast.error("As senhas precisam ser iguais nos dois campos.");
      return;
    }

    if (!token) {
      toast.error("Seu token está inválido. Solicite outra redefinição de senha.");
      return;
    }

    try {
      setCarregando(true);

      await api.post("/redefinir-senha", {
        token: token,
        novaSenha: NovaSenha,
      });

      toast.success("Sua senha foi alterada! Faça login novamente.");
      navegar("/login");

    } catch (error) {
      toast.error("Não foi possível redefinir sua senha.");
    } finally {
      setCarregando(false);
    }
  }

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

        <form onSubmit={MudarSenha}>
          {/* Nova senha */}
          <div className="campo-senha">
            <LockKeyhole size={22} />

            <input
              type={MostrarSenha ? "text" : "password"}
              placeholder="Nova senha"
              aria-label="Nova senha"
              value={NovaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />

            <button
              type="button"
              className="botao-visualizacao"
              onClick={() => setMostrarSenha(!MostrarSenha)}
              aria-label={MostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {MostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirmar senha */}
          <div className="campo-senha">
            <LockKeyhole size={22} />

            <input
              type={MostrarConfirmacao ? "text" : "password"}
              placeholder="Confirmar nova senha"
              aria-label="Confirmar nova senha"
              value={ConfirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <button
              type="button"
              className="botao-visualizacao"
              onClick={() => setMostrarConfirmacao(!MostrarConfirmacao)}
              aria-label={MostrarConfirmacao ? "Ocultar senha" : "Mostrar senha"}
            >
              {MostrarConfirmacao ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button type="submit" disabled={Carregando}>
            {Carregando ? (
              <>
                <span className="girar"></span>
                Redefinindo senha...
              </>
            ) : (
              "Redefinir senha"
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