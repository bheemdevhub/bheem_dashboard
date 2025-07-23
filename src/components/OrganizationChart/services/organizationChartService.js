/**
 * Organization Chart API service
 * Handles all API operations for companies, profit centers, and cost centers
 */

import { httpClient } from './httpClient.js'
import { API_ENDPOINTS } from './apiConfig.js'
import { mockApi } from '../utils/sampleData.js'

// Configuration for demo mode
const USE_MOCK_DATA = true // Set to false when real API is available

class OrganizationChartService {
  // ========== COMPANY OPERATIONS ==========
  
  /**
   * Get all companies
   * @returns {Promise<Array>} List of companies
   */
  async getCompanies() {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for companies')
        return await mockApi.getCompanies()
      }
      
      const response = await httpClient.get(API_ENDPOINTS.COMPANIES.GET_ALL)
      return response.data || response
    } catch (error) {
      console.error('Error fetching companies:', error)
      // Fallback to mock data if API fails
      console.log('Falling back to mock data for companies')
      return await mockApi.getCompanies()
    }
  }

  /**
   * Get company by ID
   * @param {string|number} companyId - The company ID
   * @returns {Promise<object>} Company data
   */
  async getCompanyById(companyId) {
    try {
      const url = API_ENDPOINTS.COMPANIES.GET_BY_ID.replace(':id', companyId)
      const response = await httpClient.get(url)
      return response.data || response
    } catch (error) {
      console.error(`Error fetching company ${companyId}:`, error)
      throw error
    }
  }

  /**
   * Create a new company
   * @param {object} companyData - Company data to create
   * @returns {Promise<object>} Created company data
   */
  async createCompany(companyData) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.COMPANIES.CREATE, companyData)
      return response.data || response
    } catch (error) {
      console.error('Error creating company:', error)
      throw error
    }
  }

  /**
   * Update a company
   * @param {string|number} companyId - The company ID
   * @param {object} companyData - Updated company data
   * @returns {Promise<object>} Updated company data
   */
  async updateCompany(companyId, companyData) {
    try {
      const url = API_ENDPOINTS.COMPANIES.UPDATE.replace(':id', companyId)
      const response = await httpClient.put(url, companyData)
      return response.data || response
    } catch (error) {
      console.error(`Error updating company ${companyId}:`, error)
      throw error
    }
  }

  /**
   * Delete a company
   * @param {string|number} companyId - The company ID
   * @returns {Promise<object>} Delete confirmation
   */
  async deleteCompany(companyId) {
    try {
      const url = API_ENDPOINTS.COMPANIES.DELETE.replace(':id', companyId)
      const response = await httpClient.delete(url)
      return response.data || response
    } catch (error) {
      console.error(`Error deleting company ${companyId}:`, error)
      throw error
    }
  }

  // ========== PROFIT CENTER OPERATIONS ==========

  /**
   * Get all profit centers
   * @returns {Promise<Array>} List of profit centers
   */
  async getProfitCenters() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.PROFIT_CENTERS.GET_ALL)
      return response.data || response
    } catch (error) {
      console.error('Error fetching profit centers:', error)
      throw error
    }
  }

  /**
   * Get profit centers by company ID
   * @param {string|number} companyId - The company ID
   * @returns {Promise<Array>} List of profit centers for the company
   */
  async getProfitCentersByCompany(companyId) {
    try {
      const url = API_ENDPOINTS.PROFIT_CENTERS.GET_BY_COMPANY.replace(':companyId', companyId)
      const response = await httpClient.get(url)
      return response.data || response
    } catch (error) {
      console.error(`Error fetching profit centers for company ${companyId}:`, error)
      throw error
    }
  }

  /**
   * Get profit center by ID
   * @param {string|number} profitCenterId - The profit center ID
   * @returns {Promise<object>} Profit center data
   */
  async getProfitCenterById(profitCenterId) {
    try {
      const url = API_ENDPOINTS.PROFIT_CENTERS.GET_BY_ID.replace(':id', profitCenterId)
      const response = await httpClient.get(url)
      return response.data || response
    } catch (error) {
      console.error(`Error fetching profit center ${profitCenterId}:`, error)
      throw error
    }
  }

  /**
   * Create a new profit center
   * @param {object} profitCenterData - Profit center data to create
   * @returns {Promise<object>} Created profit center data
   */
  async createProfitCenter(profitCenterData) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.PROFIT_CENTERS.CREATE, profitCenterData)
      return response.data || response
    } catch (error) {
      console.error('Error creating profit center:', error)
      throw error
    }
  }

  /**
   * Update a profit center
   * @param {string|number} profitCenterId - The profit center ID
   * @param {object} profitCenterData - Updated profit center data
   * @returns {Promise<object>} Updated profit center data
   */
  async updateProfitCenter(profitCenterId, profitCenterData) {
    try {
      const url = API_ENDPOINTS.PROFIT_CENTERS.UPDATE.replace(':id', profitCenterId)
      const response = await httpClient.put(url, profitCenterData)
      return response.data || response
    } catch (error) {
      console.error(`Error updating profit center ${profitCenterId}:`, error)
      throw error
    }
  }

  /**
   * Delete a profit center
   * @param {string|number} profitCenterId - The profit center ID
   * @returns {Promise<object>} Delete confirmation
   */
  async deleteProfitCenter(profitCenterId) {
    try {
      const url = API_ENDPOINTS.PROFIT_CENTERS.DELETE.replace(':id', profitCenterId)
      const response = await httpClient.delete(url)
      return response.data || response
    } catch (error) {
      console.error(`Error deleting profit center ${profitCenterId}:`, error)
      throw error
    }
  }

  // ========== COST CENTER OPERATIONS ==========

  /**
   * Get all cost centers
   * @returns {Promise<Array>} List of cost centers
   */
  async getCostCenters() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.COST_CENTERS.GET_ALL)
      return response.data || response
    } catch (error) {
      console.error('Error fetching cost centers:', error)
      throw error
    }
  }

  /**
   * Get cost centers by profit center ID
   * @param {string|number} profitCenterId - The profit center ID
   * @returns {Promise<Array>} List of cost centers for the profit center
   */
  async getCostCentersByProfitCenter(profitCenterId) {
    try {
      const url = API_ENDPOINTS.COST_CENTERS.GET_BY_PROFIT_CENTER.replace(':profitCenterId', profitCenterId)
      const response = await httpClient.get(url)
      return response.data || response
    } catch (error) {
      console.error(`Error fetching cost centers for profit center ${profitCenterId}:`, error)
      throw error
    }
  }

  /**
   * Get cost center by ID
   * @param {string|number} costCenterId - The cost center ID
   * @returns {Promise<object>} Cost center data
   */
  async getCostCenterById(costCenterId) {
    try {
      const url = API_ENDPOINTS.COST_CENTERS.GET_BY_ID.replace(':id', costCenterId)
      const response = await httpClient.get(url)
      return response.data || response
    } catch (error) {
      console.error(`Error fetching cost center ${costCenterId}:`, error)
      throw error
    }
  }

  /**
   * Create a new cost center
   * @param {object} costCenterData - Cost center data to create
   * @returns {Promise<object>} Created cost center data
   */
  async createCostCenter(costCenterData) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.COST_CENTERS.CREATE, costCenterData)
      return response.data || response
    } catch (error) {
      console.error('Error creating cost center:', error)
      throw error
    }
  }

  /**
   * Update a cost center
   * @param {string|number} costCenterId - The cost center ID
   * @param {object} costCenterData - Updated cost center data
   * @returns {Promise<object>} Updated cost center data
   */
  async updateCostCenter(costCenterId, costCenterData) {
    try {
      const url = API_ENDPOINTS.COST_CENTERS.UPDATE.replace(':id', costCenterId)
      const response = await httpClient.put(url, costCenterData)
      return response.data || response
    } catch (error) {
      console.error(`Error updating cost center ${costCenterId}:`, error)
      throw error
    }
  }

  /**
   * Delete a cost center
   * @param {string|number} costCenterId - The cost center ID
   * @returns {Promise<object>} Delete confirmation
   */
  async deleteCostCenter(costCenterId) {
    try {
      const url = API_ENDPOINTS.COST_CENTERS.DELETE.replace(':id', costCenterId)
      const response = await httpClient.delete(url)
      return response.data || response
    } catch (error) {
      console.error(`Error deleting cost center ${costCenterId}:`, error)
      throw error
    }
  }

  // ========== BULK OPERATIONS ==========

  /**
   * Get complete organization chart data
   * @returns {Promise<object>} Complete organization data with companies, profit centers, and cost centers
   */
  async getOrganizationData() {
    try {
      const [companies, profitCenters, costCenters] = await Promise.all([
        this.getCompanies(),
        this.getProfitCenters(),
        this.getCostCenters()
      ])

      return {
        companies: companies || [],
        profitCenters: profitCenters || [],
        costCenters: costCenters || []
      }
    } catch (error) {
      console.error('Error fetching organization data:', error)
      throw error
    }
  }

  /**
   * Search entities across all types
   * @param {string} searchTerm - The search term
   * @param {object} options - Search options
   * @returns {Promise<object>} Search results
   */
  async searchEntities(searchTerm, options = {}) {
    try {
      const { entityTypes = ['companies', 'profitCenters', 'costCenters'] } = options
      const results = {}

      if (entityTypes.includes('companies')) {
        const companies = await this.getCompanies()
        results.companies = companies.filter(company => 
          company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.code?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (entityTypes.includes('profitCenters')) {
        const profitCenters = await this.getProfitCenters()
        results.profitCenters = profitCenters.filter(pc => 
          pc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pc.code?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (entityTypes.includes('costCenters')) {
        const costCenters = await this.getCostCenters()
        results.costCenters = costCenters.filter(cc => 
          cc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cc.code?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      return results
    } catch (error) {
      console.error('Error searching entities:', error)
      throw error
    }
  }
}

// Create and export a singleton instance
export const organizationChartService = new OrganizationChartService()

// Export as default for convenience
export default organizationChartService
