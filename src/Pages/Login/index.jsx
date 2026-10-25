import { useState } from 'react';
import './index.scss';
import { LockKeyhole, Mail, Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../service/api';
import { Link } from 'react-router-dom';
import ElementoTelaLogin from '../../components/CompTelaLogin';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const [mostraSenha, setmostraSenha] = useState(false)

    async function fazerLogin(e) {
        e.preventDefault();

        if (!captchaToken) {
            alert('Por favor, confirme a verificação do reCAPTCHA.');
            return;
        }

        try {
            const resposta = await api.post('/login', {
                email,
                senha,
                captchaToken
            });

            const { token, usuario } = resposta.data;
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));

            console.log('Login bem-sucedido!', resposta.data.mensagem);

        } catch (error) {
            console.error('Erro no login:', error.response?.data?.erro || error.message);
            alert(error.response?.data?.erro || 'Erro ao realizar login.');
        }
    }

    async function LoginGoogle(credencial) {
        try {
            const resposta = await api.post('/login/google', {
                googleToken: credencial.credential
            });

            localStorage.setItem('token', resposta.data.token);
            localStorage.setItem('user', JSON.stringify(resposta.data.usuario));

            alert(resposta.data.mensagem);
            navigate('/app');

        } catch (error) {
            const msgErro = error.response?.data?.erro || 'Erro ao realizar login com o Google.';
            alert(msgErro);
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
                        <input type="checkbox" id="lembrar" />
                        <label htmlFor="lembrar">Lembrar de mim</label>

                        <p>Esqueci minha senha</p>
                        <button type="submit">Entrar</button>

                        <div className='divisoria'>
                            <span>OU</span>
                        </div>

                        <div className="google-box">
                            <GoogleLogin
                                onSuccess={LoginGoogle}
                                onError={() => alert('Falha ao conectar com os serviços do Google.')}
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