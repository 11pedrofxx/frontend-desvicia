import './index.scss';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="pagina-barranav">
      <div className="logo-area">
        <h2>Desvicia</h2>
      </div>

      <div className="container-botao-acao">
        <Link to="/registro-diario" className="novo-registro">
          <svg className="icone-botao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Fazer Checkin</span>
        </Link>
      </div>

      <div className="menu-links">

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'item-nav ativo' : 'item-nav')}
        >
          <svg className="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Início</span>
        </NavLink>

        <NavLink
          to="/acompanhamento"
          className={({ isActive }) => (isActive ? 'item-nav ativo' : 'item-nav')}
        >
          <svg className="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span>Acompanhamento</span>
        </NavLink>

        <NavLink
          to="/aprender"
          className={({ isActive }) => (isActive ? 'item-nav ativo' : 'item-nav')}
        >
          <svg className="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          <span>Aprender</span>
        </NavLink>

        <NavLink
          to="/apoio"
          className={({ isActive }) => (isActive ? 'item-nav ativo' : 'item-nav')}
        >
          <svg className="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span>Apoio</span>
        </NavLink>

        <NavLink
          to="/perfil"
          className={({ isActive }) => (isActive ? 'item-nav ativo' : 'item-nav')}
        >
          <svg className="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}