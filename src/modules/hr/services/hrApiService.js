// HR API Service
import { getAuthHeaders } from '@/config/api'

const BASE_URL = 'https://erpbackend.bheem.cloud'

export class HRApiService {
  // Employee endpoints
  static async getEmployees() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/employees/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async getEmployeeById(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/employees/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching employee:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async createEmployee(employeeData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/employees/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(employeeData)
      })
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = await response.json()
          if (errorData.detail && typeof errorData.detail === 'string') {
            errorMessage = errorData.detail
          } else if (errorData.message && typeof errorData.message === 'string') {
            errorMessage = errorData.message
          } else if (typeof errorData === 'string') {
            errorMessage = errorData
          } else if (errorData.error && typeof errorData.error === 'string') {
            errorMessage = errorData.error
          } else if (typeof errorData === 'object') {
            // Handle object errors by extracting meaningful information
            errorMessage = Object.keys(errorData).map(key => {
              const value = errorData[key]
              if (Array.isArray(value)) {
                return `${key}: ${value.join(', ')}`
              } else if (typeof value === 'string') {
                return `${key}: ${value}`
              } else {
                return `${key}: ${JSON.stringify(value)}`
              }
            }).join('; ') || errorMessage
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError)
          // Use the original HTTP error message if JSON parsing fails
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error creating employee:', error)
      return {
        success: false,
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  static async updateEmployee(id, employeeData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/employees/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(employeeData)
      })
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = await response.json()
          if (errorData.detail && typeof errorData.detail === 'string') {
            errorMessage = errorData.detail
          } else if (errorData.message && typeof errorData.message === 'string') {
            errorMessage = errorData.message
          } else if (typeof errorData === 'string') {
            errorMessage = errorData
          } else if (errorData.error && typeof errorData.error === 'string') {
            errorMessage = errorData.error
          } else if (typeof errorData === 'object') {
            // Handle object errors by extracting meaningful information
            errorMessage = Object.keys(errorData).map(key => {
              const value = errorData[key]
              if (Array.isArray(value)) {
                return `${key}: ${value.join(', ')}`
              } else if (typeof value === 'string') {
                return `${key}: ${value}`
              } else {
                return `${key}: ${JSON.stringify(value)}`
              }
            }).join('; ') || errorMessage
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError)
          // Use the original HTTP error message if JSON parsing fails
        }
        
        return {
          success: false,
          error: errorMessage
        }
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error updating employee:', error)
      
      // Enhanced error message handling
      let errorMessage = 'Unknown error occurred'
      
      if (error && typeof error.message === 'string') {
        errorMessage = error.message
      } else if (error && typeof error === 'string') {
        errorMessage = error
      } else if (error && typeof error === 'object') {
        try {
          // Try to extract meaningful information from error object
          if (error.detail) {
            errorMessage = typeof error.detail === 'string' ? error.detail : JSON.stringify(error.detail)
          } else if (error.message) {
            errorMessage = error.message
          } else {
            errorMessage = JSON.stringify(error)
          }
        } catch (stringifyError) {
          errorMessage = 'Complex error object - check console for details'
          console.error('Error stringifying error object:', stringifyError)
        }
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  static async deleteEmployee(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/employees/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return {
        success: true,
        data: null
      }
    } catch (error) {
      console.error('Error deleting employee:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Lookup endpoints
  static async getLookups() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/lookups/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching lookups:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Company endpoints for dropdown
  static async getCompanies() {
    try {
      const response = await fetch(`${BASE_URL}/api/accounting/companies/companies/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching companies:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Job Requisition endpoints
  static async getJobRequisitions() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/job-requisitions/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching job requisitions:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async getJobRequisitionById(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/job-requisitions/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching job requisition:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async createJobRequisition(jobRequisitionData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/job-requisitions/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(jobRequisitionData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error creating job requisition:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async updateJobRequisition(id, jobRequisitionData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/job-requisitions/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(jobRequisitionData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error updating job requisition:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async deleteJobRequisition(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/job-requisitions/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return {
        success: true,
        data: null
      }
    } catch (error) {
      console.error('Error deleting job requisition:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Skills endpoints
  static async getSkills() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/skills/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Candidates endpoints (placeholder for future implementation)
  static async getCandidates() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/candidates/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching candidates:', error)
      return {
        success: false,
        error: error.message,
        data: { items: [], total_count: 0 } // Return empty data for now
      }
    }
  }

  // Interviews endpoints (placeholder for future implementation)
  static async getInterviews() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/interviews/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching interviews:', error)
      return {
        success: false,
        error: error.message,
        data: { items: [], total_count: 0 } // Return empty data for now
      }
    }
  }

  // Offers endpoints (placeholder for future implementation)
  static async getOffers() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/offers/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching offers:', error)
      return {
        success: false,
        error: error.message,
        data: { items: [], total_count: 0 } // Return empty data for now
      }
    }
  }

  // Onboarding Checklist endpoints (placeholder for future implementation)
  static async getOnboardingChecklists() {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/onboarding-checklists/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching onboarding checklists:', error)
      return {
        success: false,
        error: error.message,
        data: { items: [], total_count: 0 } // Return empty data for now
      }
    }
  }
}
