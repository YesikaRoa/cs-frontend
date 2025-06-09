import axiosClient from '../axiosClient'

const profileApi = {
  getProfile: () => axiosClient.get('/profile'),
  editProfile: (data) => axiosClient.put('/profile', data),
}

export default profileApi
