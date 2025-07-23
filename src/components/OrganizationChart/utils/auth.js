/**
 * Authentication utility for managing tokens and user authentication
 */

export class AuthManager {
  constructor() {
    this.tokenKey = 'auth_token'
    this.userKey = 'auth_user'
  }

  /**
   * Get the authentication token from localStorage
   * @returns {string|null} The auth token or null if not found
   */
  getToken() {
    try {
      return localStorage.getItem(this.tokenKey)
    } catch (error) {
      console.error('Error getting token from localStorage:', error)
      return null
    }
  }

  /**
   * Set the authentication token in localStorage
   * @param {string} token - The authentication token
   */
  setToken(token) {
    try {
      localStorage.setItem(this.tokenKey, token)
    } catch (error) {
      console.error('Error setting token in localStorage:', error)
    }
  }

  /**
   * Remove the authentication token from localStorage
   */
  removeToken() {
    try {
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.userKey)
    } catch (error) {
      console.error('Error removing token from localStorage:', error)
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has a valid token
   */
  isAuthenticated() {
    const token = this.getToken()
    return token !== null && token !== undefined && token.trim() !== ''
  }

  /**
   * Get user information from localStorage
   * @returns {object|null} User object or null if not found
   */
  getUser() {
    try {
      const userString = localStorage.getItem(this.userKey)
      return userString ? JSON.parse(userString) : null
    } catch (error) {
      console.error('Error getting user from localStorage:', error)
      return null
    }
  }

  /**
   * Set user information in localStorage
   * @param {object} user - The user object
   */
  setUser(user) {
    try {
      localStorage.setItem(this.userKey, JSON.stringify(user))
    } catch (error) {
      console.error('Error setting user in localStorage:', error)
    }
  }

  /**
   * Get authorization headers for API requests
   * @returns {object} Headers object with Authorization
   */
  getAuthHeaders() {
    const token = this.getToken()
    if (!token) {
      return {}
    }

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  /**
   * Clear all authentication data
   */
  logout() {
    this.removeToken()
    // You can add additional cleanup here if needed
  }
}

// Create and export a singleton instance
export const authManager = new AuthManager()

// Export as default for convenience
export default authManager
