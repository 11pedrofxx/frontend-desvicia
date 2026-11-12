import {
    UserRound,
    Activity,
    ClipboardList,
    CircleAlert,
    ChevronRight
} from 'lucide-react';

import './index.scss';

export default function Apoio() {
    function falarComAlguem() {
        console.log('Abrir contato com pessoa de confiança');
    }

    function exercicioRespiracao() {
        console.log('Abrir exercício de respiração');
    }

    function listaApoio() {
        console.log('Abrir lista de apoio');
    }

    function ajudaEmergencial() {
        console.log('Abrir ajuda emergencial');
    }

    return (
        <main className="pagina-apoio">

            <section className="cabecalho-apoio">
                <h1>Apoio</h1>

                <h2>Você não está sozinho.</h2>

                <p>
                    Se este momento estiver difícil ou se você estiver
                    lidando com um forte impulso, escolha uma das
                    opções abaixo.
                </p>
            </section>

            <section className="opcoes-apoio">

                <button
                    className="card-apoio"
                    onClick={falarComAlguem}
                >
                    <div className="icone-apoio">
                        <UserRound size={23} />
                    </div>

                    <div className="texto-apoio">
                        <h3>Falar com alguém</h3>

                        <p>
                            Contate uma pessoa de sua
                            confiança agora
                        </p>
                    </div>

                    <ChevronRight
                        className="seta-apoio"
                        size={23}
                    />
                </button>

                <button
                    className="card-apoio"
                    onClick={exercicioRespiracao}
                >
                    <div className="icone-apoio">
                        <Activity size={23} />
                    </div>

                    <div className="texto-apoio">
                        <h3>Exercício de respiração</h3>

                        <p>
                            Técnica rápida para reduzir a
                            ansiedade
                        </p>
                    </div>

                    <ChevronRight
                        className="seta-apoio"
                        size={23}
                    />
                </button>

                <button
                    className="card-apoio"
                    onClick={listaApoio}
                >
                    <div className="icone-apoio">
                        <ClipboardList size={23} />
                    </div>

                    <div className="texto-apoio">
                        <h3>Minha lista de apoio</h3>

                        <p>
                            Acessar minhas técnicas de
                            superação salvas
                        </p>
                    </div>

                    <ChevronRight
                        className="seta-apoio"
                        size={23}
                    />
                </button>

                <button
                    className="card-apoio card-emergencial"
                    onClick={ajudaEmergencial}
                >
                    <div className="icone-apoio icone-emergencial">
                        <CircleAlert size={23} />
                    </div>

                    <div className="texto-apoio">
                        <h3>Ajuda emergencial imediata</h3>

                        <p>
                            Canais especializados e serviços
                            públicos
                        </p>
                    </div>

                    <ChevronRight
                        className="seta-apoio"
                        size={23}
                    />
                </button>

            </section>

            <div className="aviso-apoio">
                <p>
                    Nossos canais apoiam na autogestão emocional,
                    mas não substituem serviços públicos de
                    emergência médica ou psicológica.
                </p>
            </div>

        </main>
    );
}



