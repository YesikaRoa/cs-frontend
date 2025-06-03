import axiosClient from '../axiosClient'

const postApi = {
  getPosts: () => axiosClient.get('/posts'),
  getPostById: (id) => axiosClient.get(`/posts/${id}`),
  createPost: (data) => axiosClient.post('/posts', data),
  updatePost: (id, data) => axiosClient.put(`/posts/${id}`, data),
  deletePost: (id) => axiosClient.delete(`/posts/${id}`),
}

export default postApi