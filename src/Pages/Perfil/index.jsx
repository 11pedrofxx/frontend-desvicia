import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, Mail, LogOut, X, UserRound } from "lucide-react";
import api from "../../service/api";
import "./index.scss";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [modal, setModal] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const [etapaEmail, setEtapaEmail] = useState(1);
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [erroCodigo, setErroCodigo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/usuario")
      .then(({ data }) => setUsuario(data.usuario || data))
      .catch(() => setMensagem("Não foi possível carregar os dados da conta."))
      .finally(() => setCarregando(false));
  }, []);

  function abrirModalNome() {
    setMensagem("");
    setNovoNome(usuario?.nome || "");
    setErroCodigo("");
    setModal("nome");
  }

  function abrirModalEmail() {
    setMensagem("");
    setNovoEmail("");
    setEtapaEmail(1);
    setCodigo(["", "", "", "", "", ""]);
    setErroCodigo("");
    setModal("email");
  }

  function fecharModal() {
    if (enviando) return;
    setModal("");
    setEtapaEmail(1);
    setCodigo(["", "", "", "", "", ""]);
    setErroCodigo("");
  }

  function digitarCodigo(valor, index) {
    if (isNaN(valor)) return;
    setErroCodigo("");

    const novoCodigo = [...codigo];
    novoCodigo[index] = valor.slice(-1);
    setCodigo(novoCodigo);

    if (valor && index < 5) {
      document.getElementById(`code-input-${index + 1}`)?.focus();
    }
  }

  function VoltarCaixaApagar(e, index) {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`)?.focus();
    }
  }

  function colarCodigo(e) {
    e.preventDefault();

    const textoColado = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!textoColado) return;

    setErroCodigo("");

    const novoCodigo = [...codigo];
    for (let i = 0; i < 6; i++) {
      novoCodigo[i] = textoColado[i] || "";
    }
    setCodigo(novoCodigo);

    const proximoIndex = Math.min(textoColado.length, 5);
    document.getElementById(`code-input-${proximoIndex}`)?.focus();
  }

  async function salvarNovoNome(evento) {
    evento.preventDefault();
    const nomeFormatado = novoNome.trim();
    if (!nomeFormatado) return;

    if (nomeFormatado === usuario.nome?.trim()) {
      setErroCodigo("Digite um nome diferente do atual.");
      return;
    }

    setEnviando(true);
    setErroCodigo("");
    try {
      const { data } = await api.put("/usuario/alterar-nome", {
        nome: nomeFormatado,
      });
      const nomeAtualizado = data.nome || nomeFormatado;
      setUsuario({ ...usuario, nome: nomeAtualizado });
      setMensagem(data.mensagem || "Nome alterado com sucesso.");
      fecharModal();
    } catch (erro) {
      setErroCodigo(
        erro.response?.data?.erro ||
        erro.response?.data?.message ||
        "Não foi possível alterar o nome."
      );
    } finally {
      setEnviando(false);
    }
  }

  async function redefinirSenha() {
    setEnviando(true);
    try {
      const { data } = await api.post("/esqueci-senha", { email: usuario.email });
      setMensagem(data.mensagem || "Link enviado para seu e-mail.");
      fecharModal();
    } catch (erro) {
      setMensagem(erro.response?.data?.erro || "Não foi possível enviar o link.");
    } finally {
      setEnviando(false);
    }
  }

  async function enviarCodigoNovoEmail(evento) {
    evento.preventDefault();
    const emailFormatado = novoEmail.trim().toLowerCase();
    if (!emailFormatado) return;

    if (emailFormatado === usuario.email?.trim().toLowerCase()) {
      setErroCodigo("Digite um e-mail diferente do atual.");
      return;
    }

    setEnviando(true);
    setErroCodigo("");
    try {
      await api.post("/usuario/solicitar-alteracao-email", {
        email: emailFormatado,
      });
      setNovoEmail(emailFormatado);
      setCodigo(["", "", "", "", "", ""]);
      setEtapaEmail(2);
    } catch (erro) {
      setErroCodigo(
        erro.response?.data?.erro ||
        erro.response?.data?.message ||
        "Não foi possível enviar o código para o novo e-mail."
      );
    } finally {
      setEnviando(false);
    }
  }

  async function confirmarNovoEmail(evento) {
    evento.preventDefault();

    const codigoString = codigo.join("");
    if (codigoString.length < 6) {
      setErroCodigo("Por favor, preencha todos os 6 dígitos do código.");
      return;
    }

    const emailFormatado = novoEmail.trim().toLowerCase();

    setEnviando(true);
    try {
      const { data } = await api.put("/usuario/alterar-email", {
        email: emailFormatado,
        codigo: codigoString,
      });
      setUsuario({
        ...usuario,
        email: data.usuario?.email || data.email || emailFormatado,
      });
      setMensagem(data.mensagem || "E-mail alterado com sucesso.");
      setNovoEmail("");
      fecharModal();
    } catch (erro) {
      setErroCodigo(
        erro.response?.data?.erro ||
        erro.response?.data?.message ||
        "Código inválido ou expirado."
      );
    } finally {
      setEnviando(false);
    }
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  const nome = usuario?.nome || "Usuário";
  const inicial = nome.trim().charAt(0).toLocaleUpperCase("pt-BR") || "U";

  return (
    <main className="pagina-perfil">
      <div className="perfil-container">
        <h1>Perfil</h1>
        <p className="perfil-subtitulo">Gerencie as informações da sua conta.</p>

        {carregando ? <p>Carregando...</p> : usuario ? (
          <>
            <section className="perfil-usuario">
              <div className="perfil-avatar">{inicial}</div>
              <div>
                <h2>{nome}</h2>
                <p>{usuario.email}</p>
              </div>
            </section>

            {mensagem && <p className="perfil-mensagem">{mensagem}</p>}

            <section className="perfil-opcoes">
              <button onClick={abrirModalNome}>
                <UserRound size={19} />
                <span>Alterar nome</span>
              </button>
              <button onClick={abrirModalEmail}>
                <Mail size={19} />
                <span>Alterar e-mail</span>
              </button>
              <button onClick={() => { setMensagem(""); setModal("senha"); }} disabled={enviando}>
                <KeyRound size={19} />
                <span>Redefinir senha</span>
              </button>
              <button className="perfil-sair" onClick={sair}>
                <LogOut size={19} />
                <span>Sair da conta</span>
              </button>
            </section>
          </>
        ) : <p>{mensagem || "Não foi possível carregar seu perfil."}</p>}
      </div>

      {modal && (
        <div className="perfil-modal-fundo" onMouseDown={(e) => e.target === e.currentTarget && fecharModal()}>
          <section className="perfil-modal">
            <button className="perfil-fechar" onClick={fecharModal} disabled={enviando} aria-label="Fechar">
              <X size={20} />
            </button>

            {modal === "nome" ? (
              <form onSubmit={salvarNovoNome}>
                <h2>Alterar nome</h2>
                <label htmlFor="novo-nome">Novo nome</label>
                <input
                  id="novo-nome"
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Digite o novo nome"
                  required
                />
                {erroCodigo && <p className="msg-erro-codigo">{erroCodigo}</p>}
                <button type="submit" disabled={enviando}>
                  {enviando ? "Salvando..." : "Salvar nome"}
                </button>
                <button type="button" className="perfil-cancelar" onClick={fecharModal} disabled={enviando}>
                  Cancelar
                </button>
              </form>
            ) : modal === "email" ? (
              etapaEmail === 1 ? (
                <form onSubmit={enviarCodigoNovoEmail}>
                  <h2>Alterar e-mail</h2>
                  <label htmlFor="novo-email">Novo e-mail</label>
                  <input
                    id="novo-email"
                    type="email"
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    placeholder="Digite o novo e-mail"
                    required
                  />
                  {erroCodigo && <p className="msg-erro-codigo">{erroCodigo}</p>}
                  <button type="submit" disabled={enviando}>
                    {enviando ? "Enviando código..." : "Enviar código"}
                  </button>
                  <button type="button" className="perfil-cancelar" onClick={fecharModal} disabled={enviando}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <form onSubmit={confirmarNovoEmail}>
                  <h2>Verifique o seu novo e-mail</h2>
                  <p>
                    Enviamos um código de confirmação de 6 dígitos para o e-mail: <br />
                    <strong>{novoEmail}</strong>
                  </p>

                  <div className="caixas-codigo">
                    {codigo.map((digito, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        autoFocus={index === 0}
                        value={digito}
                        onChange={(e) => digitarCodigo(e.target.value, index)}
                        onKeyDown={(e) => VoltarCaixaApagar(e, index)}
                        onPaste={colarCodigo}
                        required
                      />
                    ))}
                  </div>

                  {erroCodigo && <p className="msg-erro-codigo">{erroCodigo}</p>}

                  <button type="submit" disabled={enviando}>
                    {enviando ? "Validando..." : "Confirmar código"}
                  </button>
                  <button
                    type="button"
                    className="perfil-cancelar"
                    onClick={() => {
                      setEtapaEmail(1);
                      setCodigo(["", "", "", "", "", ""]);
                      setErroCodigo("");
                    }}
                    disabled={enviando}
                  >
                    Voltar e alterar e-mail
                  </button>
                </form>
              )
            ) : (
              <>
                <h2>Redefinir senha</h2>
                <p>Enviar o link de redefinição para {usuario.email}?</p>
                <button onClick={redefinirSenha} disabled={enviando}>
                  {enviando ? "Enviando..." : "Enviar link"}
                </button>
                <button className="perfil-cancelar" onClick={fecharModal} disabled={enviando}>
                  Cancelar
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}