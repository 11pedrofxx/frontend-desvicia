import './index.scss';
import ElementoTelaLogin from '../../components/CompTelaLogin/index.jsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { UserRound, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../service/api.js';


export default function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [token, settoken] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [etapa, setEtapa] = useState(1);
    const [codigo, setCodigo] = useState('');

    async function PreCadastro(e) {
        e.preventDefault();

        if (!token) {
            alert('Por favor, confirme a verificação do reCAPTCHA');
            return;
        }

        try {
            
            let resposta = await api.post('/usuario/pre-cadastro', {
                nome,
                email,
                senha,
                token
            })

            let emailuser = resposta.data.email
            localStorage.setItem('emailuser' , emailuser)
            setEtapa(2);

        } catch (error) {
            alert(error.response?.data?.erro || 'Erro ao enviar código.');
        }
    }

    async function ConfirmarCodigo(e) {
    e.preventDefault();

    if (!codigo || codigo.length < 6) {
        alert('Por favor, digite o código de 6 dígitos recebido por e-mail.');
        return;
    }

    try {
        let resposta = await api.post('/usuario/confirmar-cadastro', {
            email,
            codigo
        });

        localStorage.setItem('token', resposta.data.token);
        localStorage.setItem('user', JSON.stringify(resposta.data.usuario));

        alert('Conta criada e confirmada com sucesso!');
        navigate('/login');

    } catch (error) {
        alert(
            error.response?.data?.erro ||
            error.response?.data?.mensagem ||
            'Código inválido ou expirado. Tente novamente.'
        );
    }
}


    return (
        <div className="pagina-cadastro">
            <ElementoTelaLogin />

            <div className="cadastro">
                <section>
    <h1>Saiba que você <br />não está sozinho</h1>
    <h2>Cadastre-se para acessar uma rede de apoio segura, anônima e gratuita.</h2>

    {etapa === 1 ? (

        <form onSubmit={PreCadastro}>
            <div className="campo-cadastro">
                <label htmlFor="nome">Como você quer ser chamado?</label>
                <div className="input-icon">
                    <UserRound />
                    <input
                        id="nome"
                        type="text"
                        placeholder="Diga como devemos te chamar"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="campo-cadastro">
                <label htmlFor="email">Informe seu email</label>
                <div className="input-icon">
                    <Mail />
                    <input
                        id="email"
                        type="email"
                        placeholder="seuemail@dominio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="campo-cadastro">
                <label htmlFor="senha">Crie uma senha</label>
                <div className="input-icon">
                    <LockKeyhole />
                    <input
                        id="senha"
                        type={mostrarSenha ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required/>
                        <button type='button'
                        className='olhinho'
                        onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                </div>
            </div>

            <div className="captcha-box">
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(token) => settoken(token)}
                />
            </div>

            <div className="criar">
                <button type="submit">Criar conta</button>

                <div className="divisoria">
                    <span>OU</span>
                </div>

                <div className="google-box">
                    <GoogleLogin
                        onError={() => alert('Falha ao conectar com o Google.')}
                    />
                </div>

                <h3>
                    Já tem uma conta?<Link to={'/login'}>fazer login</Link>
                </h3>
            </div>
        </form>

    ) : (

        <form onSubmit={ConfirmarCodigo}>
            <div className="campo-cadastro">
                <label htmlFor="codigo">Digite o código enviado para {email}</label>
                <div className="input-icon">
                    <input
                        id="codigo"
                        type="text"
                        maxLength={6}
                        placeholder="Ex: 852338"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="criar">
                <button type="submit">Confirmar Código</button>
                <button type="button" onClick={() => setEtapa(1)}>
                    Voltar e alterar e-mail
                </button>
            </div>
        </form>

    )}
</section>
            </div>
        </div>
    );
}