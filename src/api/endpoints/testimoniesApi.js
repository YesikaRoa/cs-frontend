import axiosClient from '../axiosClient'

const testimoniesApi = {
  getTestimonies: () => axiosClient.get('/testimonies'),
  createTestimony: (data) => axiosClient.post('/testimonies', data),
  updateTestimony: (id, data) => axiosClient.put(`/testimonies/${id}`, data),
  deleteTestimony: (id) => axiosClient.delete(`/testimonies/${id}`),
}

export default testimoniesApi
