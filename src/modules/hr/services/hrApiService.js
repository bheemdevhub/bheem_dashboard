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
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
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
        error: error.message
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
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error updating employee:', error)
      return {
        success: false,
        error: error.message
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

  // Job Requisition endpoints (placeholder for future implementation)
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
        error: error.message,
        data: { items: [], total_count: 0 } // Return empty data for now
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
