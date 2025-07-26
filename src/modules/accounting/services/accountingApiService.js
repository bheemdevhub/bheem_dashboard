// Accounting API Service

import { getAuthHeaders } from '../../../config/api'

const BASE_URL = 'https://erpbackend.bheem.cloud'

export class AccountingApiService {
  // Test connectivity method
  static async testConnection() {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/health/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return {
        success: true,
        data: await response.json()
      }
    } catch (error) {
      console.error('Error testing connection:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Company endpoints
  static async getCompanies() {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/companies/companies/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          errorMessage = errorText || errorMessage
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data,
        error: null
      }
    } catch (error) {
      console.error('Error fetching companies:', error)
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && error.detail) {
        errorMessage = error.detail
      } else if (error && error.message) {
        errorMessage = error.message
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error)
      }
      
      return {
        success: false,
        data: null,
        error: errorMessage
      }
    }
  }

  static async getCompanyById(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/companies/companies/${id}/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          errorMessage = errorText || errorMessage
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data,
        error: null
      }
    } catch (error) {
      console.error('Error fetching company:', error)
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && error.detail) {
        errorMessage = error.detail
      } else if (error && error.message) {
        errorMessage = error.message
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error)
      }
      
      return {
        success: false,
        data: null,
        error: errorMessage
      }
    }
  }

  static async createCompany(companyData) {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/companies/companies/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(companyData)
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          errorMessage = errorText || errorMessage
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data,
        error: null
      }
    } catch (error) {
      console.error('Error creating company:', error)
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && error.detail) {
        errorMessage = error.detail
      } else if (error && error.message) {
        errorMessage = error.message
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error)
      }
      
      return {
        success: false,
        data: null,
        error: errorMessage
      }
    }
  }

  static async updateCompany(id, companyData) {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/companies/companies/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(companyData)
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          errorMessage = errorText || errorMessage
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data,
        error: null
      }
    } catch (error) {
      console.error('Error updating company:', error)
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && error.detail) {
        errorMessage = error.detail
      } else if (error && error.message) {
        errorMessage = error.message
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error)
      }
      
      return {
        success: false,
        data: null,
        error: errorMessage
      }
    }
  }

  static async deleteCompany(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/companies/companies/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          errorMessage = errorText || errorMessage
        }
        
        throw new Error(errorMessage)
      }
      
      return {
        success: true,
        data: null,
        error: null
      }
    } catch (error) {
      console.error('Error deleting company:', error)
      
      // Better error message handling
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && error.detail) {
        errorMessage = error.detail
      } else if (error && error.message) {
        errorMessage = error.message
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error)
      }
      
      return {
        success: false,
        data: null,
        error: errorMessage
      }
    }
  }

  // Placeholder methods for future modules
  static async getFiscalYears() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getFiscalYearPeriods() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getJournalEntries() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getCurrencies() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getBudgets() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getAccounts() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getCategories() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getTypes() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }

  static async getJournals() {
    // TODO: Implement when API is ready
    return {
      success: false,
      error: 'Not implemented yet'
    }
  }
}

export default AccountingApiService
