import { Navigate, useLocation } from 'react-router-dom'
import { useAuth, homeFor } from '../auth'

export default function RequireRole({ role, children }) {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />
  if (user.role !== role) return <Navigate to={homeFor(user)} replace />
  return children
}

//random comment
