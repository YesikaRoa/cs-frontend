import axiosClient from '../axiosClient'

const communityApi = {
  getAllCommunities: () => axiosClient.get('/communities'),
  getAllCommunityInfo: () => axiosClient.get('/community_information'),
  getCommunityInfoById: (id) => axiosClient.get(`/community_information/${id}`),
  updateCommunityInfo: (id, data) => axiosClient.put(`/community_information/${id}`, data),
}

export default communityApi
