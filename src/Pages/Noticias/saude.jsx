
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
            imagem: '/assets/images/5ea7d1893d19b5a84346614f747bd12c.jpg',
            resumo: 'Ganhar uma aposta pode criar a vontade de continuar jogando. Entenda como esse ciclo pode afetar suas decisões.',
            texto: [
                'Quando alguém ganha uma aposta, pode sentir uma recompensa imediata. Essa sensação pode aumentar a vontade de jogar novamente, mesmo quando a pessoa já perdeu dinheiro anteriormente.',
                'Com o tempo, algumas pessoas passam a tentar recuperar perdas ou repetir a sensação de ganhar. Isso pode prejudicar a organização financeira, a rotina e os relacionamentos.',
                'Uma forma de começar a mudar esse comportamento é reconhecer os momentos em que surge a vontade de apostar, evitar decisões impulsivas e conversar com alguém de confiança.',
                'Se as apostas estiverem causando sofrimento ou prejuízos, procure apoio. O SUS oferece atendimento nas unidades de saúde e nos serviços especializados, conforme a necessidade.'
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