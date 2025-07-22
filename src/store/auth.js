import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    accessToken: null,
    tokenType: 'bearer'
  }),

  getters: {
    getUserName: (state) => {
      if (state.user?.employee?.username) {
        // Extract name from email if username is email format
        const email = state.user.employee.username
        if (email.includes('@')) {
          return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
        }
        return state.user.employee.username
      }
      return 'User'
    },
    getUserEmail: (state) => state.user?.employee?.username || '',
    getUserRole: (state) => state.user?.employee?.role || 'User',
    getUserId: (state) => state.user?.employee?.id || null,
    getCompanyId: (state) => state.user?.employee?.company_id || null,
    isActive: (state) => state.user?.employee?.is_active || false,
    getAuthHeaders: (state) => ({
      'Authorization': `${state.tokenType} ${state.accessToken}`,
      'Content-Type': 'application/json'
    })
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null
      const toast = useToast()

      try {
        // Validate input
        if (!credentials.email || !credentials.password) {
          throw new Error('Email and password are required')
        }

        // Show loading toast
        toast.info('Signing you in...', {
          timeout: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          icon: '🔄'
        })

        // Prepare form data for x-www-form-urlencoded
        const formData = new URLSearchParams()
        formData.append('username', credentials.email) // API expects 'username' field
        formData.append('password', credentials.password)

        console.log('Login attempt:', {
          endpoint: `${API_BASE_URL}${API_ENDPOINTS.auth.login}`,
          email: credentials.email
        })

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.login}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: formData.toString()
        })

        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))

        // Handle different response scenarios
        let data
        const contentType = response.headers.get('content-type')
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json()
        } else {
          const text = await response.text()
          console.log('Non-JSON response:', text)
          throw new Error(`Server returned non-JSON response: ${text}`)
        }

        console.log('Response data:', data)

        // Clear any existing loading toasts
        toast.dismiss()

        if (!response.ok) {
          // Handle specific error messages from the API
          const errorMessage = data.detail || data.message || data.error || `Login failed: ${response.status} ${response.statusText}`
          
          // Show error toast
          toast.error(errorMessage, {
            timeout: 7000,
            icon: '❌'
          })
          
          throw new Error(errorMessage)
        }

        // Validate response structure - matching React implementation
        if (!data.access_token || !data.employee) {
          console.error('Invalid response structure:', data)
          const errorMsg = 'Invalid response format from server'
          
          toast.error(errorMsg, {
            timeout: 7000,
            icon: '⚠️'
          })
          
          throw new Error(errorMsg)
        }

        // Store authentication data - matching React implementation
        this.accessToken = data.access_token
        this.tokenType = data.token_type || 'bearer'
        this.user = {
          employee: data.employee,
          // Add avatar for UI consistency
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.employee.username || 'User')}&background=667eea&color=fff&size=150`
        }
        this.isAuthenticated = true

        // Persist to localStorage - matching React implementation structure
        localStorage.setItem('login', JSON.stringify(true))
        localStorage.setItem('access_token', this.accessToken)
        localStorage.setItem('token_type', this.tokenType)
        
        // Store individual employee fields as in React implementation
        if (data.employee) {
          if (data.employee.id) {
            localStorage.setItem('user_id', data.employee.id)
          }
          if (data.employee.company_id) {
            localStorage.setItem('company_id', data.employee.company_id)
          }
          if (data.employee.username) {
            localStorage.setItem('username', data.employee.username)
          }
          if (data.employee.role) {
            localStorage.setItem('role', data.employee.role)
          }
          if (data.employee.is_active !== undefined) {
            localStorage.setItem('is_active', String(data.employee.is_active))
          }
        }

        // Also keep our existing structure for compatibility
        localStorage.setItem('auth_token', this.accessToken)
        localStorage.setItem('auth_user', JSON.stringify(this.user))

        console.log('Login successful:', {
          user: this.user.employee.username,
          role: this.user.employee.role,
          company_id: this.user.employee.company_id
        })

        // Show success toast
        toast.success(`Welcome back, ${this.getUserName}! 🎉`, {
          timeout: 5000,
          icon: '✅'
        })

        return { success: true, user: this.user }
      } catch (error) {
        console.error('Login error:', error)
        
        // Clear any loading toasts
        toast.dismiss()
        
        this.error = error.message
        this.isAuthenticated = false
        this.user = null
        this.accessToken = null
        
        // Show error toast if not already shown
        if (!error.message.includes('Server returned non-JSON response') && 
            !error.message.includes('Invalid response format')) {
          toast.error(`Authentication failed: ${error.message}`, {
            timeout: 7000,
            icon: '🚫'
          })
        }
        
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      const toast = useToast()
      
      try {
        this.user = null
        this.isAuthenticated = false
        this.error = null
        this.accessToken = null
        this.tokenType = 'bearer'
        
        // Clear localStorage
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('token_type')
        localStorage.removeItem('login')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('company_id')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        localStorage.removeItem('is_active')

        toast.success('Successfully logged out', {
          timeout: 3000,
          icon: '👋'
        })
      } catch (error) {
        console.error('Logout error:', error)
        // Still clear local data even if API call fails
        this.user = null
        this.isAuthenticated = false
        this.accessToken = null
        localStorage.clear()
      }
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('auth_user')
      const tokenType = localStorage.getItem('token_type')
      
      if (token && user) {
        try {
          this.user = JSON.parse(user)
          this.accessToken = token
          this.tokenType = tokenType || 'bearer'
          this.isAuthenticated = true

          // Optional: Verify token with server
          await this.verifyToken()
        } catch (error) {
          console.error('Error parsing stored user:', error)
          this.logout()
        }
      }
    },

    async verifyToken() {
      if (!this.accessToken) return false

      // For now, assume token is valid if it exists
      // TODO: In production, implement actual server-side token verification
      return true
    },

    async refreshToken() {
      // Implement token refresh logic if your API supports it
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Authorization': `${this.tokenType} ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          this.accessToken = data.access_token
          localStorage.setItem('auth_token', this.accessToken)
          return true
        }
        
        return false
      } catch (error) {
        console.error('Token refresh failed:', error)
        return false
      }
    },

    clearError() {
      this.error = null
    },

    // Helper method to make authenticated API calls
    async makeAuthenticatedRequest(url, options = {}) {
      if (!this.isAuthenticated) {
        throw new Error('User not authenticated')
      }

      const headers = {
        ...this.getAuthHeaders,
        ...options.headers
      }

      const response = await fetch(url, {
        ...options,
        headers
      })

      // Handle token expiration
      if (response.status === 401) {
        const refreshed = await this.refreshToken()
        if (refreshed) {
          // Retry the request with new token
          return fetch(url, {
            ...options,
            headers: {
              ...this.getAuthHeaders,
              ...options.headers
            }
          })
        } else {
          this.logout()
          throw new Error('Session expired. Please login again.')
        }
      }

      return response
    }
  }
})
