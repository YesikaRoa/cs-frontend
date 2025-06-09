import axiosClient from '../axiosClient'

const dashboardApi = {
  getDashboardData: () => axiosClient.get('/dashboard'),
}

export default dashboardApi 