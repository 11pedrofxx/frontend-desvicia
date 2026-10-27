
import { useState } from 'react';
import './index.scss';

export default function Saude() {
    const [categoriaAtiva, setCategoriaAtiva] = useState('Saúde mental');
    const [noticiaAberta, setNoticiaAberta] = useState(null);

    const noticias = [
        {
            id: 1,
            categoria: 'APOSTAS · FINANÇAS',
            filtro: 'Apostas',
            titulo: 'Por que é tão difícil parar depois de ganhar?',
            tempo: '5 min de leitura',
            imagem: './assets/images/dindin.jpg',
            resumo: 'Ganhar uma aposta pode criar a vontade de continuar jogando. Entenda como esse ciclo pode afetar suas decisões.',
            texto: [
                "Quando alguém ganha uma aposta, pode sentir uma sensação de recompensa imediata, acompanhada de empolgação e da impressão de que conseguiu uma oportunidade de ganhar dinheiro facilmente. Essa experiência pode fazer com que a pessoa queira jogar novamente, na tentativa de sentir a mesma satisfação. Mesmo quando já perdeu dinheiro anteriormente, a lembrança de uma vitória pode continuar influenciando suas decisões e dificultando a percepção dos riscos envolvidos. Com o tempo, algumas pessoas passam a apostar com mais frequência e a dedicar cada vez mais atenção ao jogo. Em determinadas situações, surge a vontade de recuperar o dinheiro perdido, como se uma nova aposta pudesse resolver o prejuízo anterior. Esse comportamento pode criar um ciclo difícil de interromper, no qual a pessoa continua jogando mesmo percebendo que está gastando mais do que deveria. Além das consequências financeiras, isso pode provocar ansiedade, frustração, dificuldades para cumprir compromissos e conflitos com familiares e amigos. Outro fator importante é que as apostas nem sempre são vistas apenas como uma forma de entretenimento. Para algumas pessoas, elas podem se tornar uma tentativa de aliviar sentimentos negativos, como tristeza, estresse, solidão ou preocupação com dinheiro. Entretanto, utilizar o jogo como uma maneira de lidar com esses sentimentos pode agravar os problemas existentes e aumentar a dependência da atividade. Por isso, é importante observar os motivos que levam alguém a apostar e perceber quando esse hábito começa a ocupar um espaço excessivo na rotina. Uma forma de começar a mudar esse comportamento é reconhecer os momentos em que surge a vontade de apostar. Identificar situações que despertam esse impulso, como dificuldades financeiras, ansiedade, tédio ou até mesmo a divulgação de apostas nas redes sociais, pode ajudar a compreender melhor os próprios hábitos. Também é importante evitar decisões impulsivas, estabelecer limites para o uso do dinheiro e procurar atividades alternativas que contribuam para o bem-estar, como praticar exercícios, conversar com pessoas próximas ou desenvolver novos interesses. Buscar apoio também é um passo importante nesse processo. Conversar com alguém de confiança pode ajudar a enfrentar as dificuldades sem precisar lidar com tudo sozinho. Caso as apostas estejam causando sofrimento emocional, dívidas ou prejuízos nos relacionamentos, procurar ajuda profissional é uma atitude válida e importante. O Sistema Único de Saúde (SUS) oferece atendimento por meio das unidades de saúde e de serviços especializados, conforme a necessidade de cada pessoa. Reconhecer que as apostas estão causando problemas não é motivo de vergonha. Cada pessoa tem seu próprio processo de mudança, e procurar ajuda pode ser o primeiro passo para recuperar o controle das decisões, reorganizar a vida financeira e construir uma rotina mais saudável. Mais importante do que tentar recuperar o dinheiro perdido é cuidar de si mesmo e evitar que novas apostas aumentem os prejuízos."
            ]
        },
        {
            id: 2,
            categoria: 'ANSIEDADE',
            filtro: 'Saúde mental',
            titulo: 'O que acontece quando a vontade aparece?',
            tempo: '4 min de leitura',
            imagem: '/assets/images/48139752-por-do-sol-em-a-de-praia-com-ondas-e-oceano-fundo-gratis-foto.jpg',
            resumo: 'A vontade de repetir um hábito pode aparecer em momentos de ansiedade, estresse ou tédio.',
            texto: [
                'A vontade de repetir um comportamento pode surgir em resposta a emoções, lugares, situações ou rotinas que você associa àquele hábito.',
                'Quando isso acontecer, tente fazer uma pausa antes de agir. Identifique o que está sentindo e observe o que despertou essa vontade.',
                'Respirar com calma, caminhar, conversar com alguém ou realizar outra atividade pode ajudar a atravessar esse momento. Nem toda estratégia funciona da mesma forma para todas as pessoas.',
                'Se a vontade estiver difícil de controlar ou estiver prejudicando sua vida, buscar ajuda profissional é um passo importante.'
            ]
        },
        {
            id: 3,
            categoria: 'BEM-ESTAR',
            filtro: 'Comportamentos',
            titulo: 'Pequenas mudanças ajudam a criar novos hábitos',
            tempo: '4 min de leitura',
            imagem: '/assets/images/Val-d-Orcia-panorama-toscana-1024x683.jpg',
            resumo: 'Mudanças simples na rotina podem ajudar você a construir alternativas mais saudáveis.',
            texto: [
                'Mudar um hábito nem sempre é fácil. Em vez de tentar transformar toda a rotina de uma vez, escolha uma mudança pequena e possível de manter.',
                'Observe quais situações despertam o comportamento que você deseja mudar. Planejar uma alternativa para esses momentos pode facilitar a escolha de uma resposta diferente.',
                'Valorize o progresso, mesmo quando ele parecer pequeno. Um dia difícil não apaga os esforços que você já fez.',
                'Se precisar, conte com pessoas de confiança e profissionais de saúde para construir um plano adequado à sua realidade.'
            ]
        }
    ];

    const filtros = [
        'Saúde mental',
        'Apostas',
        'Notícia',
        'Comportamentos'
    ];

    const noticiasFiltradas = noticias.filter((noticia) => {
        if (categoriaAtiva === 'Notícia') {
            return true;
        }

        return noticia.filtro === categoriaAtiva;
    });

    return (
        <div className="pagina-noticias">

            <header className="cabecalho-noticias">
                <h1>Aprender</h1>

                <button
                    className="botao-busca"
                    aria-label="Buscar notícias"
                    onClick={() => setCategoriaAtiva('Notícia')}
                >
                    ⌕
                </button>
            </header>

            <main className="conteudo-noticias">

                {noticiaAberta ? (
                    <article className="detalhe-noticia">

                        <button
                            className="voltar-noticia"
                            onClick={() => setNoticiaAberta(null)}
                        >
                            ← Voltar para Aprender
                        </button>

                        <p className="categoria-detalhe">
                            {noticiaAberta.categoria}
                        </p>

                        <h2>{noticiaAberta.titulo}</h2>

                        <p className="tempo-leitura">
                            {noticiaAberta.tempo} · Conteúdo educativo
                        </p>

                        <img
                            className="imagem-detalhe"
                            src={noticiaAberta.imagem}
                            alt={noticiaAberta.titulo}
                        />

                        {noticiaAberta.texto.map((paragrafo, indice) => (
                            <p className="paragrafo-detalhe" key={indice}>
                                {paragrafo}
                            </p>
                        ))}

                        <div className="dica-noticia">
                            Cuidar de si também é reconhecer quando você
                            precisa de apoio. Um passo de cada vez.
                        </div>

                    </article>
                ) : (
                    <>
                        <section className="introducao">
                            <h2>Aprenda algo novo</h2>
                        </section>

                        <div className="filtros-noticias">
                            {filtros.map((filtro) => (
                                <button
                                    key={filtro}
                                    className={
                                        categoriaAtiva === filtro ? 'ativo' : ''
                                    }
                                    onClick={() => setCategoriaAtiva(filtro)}
                                >
                                    {filtro === 'Saúde mental' && '◎ '}
                                    {filtro === 'Apostas' && '▧ '}
                                    {filtro === 'Notícia' && '▤ '}
                                    {filtro === 'Comportamentos' && '☻ '}
                                    {filtro}
                                </button>
                            ))}
                        </div>

                        <section className="lista-noticias">
                            {noticiasFiltradas.map((noticia) => (
                                <article
                                    className="card-noticia"
                                    key={noticia.id}
                                    onClick={() => setNoticiaAberta(noticia)}
                                >
                                    <img
                                        src={noticia.imagem}
                                        alt=""
                                    />

                                    <span className="categoria">
                                        {noticia.categoria}
                                    </span>

                                    <h3>{noticia.titulo}</h3>

                                    <span className="tempo-leitura">
                                        {noticia.tempo}
                                    </span>
                                </article>
                            ))}
                        </section>
                    </>
                )}

            </main>
        </div>
    );
}   