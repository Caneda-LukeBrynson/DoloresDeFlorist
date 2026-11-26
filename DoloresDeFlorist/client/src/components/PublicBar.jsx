import { Link } from 'react-router-dom'
import { useAuth, homeFor } from '../auth'

export default function PublicBar() {
  const { user } = useAuth()
  return (
    <header className="nav">
      <Link to="/" className="brand" aria-label="Dolores de Florist home"><img src="/logo.jpg" alt="Dolores de Florist" /></Link>
      <nav aria-label="Main">
        <Link to="/">Home</Link>
        <Link to="/track">Track order</Link>
        {user ? <Link to={homeFor(user)}>My dashboard</Link> : <Link to="/login">Log in</Link>}
      </nav>
      <span />
    </header>
  )
}