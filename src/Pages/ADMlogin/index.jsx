import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import './index.scss';
import toast from 'react-hot-toast';
import api from '../../service/api';

export default function LoginADM() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const captchaRef = useRef(null);
    const [token, setToken] = useState('');
    const [Carregando, setCarregando] = useState(false);

    async function Entrar(e) {
        e.preventDefault();

        if (!email) {
            toast.error('Você deve preencher o campo Email')
        }

        if (!senha) {
            toast.error('Você deve preencher o campo senha')
        }

        if (!token) {
            toast.error('Você deve sinalizar que não é um robô')
        }

        try {
            setCarregando(true);
            let resposta = await api.post('/acesso_adm', {
                email,
                senha,
                token
            })

            toast.success('Bem vindo ADM');
            localStorage.setItem('admToken', resposta.data.token);
            navigate('/admDesvicia')
        } catch (error) {

        } finally {
            setCarregando(false);
            setToken('');
            captchaRef.current?.reset();
        }

    }

    return (
        <div className='pagina-loginADM'>

            <section className='conteudo'>

                <form onSubmit={Entrar}>
                    <h1>Painel administrativo Desvicia</h1>
                    <div className='inputs'>
                        <label>Email</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='Digite seu email'/>

                        <label>Senha</label>
                        <input type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder='Digite sua senha'/>
                    </div>
                    <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setToken(token)}
                        onExpired={() => setToken('')}
                    />

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
                </form>

            </section>

        </div>
    );

}