// API Configuration
export const API_BASE_URL = 'https://erpbackend.bheem.cloud'

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    verify: '/api/auth/verify'
  },
  companies: {
    create: '/api/accounting/companies/companies/',
    list: '/api/accounting/companies/companies/',
    update: '/api/accounting/companies/companies/',
    delete: '/api/accounting/companies/companies/'
  },
  // Add more endpoints as needed
  departments: {
    list: '/api/departments/',
    create: '/api/departments/',
    update: '/api/departments/',
    delete: '/api/departments/'
  },
  permissions: {
    list: '/api/permissions/',
    create: '/api/permissions/',
    update: '/api/permissions/',
    delete: '/api/permissions/'
  }
}

// API Helper Functions
export const getAuthHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  if (includeAuth) {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token')
    const tokenType = localStorage.getItem('token_type') || 'Bearer'
    
    if (token) {
      // Ensure proper Bearer token format
      const authValue = tokenType.toLowerCase() === 'bearer' 
        ? `Bearer ${token}` 
        : `${tokenType} ${token}`
      headers['Authorization'] = authValue
      console.log('Auth header added:', `${authValue.substring(0, 20)}...`)
    } else {
      console.warn('No authentication token found in localStorage')
    }
  } else {
    console.log('No auth header required for this request')
  }
  
  return headers
}

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: getAuthHeaders(options.includeAuth !== false), // Default to true unless explicitly false
    ...options
  }

  console.log('API Request:', {
    url,
    method: config.method || 'GET',
    headers: config.headers,
    body: config.body ? JSON.parse(config.body) : null
  })

  try {
    const response = await fetch(url, config)
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: data
    })

    if (!response.ok) {
      // Handle different error response formats
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      
      if (typeof data === 'object' && data !== null) {
        // Handle validation errors (common in Django REST framework)
        if (data.detail) {
          errorMessage = String(data.detail)
        } else if (data.message) {
          errorMessage = String(data.message)
        } else if (data.error) {
          errorMessage = String(data.error)
        } else if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
          errorMessage = data.non_field_errors.map(err => String(err)).join(', ')
        } else {
          // Handle field-specific validation errors
          const errorFields = Object.keys(data)
          if (errorFields.length > 0) {
            const fieldErrors = errorFields.map(field => {
              const fieldError = Array.isArray(data[field]) 
                ? data[field].map(err => String(err)).join(', ') 
                : String(data[field])
              return `${field}: ${fieldError}`
            }).join('; ')
            errorMessage = `Validation errors: ${fieldErrors}`
          } else {
            // Fallback for unknown object structures
            try {
              errorMessage = JSON.stringify(data, null, 2)
            } catch (e) {
              errorMessage = `API Error ${response.status}: Unable to parse error response`
            }
          }
        }
      } else if (typeof data === 'string') {
        errorMessage = data
      }
      
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url: url,
        data: data,
        errorMessage: errorMessage
      })
      
      throw new Error(errorMessage)
    }

    return { success: true, data }
  } catch (error) {
    console.error('API Request Error:', error)
    
    // Handle network errors properly
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { success: false, error: 'Network error: Unable to connect to server' }
    }
    
    // Ensure we return a proper error message string
    let errorMessage = 'Network error or server unavailable'
    
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    } else if (typeof error === 'object' && error !== null) {
      try {
        errorMessage = JSON.stringify(error, null, 2)
      } catch (e) {
        errorMessage = 'Unknown error occurred'
      }
    }
    
    console.error('Final error message:', errorMessage)
    
    return { success: false, error: errorMessage }
  }
}

// Specific API methods
export const companyAPI = {
  create: async (companyData) => {
    console.log('CompanyAPI.create called with:', companyData)
    
    // Remove null, undefined, and empty string fields
    const payload = Object.fromEntries(
      Object.entries(companyData).filter(([, v]) => v !== null && v !== undefined && v !== '')
    )
    
    console.log('Filtered payload:', payload)
    console.log('Creating company without authentication (as per requirements)')
    
    // Company creation does NOT require authentication token
    const result = await apiRequest(API_ENDPOINTS.companies.create, {
      method: 'POST',
      body: JSON.stringify(payload),
      includeAuth: false // Explicitly disable authentication for company creation
    })
    
    console.log('Company API result:', result)
    return result
  },
  
  list: async () => {
    console.log('Listing companies with authentication token')
    // Company listing REQUIRES authentication token
    return await apiRequest(API_ENDPOINTS.companies.list, {
      method: 'GET',
      includeAuth: true // Explicitly enable authentication for company listing
    })
  },
  
  update: async (id, companyData) => {
    // Remove null, undefined, and empty string fields for updates too
    const payload = Object.fromEntries(
      Object.entries(companyData).filter(([, v]) => v !== null && v !== undefined && v !== '')
    )
    
    return await apiRequest(`${API_ENDPOINTS.companies.update}${id}/`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      includeAuth: true // Updates require authentication
    })
  },
  
  delete: async (id) => {
    return await apiRequest(`${API_ENDPOINTS.companies.delete}${id}/`, {
      method: 'DELETE',
      includeAuth: true // Deletes require authentication
    })
  }
}

// Token validation helper
export const isTokenValid = () => {
  const token = localStorage.getItem('auth_token')
  if (!token) return false
  
  try {
    // Basic token validation - you might want to add expiry check
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    
    return payload.exp > currentTime
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

// Handle API errors globally
export const handleAPIError = (error, toast) => {
  console.error('API Error:', error)
  
  if (error.includes('401') || error.includes('Unauthorized')) {
    toast.error('Session expired. Please login again.', {
      timeout: 5000,
      icon: '🔒'
    })
    // Redirect to login
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  } else if (error.includes('403') || error.includes('Forbidden')) {
    toast.error('You do not have permission to perform this action.', {
      timeout: 5000,
      icon: '🚫'
    })
  } else if (error.includes('422') || error.includes('Validation')) {
    toast.error('Please check your input data and try again.', {
      timeout: 5000,
      icon: '⚠️'
    })
  } else if (error.includes('500') || error.includes('Internal Server')) {
    toast.error('Server error. Please try again later.', {
      timeout: 5000,
      icon: '🔧'
    })
  } else {
    toast.error(error || 'An unexpected error occurred.', {
      timeout: 5000,
      icon: '❌'
    })
  }
}
