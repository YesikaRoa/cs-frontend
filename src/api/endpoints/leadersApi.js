import axiosClient from '../axiosClient'

const leadersApi = {
  getLeaders: () => axiosClient.get('/users/leaders'),
  getLeaderById: (id) => axiosClient.get(`/users/leaders/${id}`),
}

export default leadersApi
