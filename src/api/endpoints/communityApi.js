import axiosClient from '../axiosClient'

const communityApi = {
  getAllCommunityInfo: () => axiosClient.get('/community_information'),
  getCommunityInfoById: (id) => axiosClient.get(`/community_information/${id}`),
  createCommunityInfo: (data) => axiosClient.post('/community_information', data),
  updateCommunityInfo: (id, data) => axiosClient.put(`/community_information/${id}`, data),
  deleteCommunityInfo: (id) => axiosClient.delete(`/community_information/${id}`),
}

export default communityApi
