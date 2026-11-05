import { useState } from "react";
import "./index.scss";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

export default function PrimeiroAcesso() {
  const Navigate = useNavigate();

  const [Nome, setNome] = useState("");
  const [Foto, setFoto] = useState("");
  const [Vicio, setVicio] = useState("");
  const [Distracoes, setDistracoes] = useState([]);
  const [OutraDistracao, setOutraDistracao] = useState("");

  async function PrimeiroAcesso(e) {
    e.preventDefault();
  }

  return (
    <div className="pagina-primeiro-acesso">
      <main className="conteudo-principal">
        <section className="titulos">
          <h1>Seu começo, do seu jeito</h1>
          <p>
            Vamos conhecer um pouco de você para começar sua jornada na
            comunidade.
          </p>
        </section>

        <form className="card-formulario">
          <div className="campo-grupo">
            <label className="campo-titulo">Como você quer ser chamado?</label>
            <input
              type="text"
              className="input-texto"
              placeholder="Pode ser um apelido. Não precisa ser seu nome real."
              value={Nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="campo-grupo">
            <label className="campo-titulo">Escolha seu avatar</label>
            <span className="campo-subtitulo">
              Toque para selecionar. Você pode trocar quando quiser.
            </span>

            <div className="grid-avatares">
              {[1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((item) => {
                const nomeFoto = `pfp${item}.png`;
                return (
                  <button
                    type="button"
                    key={item}
                    className={`item-avatar ${Foto === nomeFoto ? "ativo" : ""}`}
                    onClick={() => setFoto(nomeFoto)}
                  >
                    <img
                      src={`/assets/avatares/${nomeFoto}`}
                      alt={`Avatar ${item}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="aviso-avatar">
              <Info className="icone-info" />
              <span>
                Você pode trocar seu avatar a qualquer momento nas
                configurações.
              </span>
            </div>
          </div>

          <div className="campo-grupo">
            <label className="campo-titulo">
              Qual vício você está acompanhando?
            </label>
            <span className="campo-subtitulo">
              Escolha uma opção para acompanhar agora.
            </span>
            <div className="grid-vicios">
              <button type="button" className="btn-opcao">
                Apostas
              </button>
              <button type="button" className="btn-opcao">
                Cigarro/Vape
              </button>
              <button type="button" className="btn-opcao">
                Drogas
              </button>
              <button type="button" className="btn-opcao">
                Outros
              </button>
            </div>
          </div>

          {/* 4. Distrações */}
          <div className="campo-grupo">
            <label className="campo-titulo">
              O que você gosta de fazer para se distrair?
            </label>
            <span className="campo-subtitulo">
              Você pode escolher mais de uma atividade.
            </span>
            <div className="grid-distracoes">
              <button type="button" className="btn-opcao-check">
                <span className="icon-check"></span> Ouvir música
              </button>
              <button type="button" className="btn-opcao-check">
                <span className="icon-check"></span> Caminhar
              </button>
              <button type="button" className="btn-opcao-check">
                <span className="icon-check"></span> Ler
              </button>
              <button type="button" className="btn-opcao-check">
                <span className="icon-check"></span> Cozinhar
              </button>
              <button type="button" className="btn-opcao-check">
                <span className="icon-check"></span> Exercitar-se
              </button>
              <button type="button" className="btn-opcao-check">
                <span className="icon-check"></span> Outra atividade
              </button>
            </div>

            {/* Campo condicional para Outra atividade */}
            <div className="campo-subgrupo">
              <label className="campo-titulo-menor">
                Qual outra atividade?
              </label>
              <input
                type="text"
                className="input-texto"
                placeholder="Desenhar"
              />
            </div>
          </div>

          {/* Botão Principal */}
          <button type="submit" className="btn-submit">
            Começar minha jornada
          </button>

          <p className="rodape-mensagem">Um passo de cada vez, no seu ritmo.</p>
        </form>
      </main>
    </div>
  );
}
