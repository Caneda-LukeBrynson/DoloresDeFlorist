import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'

export default function DashShell({ tabs, badge = {} }) {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <div className="dash">
      <nav className="side" aria-label="Dashboard">
        <img src="/logo.jpg" alt="Dolores de Florist" />
        <small className="who">{user.name}</small>
        {tabs.map(([k, label]) => (
          <NavLink key={k} to={k} className={({ isActive }) => (isActive ? 'on' : '')}>
            {label}{badge[k] > 0 && <span className="n">{badge[k]}</span>}
          </NavLink>
        ))}
        <Link to="/">View shop</Link>
        <button className="pill" onClick={() => { logout(); nav('/') }}>Log out</button>
      </nav>
      <main className="main"><Outlet /></main>
    </div>
  )
}