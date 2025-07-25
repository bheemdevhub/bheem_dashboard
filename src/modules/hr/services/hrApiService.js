// HR API Service
import { getAuthHeaders } from '@/config/api'

const BASE_URL = 'https://erpbackend.bheem.cloud'

export class HRApiService {
  // Test connectivity method
  static async testConnection() {
    try {
      console.log('Testing connection to:', BASE_URL)
      const response = await fetch(`${BASE_URL}/api/hr/employees/`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      console.log('Test connection response status:', response.status)
      console.log('Test connection response ok:', response.ok)
      
      return {
        success: response.ok,
        status: response.status,
        statusText: response.statusText
      }
    } catch (error) {
      console.error('Connection test failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

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
      console.error('Error creating job requisition:', error)
      return {
        success: false,
        data: null,
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

  // Candidates endpoints
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
        data: { items: [], total_count: 0 }
      }
    }
  }

  static async getCandidateById(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/candidates/${id}`, {
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
      console.error('Error fetching candidate:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async createCandidate(candidateData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/candidates/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(candidateData)
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
      console.error('Error creating candidate:', error)
      return {
        success: false,
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  static async updateCandidate(id, candidateData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/candidates/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(candidateData)
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
      console.error('Error updating candidate:', error)
      
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

  static async deleteCandidate(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/candidates/${id}`, {
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
      console.error('Error deleting candidate:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Interviews endpoints
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
        data: []
      }
    }
  }

  static async getInterviewById(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/interviews/${id}`, {
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
      console.error('Error fetching interview:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async createInterview(interviewData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/interviews/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(interviewData)
      })
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = await response.json()
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (typeof errorData === 'object') {
            errorMessage = JSON.stringify(errorData)
          }
        } catch (parseError) {
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
      console.error('Error creating interview:', error)
      return {
        success: false,
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  static async updateInterview(id, interviewData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/interviews/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(interviewData)
      })
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = await response.json()
          if (errorData.detail) {
            errorMessage = errorData.detail
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (typeof errorData === 'object') {
            errorMessage = JSON.stringify(errorData)
          }
        } catch (parseError) {
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
      console.error('Error updating interview:', error)
      
      let errorMessage = 'Unknown error occurred'
      
      if (error && typeof error.message === 'string') {
        errorMessage = error.message
      } else if (error && typeof error === 'string') {
        errorMessage = error
      } else if (error && typeof error === 'object') {
        try {
          errorMessage = JSON.stringify(error)
        } catch (e) {
          errorMessage = 'Complex error occurred'
        }
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  static async deleteInterview(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/interviews/${id}`, {
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
      console.error('Error deleting interview:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Offers endpoints
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
        error: error.message
      }
    }
  }

  static async getOfferById(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/offers/${id}`, {
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
      console.error('Error fetching offer:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async createOffer(offerData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/offers/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(offerData)
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
      console.error('Error creating offer:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async updateOffer(id, offerData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/offers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(offerData)
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
      console.error('Error updating offer:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async deleteOffer(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/offers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return {
        success: true
      }
    } catch (error) {
      console.error('Error deleting offer:', error)
      return {
        success: false,
        error: error.message
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

  // Attendance endpoints
  static async getEmployeeAttendance(employeeId) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/attendance/by-employee/${employeeId}`, {
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
      console.error('Error fetching employee attendance:', error)
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  }

  static async createAttendanceRecord(attendanceData) {
    try {
      const url = `${BASE_URL}/api/hr/attendance/attendance/`
      console.log('Creating attendance record at URL:', url)
      console.log('Attendance data:', attendanceData)
      console.log('Headers:', getAuthHeaders())
      
      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(attendanceData)
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.log('Error response text:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error creating attendance record:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      return {
        success: false,
        error: error.message || 'Failed to create attendance record'
      }
    }
  }

  static async updateAttendanceRecord(attendanceId, attendanceData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/${attendanceId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(attendanceData)
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
      console.error('Error updating attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async deleteAttendanceRecord(attendanceId) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/${attendanceId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return {
        success: true,
        message: 'Attendance record deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}
