import axiosClient from '../axiosClient'

const authApi = {
  login: async (credentials) => {
    const { data } = await axiosClient.post('/auth/login', credentials)
    const token = data.data.token
    localStorage.setItem('authToken', token)
    localStorage.setItem('userInfo', JSON.stringify(data.data))
  },
  recoverPassword: async (email) => {
    const { data } = await axiosClient.post('/auth/recover-password', { email })
    return data
  },
}

export default authApi
