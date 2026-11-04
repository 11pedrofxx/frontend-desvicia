import './index.scss';

export default function PrimeiroAcesso() {
    return (
        <div className="pagina-primeiro-acesso">

            <main className="conteudo-principal">
                <section className="titulos">
                    <h1>Seu começo, do seu jeito</h1>
                    <p>Vamos conhecer um pouco de você para começar sua jornada na comunidade.</p>
                </section>

                <br />

                <form className="card-formulario">
                    <div className="campo-grupo">
                        <label className="campo-titulo">Como você quer ser chamado?</label>
                        <span className="campo-subtitulo">Pode ser um apelido. Não precisa ser seu nome real.</span>
                        <input 
                            type="text" 
                            className="input-texto" 
                            placeholder="Fique a vontade para mostrar como você quer se apresentar" 
                        />
                    </div>

                    {/* 2. Vício Principal */}
                    <div className="campo-grupo">
                        <label className="campo-titulo">Qual vício você está acompanhando?</label>
                        <span className="campo-subtitulo">Escolha uma opção para acompanhar agora.</span>
                        <div className="grid-vicios">
                            <button type="button" className="btn-opcao ativo">Apostas</button>
                            <button type="button" className="btn-opcao">Cigarro/Vape</button>
                            <button type="button" className="btn-opcao">Drogas</button>
                            <button type="button" className="btn-opcao">Outros</button>
                        </div>
                    </div>

                    {/* 3. Distrações */}
                    <div className="campo-grupo">
                        <label className="campo-titulo">O que você gosta de fazer para se distrair?</label>
                        <span className="campo-subtitulo">Você pode escolher mais de uma atividade.</span>
                        <div className="grid-distracoes">
                            <button type="button" className="btn-opcao-check ativo">
                                <span className="icon-check">✓</span> Ouvir música
                            </button>
                            <button type="button" className="btn-opcao-check ativo">
                                <span className="icon-check">✓</span> Caminhar
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
                            <button type="button" className="btn-opcao-check ativo">
                                <span className="icon-check">✓</span> Outra atividade
                            </button>
                        </div>

                        {/* Campo condicional para Outra atividade */}
                        <div className="campo-subgrupo">
                            <label className="campo-titulo-menor">Qual outra atividade?</label>
                            <input 
                                type="text" 
                                className="input-texto" 
                                placeholder="Desenhar" 
                            />
                        </div>
                    </div>

                    {/* Botão Principal */}
                    <button type="submit" className="btn-submit">
                        Começar minha jornada <span className="seta">→</span>
                    </button>

                    <p className="rodape-mensagem">Um passo de cada vez, no seu ritmo.</p>
                </form>
            </main>
        </div>
    );
}