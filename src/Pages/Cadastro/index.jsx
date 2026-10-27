import './index.scss';
import ElementoTelaLogin from '../../components/CompTelaLogin/index.jsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { UserRound, Mail, LockKeyhole, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../service/api.js';
import toast from 'react-hot-toast';

export default function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [token, settoken] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [Carregando, setCarregando] = useState(false);

    const [etapa, setEtapa] = useState(1);
    const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
    const [erroCodigo, setErroCodigo] = useState('');

    function digitarCodigo(valor, index) {
        if (isNaN(valor)) return;

        setErroCodigo('');

        const novoCodigo = [...codigo];
        novoCodigo[index] = valor.slice(-1);
        setCodigo(novoCodigo);

        if (valor && index < 5) {
            document.getElementById(`code-input-${index + 1}`)?.focus();
        }
    }

    function VoltarCaixaApagar(e, index) {
        if (e.key === 'Backspace' && !codigo[index] && index > 0) {
            document.getElementById(`code-input-${index - 1}`)?.focus();
        }
    }

    async function PreCadastro(e) {
        e.preventDefault();

        if (!token) {
            toast.error('Por favor, confirme a verificação do reCAPTCHA.');
            return;
        }

        try {
            setCarregando(true);
            let resposta = await api.post('/usuario/pre-cadastro', {
                nome,
                email,
                senha,
                token
            });

            let emailuser = resposta.data.email;
            localStorage.setItem('emailuser', emailuser);
            setEtapa(2);

        } catch (error) {
        } finally {
            setCarregando(false);
        }
    }

    async function ConfirmarCodigo(e) {
        e.preventDefault();

        const codigoString = codigo.join('');
        if (codigoString.length < 6) {
            toast.error('Por favor, preencha todos os 6 dígitos do código.');
            return;
        }

        try {
            setCarregando(true);
            let resposta = await api.post('/usuario/confirmar-cadastro', {
                email,
                codigo: codigoString
            });

            localStorage.setItem('token', resposta.data.token);
            localStorage.setItem('user', JSON.stringify(resposta.data.usuario));

            navigate('/login');

        } catch (error) {

        } finally {
            setCarregando(false);
        }
    }

    async function LoginGoogle(credencial) {
        try {
            setCarregando(true);
            const resposta = await api.post('/login/google', {
                googleToken: credencial.credential
            });

            localStorage.setItem('token', resposta.data.token);
            localStorage.setItem('user', JSON.stringify(resposta.data.usuario));

            navigate('/app'); 

        } catch (error) {

        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="pagina-cadastro">
            <ElementoTelaLogin />

            <div className="cadastro">
                <section>

                    {etapa === 1 ? (

                        <form onSubmit={PreCadastro}>
                            <h1>Saiba que você <br />não está sozinho</h1>
                            <h2>Cadastre-se para acessar uma rede de apoio segura, anônima e gratuita.</h2>
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
                                        required />
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
                                <button type="submit" disabled={Carregando}>
                                    {Carregando ? (
                                        <span className="carregar">
                                            <Loader2 className="girar" size={20} />
                                            Criando conta...
                                        </span>
                                    ) : (
                                        'Criar Conta'
                                    )}
                                </button>

                                <div className="divisoria">
                                    <span>OU</span>
                                </div>

                                <div className="google-box">
                                    <GoogleLogin
                                        onSuccess={LoginGoogle}
                                        onError={() => toast.error('Falha ao conectar com os serviços do Google.')}
                                    />
                                </div>

                                <h3>
                                    Já tem uma conta?<Link to={'/login'}>fazer login</Link>
                                </h3>
                            </div>
                        </form>

                    ) : (

                        <form onSubmit={ConfirmarCodigo}>
                            <h1>Sua jornada começa agora</h1>
                            <h2>
                                Enviamos um código de confirmação de 6 dígitos para o e-mail: <br />
                                <strong>{email}</strong>
                            </h2>

                            <div className="caixas-codigo">
                                {codigo.map((digito, index) => (
                                    <input
                                        key={index}
                                        id={`code-input-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digito}
                                        onChange={(e) => digitarCodigo(e.target.value, index)}
                                        onKeyDown={(e) => VoltarCaixaApagar(e, index)}
                                        required
                                    />
                                ))}
                            </div>
                            {erroCodigo && (
                                <p className="msg-erro-codigo">{erroCodigo}</p>
                            )}

                            <div className="criar">
                                <button type="submit" disabled={Carregando}>
                                    {Carregando ? (
                                        <span className="carregar">
                                            <Loader2 className="girar" size={20} />
                                            Validando...
                                        </span>
                                    ) : (
                                        'Confirmar código'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="btn-voltar"
                                    onClick={() => {
                                        setEtapa(1);
                                        setErroCodigo('');
                                    }}
                                >
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