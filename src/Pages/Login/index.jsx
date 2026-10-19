import './index.scss'
import { LockKeyhole } from 'lucide-react';

export default function Login () {
    
    return(
        <div className='pagina-login pagina'>
            <div>
                <h1>Pequenos passos criam grandes mudanças.</h1>
                <h2>Reconheça seus hábitos, acompanhe sua evolução e construa uma relação mais equilibrada com o que faz parte da sua rotina — sem culpa e sem julgamentos.</h2>
                <img src="/assets/images/imagemTelaLogin.webp" alt="Tela de Login" />
            </div>

            <section>
                <h1>Que bom ter você aqui</h1>
                <h2>Entre para continuar acompanhando seus hábitos e celebrar cada avanço.</h2>

                <div className='inputs'>
                    <i class="fa-regular fa-envelope"></i>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='seuemail@dominio.com' />

                    <LockKeyhole className='icon-cadeado'/>
                    <label htmlFor="">Senha</label>
                    <input type="text" placeholder='digite sua senha' />
                </div>

                <div>
                    <input type="checkbox" />
                    <label htmlFor="">Lembrar de mim</label>

                    <p>Esqueci minha senha</p>
                    <button> Entrar</button>

                    <h3>Ainda não tem uma conta? Criar conta</h3>
                </div>
            </section>
        </div>
    )
}