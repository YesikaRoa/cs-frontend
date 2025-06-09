import axiosClient from '../axiosClient'

const testimonialApi = {
  getAllTestimonials: () => axiosClient.get('/testimonies'),
  getTestimonialsByCommunity: (communityId) =>
    axiosClient.get(`/testimonies/community/${communityId}`),
  createTestimonial: (data) => axiosClient.post('/testimonies', data),
  updateTestimonial: (id, data) => axiosClient.put(`/testimonies/${id}`, data),
  deleteTestimonial: (id) => axiosClient.delete(`/testimonies/${id}`),
}

export default testimonialApi
