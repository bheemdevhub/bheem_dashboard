/**
 * HTTP Client service for making API requests
 */

import axios from 'axios'
import { authManager } from '../../../utils/auth.js'
import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS } from './apiConfig.js'

class HttpClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS
    })

    // Request interceptor to add auth headers
    this.client.interceptors.request.use(
      (config) => {
        const authHeaders = authManager.getAuthHeaders()
        config.headers = { ...config.headers, ...authHeaders }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(this.handleError(error))
      }
    )
  }

  /**
   * Handle API errors
   * @param {object} error - Axios error object
   * @returns {object} Formatted error object
   */
  handleError(error) {
    if (!error.response) {
      // Network error
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
        data: null
      }
    }

    const { status, data } = error.response

    let message = ERROR_MESSAGES.UNKNOWN_ERROR

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        message = ERROR_MESSAGES.UNAUTHORIZED
        // Optionally logout user on 401
        // authManager.logout()
        break
      case HTTP_STATUS.FORBIDDEN:
        message = ERROR_MESSAGES.FORBIDDEN
        break
      case HTTP_STATUS.NOT_FOUND:
        message = ERROR_MESSAGES.NOT_FOUND
        break
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        message = ERROR_MESSAGES.SERVER_ERROR
        break
      default:
        message = data?.message || data?.error || ERROR_MESSAGES.UNKNOWN_ERROR
    }

    return {
      message,
      status,
      data: data || null
    }
  }

  /**
   * Make a GET request
   * @param {string} url - The endpoint URL
   * @param {object} config - Additional axios config
   * @returns {Promise} Axios response promise
   */
  async get(url, config = {}) {
    const response = await this.client.get(url, config)
    return response.data
  }

  /**
   * Make a POST request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Additional axios config
   * @returns {Promise} Axios response promise
   */
  async post(url, data = {}, config = {}) {
    const response = await this.client.post(url, data, config)
    return response.data
  }

  /**
   * Make a PUT request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Additional axios config
   * @returns {Promise} Axios response promise
   */
  async put(url, data = {}, config = {}) {
    const response = await this.client.put(url, data, config)
    return response.data
  }

  /**
   * Make a DELETE request
   * @param {string} url - The endpoint URL
   * @param {object} config - Additional axios config
   * @returns {Promise} Axios response promise
   */
  async delete(url, config = {}) {
    const response = await this.client.delete(url, config)
    return response.data
  }

  /**
   * Make a PATCH request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Additional axios config
   * @returns {Promise} Axios response promise
   */
  async patch(url, data = {}, config = {}) {
    const response = await this.client.patch(url, data, config)
    return response.data
  }
}

// Create and export a singleton instance
export const httpClient = new HttpClient()

// Export as default for convenience
export default httpClient
