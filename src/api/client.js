import { API_BASE_URL, DEFAULT_HEADERS } from './config.js'

/**
 * Get authentication headers with token from localStorage
 * @returns {Object} Headers object with authorization
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
  const tokenType = localStorage.getItem('token_type') || 'bearer'
  
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  return {
    ...DEFAULT_HEADERS,
    'Authorization': `${tokenType} ${token}`
  }
}

/**
 * Get basic headers without authentication
 * @returns {Object} Headers object
 */
export const getBasicHeaders = () => {
  return {
    ...DEFAULT_HEADERS
  }
}

/**
 * Get form data headers with authentication
 * @returns {Object} Headers object for form data
 */
export const getFormDataAuthHeaders = () => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
  const tokenType = localStorage.getItem('token_type') || 'bearer'
  
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Authorization': `${tokenType} ${token}`
  }
}

/**
 * Make authenticated API request
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
export const makeAuthenticatedRequest = async (url, options = {}) => {
  try {
    const headers = getAuthHeaders()
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    })
    
    // Handle token expiration
    if (response.status === 401) {
      // Clear stored tokens
      localStorage.removeItem('auth_token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth_user')
      localStorage.removeItem('login')
      
      // Redirect to login
      window.location.href = '/login'
      throw new Error('Session expired. Please login again.')
    }
    
    return response
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

/**
 * Make basic API request without authentication
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
export const makeBasicRequest = async (url, options = {}) => {
  try {
    const headers = getBasicHeaders()
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    })
    
    return response
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

/**
 * Handle API response and extract JSON data
 * @param {Response} response - Fetch response
 * @returns {Promise<Object>} JSON data
 */
export const handleApiResponse = async (response) => {
  const contentType = response.headers.get('content-type')
  
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.detail || data.message || data.error || `API Error: ${response.status}`)
    }
    
    return data
  } else {
    const text = await response.text()
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${text}`)
    }
    return { message: text }
  }
}
