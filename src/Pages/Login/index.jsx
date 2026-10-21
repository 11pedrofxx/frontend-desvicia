import { useState } from 'react';
import './index.scss';
import { LockKeyhole, Mail } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../service/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

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

    async function LoginGoogle(credentialResponse) {
        try {
            const resposta = await api.post('/login/google', {
                googleToken: credentialResponse.credential
            });

            const { token, usuario } = resposta.data;
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));

            console.log('Login com Google bem-sucedido!');
        } catch (error) {
            console.error('Erro no login Google:', error.response?.data?.erro);
            alert(error.response?.data?.erro || 'Erro ao autenticar com o Google.');
        }
    }

    return (
        <div className='pagina-login pagina'>
            <div className='info-esquerda'>
                <div className='info'>
                    <h1>Pequenos passos criam grandes mudanças.</h1>
                    <h2>Reconheça seus hábitos, acompanhe sua evolução e construa uma relação mais equilibrada com o que faz parte da sua rotina sem culpa e sem julgamentos.</h2>
                    <img src="/assets/images/imagemTelaLogin.webp" alt="Tela de Login" />
                </div>
            </div>

            <section className='secao'>
                <h1>Que bom ter você aqui</h1>
                <h2>Entre para continuar acompanhando seus hábitos e celebrar cada avanço.</h2>

                <form onSubmit={fazerLogin}>
                    <div className='inputs'>
                        <Mail />
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder='seuemail@dominio.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <LockKeyhole className='icon-cadeado'/>
                        <label htmlFor="senha">Senha</label>
                        <input 
                            id="senha"
                            type="password" 
                            placeholder='digite sua senha' 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
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
                            <span>ou</span>
                        </div>

                        <div className='google-box'>
                            <GoogleLogin 
                                onSuccess={LoginGoogle} 
                                onError={() => alert('Falha no login com Google')} 
                                shape="pill"
                                locale="pt-BR"
                            />
                        </div>

                        <h3>Ainda não tem uma conta?<span> Criar conta</span></h3>
                    </div>
                </form>
            </section>
        </div>
    );
}