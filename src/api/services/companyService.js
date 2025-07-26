import { API_ENDPOINTS } from '../config.js'
import { makeAuthenticatedRequest, handleApiResponse } from '../client.js'

/**
 * Company API Service
 */
export class CompanyService {
  /**
   * Create a new company
   * @param {Object} companyData - Company information
   * @returns {Promise<Object>} Created company data
   */
  static async createCompany(companyData) {
    try {
      console.log('Creating company with data:', companyData)
      
      const response = await makeAuthenticatedRequest(API_ENDPOINTS.COMPANIES.CREATE, {
        method: 'POST',
        body: JSON.stringify(companyData)
      })
      
      const result = await handleApiResponse(response)
      console.log('Company creation response:', result)
      
      return result
    } catch (error) {
      console.error('Company creation error:', error)
      throw new Error(error.message || 'Failed to create company')
    }
  }

  /**
   * Get list of companies
   * @returns {Promise<Array>} List of companies
   */
  static async getCompanies() {
    try {
      const response = await makeAuthenticatedRequest(API_ENDPOINTS.COMPANIES.LIST, {
        method: 'GET'
      })
      
      return await handleApiResponse(response)
    } catch (error) {
      console.error('Get companies error:', error)
      throw new Error(error.message || 'Failed to fetch companies')
    }
  }

  /**
   * Get company by ID
   * @param {string} companyId - Company ID
   * @returns {Promise<Object>} Company data
   */
  static async getCompanyById(companyId) {
    try {
      const response = await makeAuthenticatedRequest(`${API_ENDPOINTS.COMPANIES.GET_BY_ID}${companyId}/`, {
        method: 'GET'
      })
      
      return await handleApiResponse(response)
    } catch (error) {
      console.error('Get company by ID error:', error)
      throw new Error(error.message || 'Failed to fetch company')
    }
  }

  /**
   * Update company
   * @param {string} companyId - Company ID
   * @param {Object} companyData - Updated company data
   * @returns {Promise<Object>} Updated company data
   */
  static async updateCompany(companyId, companyData) {
    try {
      const response = await makeAuthenticatedRequest(`${API_ENDPOINTS.COMPANIES.UPDATE}${companyId}/`, {
        method: 'PUT',
        body: JSON.stringify(companyData)
      })
      
      return await handleApiResponse(response)
    } catch (error) {
      console.error('Company update error:', error)
      throw new Error(error.message || 'Failed to update company')
    }
  }

  /**
   * Delete company
   * @param {string} companyId - Company ID
   * @returns {Promise<Object>} Deletion result
   */
  static async deleteCompany(companyId) {
    try {
      const response = await makeAuthenticatedRequest(`${API_ENDPOINTS.COMPANIES.DELETE}${companyId}/`, {
        method: 'DELETE'
      })
      
      return await handleApiResponse(response)
    } catch (error) {
      console.error('Company deletion error:', error)
      throw new Error(error.message || 'Failed to delete company')
    }
  }
}

export default CompanyService
