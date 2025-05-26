import { Navigate } from 'react-router-dom'
import { getUserRoleFromToken } from '../utils/auth'

const ProtectedRoute = ({ children, roles }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null
  const userRole = getUserRoleFromToken()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/404" />
  }

  return children
}

export default ProtectedRoute
