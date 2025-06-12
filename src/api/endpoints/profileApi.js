import axiosClient from '../axiosClient'

const profileApi = {
  getProfile: () => axiosClient.get('/profile'),
  editProfile: (data) => axiosClient.put('/profile', data),
  changePassword: (data) => axiosClient.put('/profile/change_password', data),
}

export default profileApi
