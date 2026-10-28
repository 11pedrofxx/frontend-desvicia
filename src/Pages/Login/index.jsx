import { useState, useEffect} from 'react';
import './index.scss';
import { LockKeyhole, Mail, Eye, EyeOff, Loader2} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../service/api';
import { Link } from 'react-router-dom';
import ElementoTelaLogin from '../../components/CompTelaLogin';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const [Lembrar, setLembrar] = useState(false);

    const [mostraSenha, setmostraSenha] = useState(false)

    const [Carregando, setCarregando] = useState(false);
 
    useEffect(() => {
    const emailSalvo = localStorage.getItem('emailLembrado');
    if (emailSalvo) {
        setEmail(emailSalvo);
        setLembrar(true);
    }
    }, []);

    async function fazerLogin(e) {
        e.preventDefault();

        if (!captchaToken) {
            toast.error('Por favor, confirme a verificação do reCAPTCHA.');
            return;
        }

        try {
    setCarregando(true);
    const resposta = await api.post('/login', {
        email,
        senha,
        captchaToken
    });

    const { token, usuario } = resposta.data;
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    if (Lembrar) {
        localStorage.setItem('emailLembrado', email);
    } else {
        localStorage.removeItem('emailLembrado');
    }
    
    navigate('/app');

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

        const emailGoogle = resposta.data.usuario?.email || resposta.data.usuario?.ds_email;
        if (Lembrar && emailGoogle) {
            localStorage.setItem('emailLembrado', emailGoogle);
        } else {
            localStorage.removeItem('emailLembrado');
        }

        navigate('/App');

    } catch (error) {

    } finally {
        setCarregando(false);
    }
}

    return (
        <div className='pagina-login pagina'>
            <ElementoTelaLogin />

            <section className='secao'>
                <h1>Que bom ter você aqui</h1>
                <h2>Entre para continuar acompanhando seus hábitos e celebrar cada avanço.</h2>

                <form onSubmit={fazerLogin}>
                    <div className='inputs'>
                        <Mail />
                        <label htmlFor="email">Informe seu email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder='seuemail@dominio.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <LockKeyhole className='icon-cadeado' />
                        <label htmlFor="senha">Digite sua senha</label>
                        <input
                            id="senha"
                            type={mostraSenha ? 'text' : 'password'}
                            placeholder='••••••••'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        <button type='button'
                            className='olhinho'
                            onClick={() => setmostraSenha(!mostraSenha)}>
                            {mostraSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className='captcha-box'>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>

                    <div className='criar'>
                        <input type="checkbox"
                        id="lembrar"
                        checked={Lembrar}
                        onChange={(e) => setLembrar(e.target.checked)}
                        />
                        <label htmlFor="lembrar">Lembrar de mim</label>

                        <Link to="/esqueci-senha" className="link-esqueci-senha">
                            Esqueci minha senha
                        </Link  >

                        <button type="submit" disabled={Carregando}>
                            
                            {Carregando ? (
                                <span className="carregar">
                                    <Loader2 className="girar" size={20} />
                                    Entrando...
                                </span>
                            ) : (
                                'Entrar'
                            )}
                        </button>

                        <div className='divisoria'>
                            <span>OU</span>
                        </div>

                        <div className="google-box">
                            <GoogleLogin
                                onSuccess={LoginGoogle}
                                onError={() => toast.error('Falha ao conectar com os serviços do Google.')}
                            />
                        </div>

                        <h3>
                            Ainda não tem uma conta?
                            <Link to="/cadastro">Criar conta</Link>
                        </h3>
                    </div>
                </form>
            </section>
        </div>
    );
}