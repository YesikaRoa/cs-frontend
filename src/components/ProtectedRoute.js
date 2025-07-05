import { Navigate } from 'react-router-dom'
import { getUserInfoFromToken } from '../utils/auth'

const ProtectedRoute = ({ children, roles }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null
  const { rol_name: userRole } = getUserInfoFromToken()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/403" />
  }

  return children
}

export default ProtectedRoute
