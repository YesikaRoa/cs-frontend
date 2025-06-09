import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://cs-backend-35kl.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token automáticamente
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor de respuesta para manejar cualquier 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axiosClient
