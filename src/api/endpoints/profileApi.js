import axiosClient from '../axiosClient'

const profileApi = {
  getProfile: () => axiosClient.get('/profile'),
  editProfile: () => axiosClient.put('/profile/edit'),
}
export default profileApi;
