import './index.scss';
import ElementoTelaLogin from '../../components/CompTelaLogin/index.jsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { UserRound, Mail, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    return (
        <div className="pagina-cadastro">
            <ElementoTelaLogin />

            <div className="cadastro">
                <section>
                    <h1>Você não precisa passar por isso sozinho.</h1>
                    <h2> Cadastre-se para acessar uma rede de apoio segura, anônima e gratuita.</h2>

                    <form>
                        <div className="campo-cadastro">
                            <label htmlFor="nome">
                                Como você quer ser chamado?
                            </label>

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
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="captcha-box">
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onChange={(token) => setCaptchaToken(token)}
                            />
                        </div>

                        <div className="criar">
                            <button type="submit">
                                Criar conta
                            </button>

                            <div className="divisoria">
                                <span>ou</span>
                            </div>

                            <div className="google-box">
                                <GoogleLogin
                                    onError={() =>
                                        alert('Falha ao conectar com o Google.')
                                    }
                                />
                            </div>

                            <h3>
                                Já tem uma conta?<Link to={'/login'}>Entrar</Link>
                            </h3>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}