import { jwtDecode } from 'jwt-decode'

export const getUserRoleFromToken = () => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) return null
    const decoded = jwtDecode(token)
    return decoded.rol_name || null
  } catch (error) {
    console.error('Error al decodificar el token:', error)
    return null
  }
}
