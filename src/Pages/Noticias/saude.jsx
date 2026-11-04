import { useState } from 'react';
import './index.scss';
import { Brain, DollarSign, Newspaper, Heart, Pill } from 'lucide-react';

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
            imagem: './assets/images/cassino.jpg',
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
            imagem: '/assets/images/blond.jpg',
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
            imagem: '/assets/images/bemestar.jpg',
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
        },


        {
            id: 4,
            categoria: 'SAÚDE MENTAL',
            filtro: 'Saúde mental',
            titulo: 'Como a ansiedade pode influenciar seus hábitos?',
            tempo: '5 min de leitura',
            imagem: '/assets/images/ansiedade.jpg',
            resumo: 'Entenda como a ansiedade pode influenciar suas escolhas e fazer com que determinados hábitos se tornem uma forma de alívio.',
            texto: [
                'A ansiedade pode influenciar diferentes aspectos da rotina. Em momentos de preocupação, estresse ou insegurança, algumas pessoas procuram atividades que proporcionem uma sensação imediata de alívio. Isso pode incluir passar muito tempo nas redes sociais, apostar, fumar ou recorrer a outros comportamentos repetitivos.',
                'O problema acontece quando essas atividades começam a ser utilizadas como a principal maneira de lidar com emoções difíceis. Embora possam proporcionar uma distração momentânea, elas nem sempre resolvem o que está causando o desconforto e podem acabar criando novas dificuldades.',
                'Reconhecer essa relação é um passo importante. Observar quais situações despertam ansiedade e identificar como você costuma reagir pode ajudar a encontrar alternativas mais saudáveis, como conversar com alguém, caminhar, praticar exercícios de respiração ou procurar acompanhamento profissional.'
            ]
        },
        {
            id: 5,
            categoria: 'AUTOCONHECIMENTO',
            filtro: 'Saúde mental',
            titulo: 'Por que respeitar seu próprio tempo é tão importante?',
            tempo: '4 min de leitura',
            imagem: '/assets/images/rest.jpg',
            resumo: 'Cada pessoa possui um ritmo diferente de mudança. Aprenda a reconhecer suas conquistas sem transformar o processo em uma cobrança.',
            texto: [
                'Mudar um comportamento exige tempo, dedicação e paciência. Muitas vezes, existe a expectativa de conseguir abandonar um hábito rapidamente, mas essa cobrança pode provocar frustração quando os resultados não aparecem como esperado.',
                'Comparar seu progresso com o de outras pessoas também pode tornar esse processo mais difícil. Cada indivíduo possui experiências, dificuldades e rotinas diferentes. Por isso, o que funciona para alguém pode não funcionar da mesma maneira para você.',
                'Procure valorizar pequenas conquistas e estabelecer objetivos possíveis. Se um dia não sair como planejado, tente compreender o que aconteceu e pense em como agir de maneira diferente na próxima oportunidade. Seu progresso não precisa ser perfeito para ser importante.'
            ]
        },
        {
            id: 6,
            categoria: 'APOSTAS · COMPORTAMENTO',
            filtro: 'Apostas',
            titulo: 'A ilusão de recuperar o dinheiro perdido nas apostas',
            tempo: '6 min de leitura',
            imagem: './assets/images/frustated.jpg',
            resumo: 'Entenda por que tentar recuperar prejuízos pode aumentar as perdas e dificultar o controle sobre as apostas.',
            texto: [
                'Depois de perder dinheiro em uma aposta, algumas pessoas sentem que precisam jogar novamente para recuperar o valor perdido. Essa sensação pode criar a impressão de que basta conseguir mais uma vitória para resolver o problema.',
                'Entretanto, apostar novamente não garante a recuperação do dinheiro. Pelo contrário, essa tentativa pode aumentar os prejuízos e fazer com que a pessoa comprometa valores que seriam utilizados em necessidades importantes.',
                'Uma atitude importante é reconhecer quando a vontade de apostar está relacionada à tentativa de recuperar perdas. Evitar novas apostas, afastar-se temporariamente das plataformas e conversar com alguém de confiança são medidas que podem ajudar a interromper esse ciclo.',
                'Se as apostas já estão causando dificuldades financeiras ou emocionais, procurar apoio profissional pode ajudar a encontrar maneiras de lidar com a situação e reorganizar a rotina.'
            ]
        },
        {
            id: 7,
            categoria: 'APOSTAS · SAÚDE',
            filtro: 'Apostas',
            titulo: 'Como identificar quando as apostas deixam de ser diversão?',
            tempo: '5 min de leitura',
            imagem: './assets/images/gamble.jpg',
            resumo: 'Alguns sinais podem indicar que as apostas estão ocupando um espaço excessivo na sua vida.',
            texto: [
                'Para algumas pessoas, as apostas começam como uma atividade ocasional. Com o passar do tempo, porém, podem ocupar cada vez mais espaço na rotina, nos pensamentos e nas decisões financeiras.',
                'Entre os sinais de atenção estão pensar frequentemente em apostar, gastar mais dinheiro do que o planejado, esconder apostas de familiares e amigos ou sentir dificuldade para parar mesmo depois de perceber consequências negativas.',
                'Outro sinal importante é deixar de realizar atividades cotidianas para acompanhar jogos ou procurar novas oportunidades de apostar. Quando isso acontece, vale observar com cuidado o espaço que esse comportamento está ocupando.',
                'Reconhecer esses sinais não significa que você precisa enfrentar a situação sozinho. Conversar com pessoas de confiança e buscar orientação profissional são atitudes importantes para recuperar o controle.'
            ]
        },
        {
            id: 8,
            categoria: 'NOVOS HÁBITOS',
            filtro: 'Comportamentos',
            titulo: 'Como diminuir o tempo nas redes sociais?',
            tempo: '4 min de leitura',
            imagem: '/assets/images/stop.jpg',
            resumo: 'Pequenas mudanças na utilização do celular podem ajudar a construir uma relação mais equilibrada com a tecnologia.',
            texto: [
                'As redes sociais fazem parte da rotina de muitas pessoas. Elas permitem conversar, acompanhar acontecimentos e encontrar entretenimento. Entretanto, quando o tempo de utilização começa a prejudicar outras atividades, pode ser necessário repensar alguns hábitos.',
                'Uma maneira de começar é observar quanto tempo você passa nas redes sociais e em quais momentos costuma utilizar o celular. Muitas vezes, o acesso acontece automaticamente, principalmente durante períodos de tédio, ansiedade ou antes de dormir.',
                'Experimente estabelecer pequenos períodos sem celular, desativar notificações desnecessárias e substituir alguns momentos de navegação por outras atividades, como leitura, exercícios ou conversas presenciais.',
                'O objetivo não precisa ser abandonar completamente a tecnologia, mas desenvolver uma relação mais consciente com ela, permitindo que as redes sociais ocupem um espaço equilibrado na sua rotina.'
            ]
        },
        {
            id: 9,
            categoria: 'BEM-ESTAR · SAÚDE',
            filtro: 'Comportamentos',
            titulo: 'O cigarro e o ciclo da dependência: por onde começar?',
            tempo: '6 min de leitura',
            imagem: '/assets/images/panico.jpg',
            resumo: 'Conheça alguns fatores que tornam difícil abandonar o cigarro e descubra atitudes que podem ajudar nesse processo.',
            texto: [
                'O cigarro pode se tornar parte de diferentes momentos do cotidiano. Algumas pessoas associam o consumo ao café, às pausas no trabalho, aos encontros sociais ou a situações de estresse. Com o tempo, essas associações podem fortalecer o hábito.',
                'A dependência da nicotina também pode provocar sintomas de abstinência, como irritabilidade, ansiedade e dificuldade de concentração. Esses fatores podem tornar o processo de parar de fumar mais desafiador.',
                'Identificar os momentos em que surge a vontade de fumar é um bom começo. Procure observar os gatilhos e experimentar alternativas, como beber água, caminhar, conversar com alguém ou realizar exercícios de respiração.',
                'O acompanhamento profissional pode fazer diferença durante esse processo. Existem tratamentos e estratégias que ajudam a lidar com a dependência da nicotina. Buscar orientação em uma unidade de saúde é uma forma de começar com apoio adequado.'
            ]
        },

        
        {
            id: 10,
            categoria: 'SUBSTÂNCIAS · CANNABIS',
            filtro: 'Drogas',
            titulo: 'Maconha: quais são os efeitos no organismo?',
            tempo: '5 min de leitura',
            imagem: '/assets/images/natureza.jpg',
            resumo: 'Conheça os efeitos que a cannabis pode provocar no cérebro, na memória e no comportamento.',
            texto: [
                'A maconha é uma substância derivada da planta cannabis. Seu principal composto psicoativo, o THC, atua no sistema nervoso central e pode alterar a percepção, a memória, a atenção e a coordenação motora.',
                'Entre os efeitos de curto prazo estão alterações na percepção do tempo, dificuldade de concentração, prejuízo na memória recente, aumento dos batimentos cardíacos e mudanças no humor. Algumas pessoas também podem apresentar ansiedade, medo ou episódios de paranoia.',
                'O uso frequente pode aumentar o risco de dependência e provocar dificuldades relacionadas à memória, à aprendizagem e à realização de atividades cotidianas. Os riscos podem ser maiores quando o consumo começa durante a adolescência.',
                'É importante compreender que os efeitos variam de acordo com diferentes fatores, incluindo características individuais e frequência de exposição. Buscar informações confiáveis e orientação profissional ajuda a compreender os riscos e a cuidar da própria saúde.'
            ]
        },
        {
            id: 11,
            categoria: 'SUBSTÂNCIAS · ESTIMULANTES',
            filtro: 'Drogas',
            titulo: 'Cocaína: o que acontece com o corpo e a mente?',
            tempo: '6 min de leitura',
            imagem: '/assets/images/doente.jpg',
            resumo: 'Entenda como essa substância estimulante afeta o sistema nervoso e pode prejudicar a saúde.',
            texto: [
                'A cocaína é uma substância estimulante que atua diretamente no sistema nervoso central. Ela interfere no funcionamento de substâncias químicas do cérebro relacionadas à sensação de prazer e recompensa.',
                'Entre os efeitos imediatos podem ocorrer aumento da frequência cardíaca, elevação da pressão arterial, agitação, euforia, ansiedade e dificuldade para dormir. Em determinadas situações, também podem surgir comportamentos impulsivos e alterações na percepção.',
                'O uso pode provocar consequências graves, incluindo problemas cardiovasculares, convulsões, alterações psicológicas e dependência. A exposição frequente pode prejudicar os relacionamentos, a rotina, a saúde financeira e o bem-estar emocional.',
                'A dependência não deve ser tratada como falta de força de vontade. É uma condição que pode exigir acompanhamento especializado. Procurar ajuda profissional é um passo importante para compreender o problema e iniciar um processo de recuperação.'
            ]
        },
        {
            id: 12,
            categoria: 'SUBSTÂNCIAS · INALANTES',
            filtro: 'Drogas',
            titulo: 'Inalantes: os perigos que muitas vezes passam despercebidos',
            tempo: '5 min de leitura',
            imagem: '/assets/images/pulmao.jpg',
            resumo: 'Saiba por que a inalação de substâncias químicas pode representar riscos graves para o cérebro e outros órgãos.',
            texto: [
                'Inalantes são substâncias químicas que podem produzir efeitos psicoativos quando seus vapores são respirados. Alguns produtos presentes no cotidiano podem conter compostos capazes de provocar intoxicação quando utilizados dessa maneira.',
                'Os efeitos podem incluir tontura, confusão mental, dificuldade de coordenação, náuseas e alterações na percepção. Dependendo da substância e da exposição, também podem ocorrer prejuízos ao sistema nervoso e a outros órgãos.',
                'Um dos riscos mais importantes é que a intoxicação pode acontecer de maneira imprevisível. Em situações graves, a exposição pode provocar problemas respiratórios, alterações no ritmo cardíaco, perda de consciência e até morte súbita.',
                'Caso alguém apresente sinais de intoxicação, é importante procurar atendimento de emergência. O uso dessas substâncias não deve ser considerado inofensivo apenas porque alguns produtos são encontrados em ambientes domésticos.'
            ]
        },


    ];

    const filtros = [
        'Saúde mental',
        'Apostas',
        'Notícia',
        'Comportamentos',
        'Drogas'
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
                                    {filtro === 'Saúde mental' && <Brain size={17} />}
                                    {filtro === 'Apostas' && <DollarSign size={17} />}
                                    {filtro === 'Notícia' && <Newspaper size={17} />}
                                    {filtro === 'Comportamentos' && <Heart size={17} />}
                                    {filtro === 'Drogas' && <Pill size={17} />}
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
