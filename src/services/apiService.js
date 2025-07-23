import axios from 'axios'
import { getAuthToken, removeAuthToken } from '@/utils/auth'

// Create axios instance
const apiService = axios.create({
  baseURL: 'https://erpbackend.bheem.cloud', // Your API base URL
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor to add auth token
apiService.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
apiService.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeAuthToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiService
