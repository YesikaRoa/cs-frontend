import axiosClient from '../axiosClient'

const authApi = {
  login: async (credentials) => {
    const { data } = await axiosClient.post('/auth/login', credentials)
    const token = data.data.token
    localStorage.setItem('authToken', token)
  },
}

export default authApi
