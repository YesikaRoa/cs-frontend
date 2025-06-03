import axiosClient from '../axiosClient'

const communityApi = {
  getAllCommunityInfo: () => axiosClient.get('/communityInfo'),
  getCommunityInfoById: (id) => axiosClient.get(`/communityInfo/${id}`),
  createCommunityInfo: (data) => axiosClient.post('/communityInfo', data),
  updateCommunityInfo: (id, data) => axiosClient.put(`/communityInfo/${id}`, data),
  deleteCommunityInfo: (id) => axiosClient.delete(`/communityInfo/${id}`),

  getAllTestimonials: () => axiosClient.get('/testimonies'),
  getTestimonialsByCommunity: (communityId) => axiosClient.get(`/testimonies/community/${communityId}`),
  createTestimonial: (data) => axiosClient.post('/testimonies', data),
  updateTestimonial: (id, data) => axiosClient.put(`/testimonies/${id}`, data),
  deleteTestimonial: (id) => axiosClient.delete(`/testimonies/${id}`),
}

export default communityApi