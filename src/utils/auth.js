import { jwtDecode } from 'jwt-decode'

export const getUserInfoFromToken = () => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) return null
    const decoded = jwtDecode(token)
    return {
      id: decoded.id || null,
      email: decoded.email || null,
      community_id: decoded.community_id || null,
      role_id: decoded.role_id || null,
      rol_name: decoded.rol_name || null,
    }
  } catch {
    return null
  }
}
