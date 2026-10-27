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
                'Quando alguém ganha uma aposta, pode sentir uma sensação de recompensa imediata, acompanhada de empolgação e da impressão de que conseguiu uma oportunidade de ganhar dinheiro facilmente. Essa experiência pode fazer com que a pessoa queira jogar novamente, na tentativa de sentir a mesma satisfação. Mesmo quando já perdeu dinheiro anteriormente, a lembrança de uma vitória pode continuar influenciando suas decisões e dificultando a percepção dos riscos envolvidos.',
                
                'Com o tempo, algumas pessoas passam a apostar com mais frequência e a dedicar cada vez mais atenção ao jogo. Em determinadas situações, surge a vontade de recuperar o dinheiro perdido, como se uma nova aposta pudesse resolver o prejuízo anterior. Esse comportamento pode criar um ciclo difícil de interromper, no qual a pessoa continua jogando mesmo percebendo que está gastando mais do que deveria.',
                
                'Além das consequências financeiras, isso pode provocar ansiedade, frustração, dificuldades para cumprir compromissos e conflitos com familiares e amigos. Outro fator importante é que as apostas nem sempre são vistas apenas como uma forma de entretenimento. Para algumas pessoas, elas podem se tornar uma tentativa de aliviar sentimentos negativos, como tristeza, estresse, solidão ou preocupação com dinheiro.',
                
                'Entretanto, utilizar o jogo como uma maneira de lidar com esses sentimentos pode agravar os problemas existentes e aumentar a dificuldade de controlar o comportamento. Por isso, é importante observar os motivos que levam alguém a apostar e perceber quando esse hábito começa a ocupar um espaço excessivo na rotina.',
                
                'Uma forma de começar a mudar esse comportamento é reconhecer os momentos em que surge a vontade de apostar. Identificar situações que despertam esse impulso, como dificuldades financeiras, ansiedade, tédio ou até mesmo a divulgação de apostas nas redes sociais, pode ajudar a compreender melhor os próprios hábitos. Também é importante evitar decisões impulsivas e procurar atividades alternativas que contribuam para o bem-estar.',
                
                'Praticar exercícios, conversar com pessoas próximas ou desenvolver novos interesses são algumas possibilidades. Buscar apoio também é um passo importante nesse processo. Conversar com alguém de confiança pode ajudar a enfrentar as dificuldades sem precisar lidar com tudo sozinho.',
                
                'Caso as apostas estejam causando sofrimento emocional, dívidas ou prejuízos nos relacionamentos, procurar ajuda profissional é uma atitude válida e importante. O Sistema Único de Saúde (SUS) oferece atendimento por meio das unidades de saúde e de serviços especializados, conforme a necessidade de cada pessoa.',
                
                'Reconhecer que as apostas estão causando problemas não é motivo de vergonha. Cada pessoa tem seu próprio processo de mudança, e procurar ajuda pode ser o primeiro passo para recuperar o controle das decisões, reorganizar a vida financeira e construir uma rotina mais saudável. Mais importante do que tentar recuperar o dinheiro perdido é cuidar de si mesmo e evitar que novas apostas aumentem os prejuízos.'
            ]
        },
        {
            id: 2,
            categoria: 'ANSIEDADE',
            filtro: 'Saúde mental',
            titulo: 'O que acontece quando a vontade aparece?',
            tempo: '5 min de leitura',
            imagem: '/assets/images/48139752-por-do-sol-em-a-de-praia-com-ondas-e-oceano-fundo-gratis-foto.jpg',
            resumo: 'A vontade de repetir um hábito pode aparecer em momentos de ansiedade, estresse ou tédio, mesmo quando você está tentando mudar.',
            texto: [
                'A vontade de repetir um comportamento pode surgir em resposta a emoções, lugares, situações ou rotinas que você associa àquele hábito. Às vezes, ela aparece depois de um dia estressante, durante um momento de ansiedade ou simplesmente quando você está sem nada para fazer. Em outras situações, determinados lugares, pessoas ou lembranças podem despertar essa vontade sem que você perceba imediatamente o motivo.',
                
                'Quando isso acontecer, tente fazer uma pausa antes de agir. Identifique o que está sentindo e observe o que despertou essa vontade. Pergunte a si mesmo se você está procurando aliviar alguma emoção, fugir de um problema ou preencher um momento de tédio. Reconhecer esses sinais pode ajudar você a entender melhor seus comportamentos e a perceber que nem toda vontade precisa se transformar em uma ação.',
                
                'Uma estratégia que pode ajudar é mudar temporariamente o foco. Respirar com calma, caminhar um pouco, ouvir uma música, conversar com alguém de confiança ou realizar outra atividade pode ajudar a atravessar esse momento. Também pode ser útil se afastar, por alguns minutos, de situações que facilitam a repetição do hábito. Nem toda estratégia funciona da mesma forma para todas as pessoas, por isso vale observar quais alternativas fazem sentido para você.',
                
                'É importante lembrar que sentir vontade não significa que você perdeu todo o progresso que já conquistou. Mudanças de comportamento levam tempo, e alguns dias podem ser mais difíceis do que outros. Em vez de se culpar, procure entender o que aconteceu e pense no que poderia ajudar em uma situação semelhante no futuro.',
                
                'Você também pode anotar quando a vontade aparece e o que estava acontecendo naquele momento. Com o passar do tempo, essas anotações podem ajudar a identificar situações recorrentes e a planejar maneiras diferentes de lidar com elas. O objetivo não é controlar todas as emoções, mas aprender a reconhecê-las e responder a elas com mais consciência.',
                
                'Se a vontade estiver difícil de controlar, aparecer com muita frequência ou estiver prejudicando seus relacionamentos, sua rotina ou sua saúde, buscar ajuda profissional é um passo importante. Você não precisa enfrentar tudo sozinho. Com apoio adequado, é possível compreender melhor os gatilhos e desenvolver estratégias para lidar com eles de maneira mais saudável.'
            ]
        },
        {
            id: 3,
            categoria: 'BEM-ESTAR',
            filtro: 'Comportamentos',
            titulo: 'Pequenas mudanças ajudam a criar novos hábitos',
            tempo: '5 min de leitura',
            imagem: '/assets/images/Val-d-Orcia-panorama-toscana-1024x683.jpg',
            resumo: 'Mudanças simples na rotina podem ajudar você a construir alternativas mais saudáveis e desenvolver hábitos que façam sentido para sua vida.',
            texto: [
                'Mudar um hábito nem sempre é fácil. Muitas vezes, um comportamento se torna parte da rotina porque oferece uma sensação imediata de alívio, distração ou satisfação. Por isso, tentar mudar tudo de uma vez pode gerar frustração e tornar o processo mais difícil. Em vez disso, escolha uma mudança pequena, realista e possível de manter no seu dia a dia.',
                
                'O primeiro passo é observar como esse hábito aparece na sua rotina. Perceba em quais horários ele costuma acontecer, quais emoções estão presentes e quais situações parecem estimular sua repetição. Quando você identifica esses padrões, fica mais fácil planejar alternativas para os momentos em que a vontade surgir. Conhecer seus próprios gatilhos ajuda a tomar decisões com mais consciência.',
                
                'Depois de reconhecer esses momentos, experimente substituir o comportamento por uma atividade diferente. Você pode fazer uma caminhada curta, organizar alguma tarefa, praticar um exercício de respiração, ler algumas páginas de um livro ou conversar com alguém de confiança. O objetivo não é preencher cada minuto do dia, mas encontrar alternativas que contribuam para seu bem-estar e que sejam adequadas à sua realidade.',
                
                'Também pode ajudar estabelecer metas pequenas e acompanhar seu progresso. Em vez de exigir mudanças imediatas, concentre-se em atitudes que você consegue realizar hoje. Se decidir diminuir o tempo nas redes sociais, por exemplo, comece reservando alguns minutos do dia para ficar longe do celular. Se estiver tentando controlar outro comportamento, pense em uma ação simples que possa colocar em prática quando sentir vontade de repeti-lo.',
                
                'Outra possibilidade é modificar alguns elementos do ambiente. Deixar o celular longe durante as refeições, evitar situações que estimulem um comportamento indesejado ou organizar melhor os horários das atividades são exemplos de pequenas mudanças que podem facilitar novas escolhas. O importante é encontrar soluções que funcionem na sua rotina, sem transformar o processo em uma cobrança constante.',
                
                'Valorize o progresso, mesmo quando ele parecer pequeno. Um dia difícil não apaga os esforços que você já fez, e uma dificuldade não significa que você precisa desistir. Aproveite esses momentos para entender o que funcionou, reconhecer os obstáculos e ajustar seus próximos passos. Criar novos hábitos é um processo que pode exigir paciência, consistência e flexibilidade.',
                
                'Lembre-se de que cada pessoa tem uma rotina, necessidades e dificuldades diferentes. Por isso, não é necessário comparar seu progresso com o de outras pessoas. Respeitar seu próprio ritmo pode ajudar a tornar as mudanças mais sustentáveis e diminuir a frustração durante o processo.',
                
                'Se precisar, conte com pessoas de confiança e profissionais de saúde para construir um plano adequado à sua realidade. Pequenas mudanças, quando feitas com intenção e acompanhadas ao longo do tempo, podem ajudar você a desenvolver uma relação mais saudável com seus hábitos e a cuidar melhor de si mesmo.'
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
                    aria-label="Mostrar todas as notícias"
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
                            <p
                                className="paragrafo-detalhe"
                                key={indice}
                            >
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
                                        alt={noticia.titulo}
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
