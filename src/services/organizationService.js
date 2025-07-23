import apiService from '@/services/apiService'

export class OrganizationService {
  
  // Get all companies
  static async getCompanies() {
    try {
      const response = await apiService.get('/api/accounting/companies/companies/')
      return response.data || response
    } catch (error) {
      console.warn('API failed, using mock data:', error.message)
      // Mock data for testing
      return [
        {
          id: 1,
          company_code: 'ABC001',
          name: 'ABC Holdings Ltd',
          company_name: 'ABC Holdings Ltd',
          legal_name: 'ABC Holdings Limited',
          company_type: 'HOLDING',
          parent_company_id: null,
          is_active: true,
          address: '123 Business Street, City',
          tax_id: 'TAX123456',
          registration_number: 'REG789012'
        },
        {
          id: 2,
          company_code: 'XYZ001',
          name: 'XYZ Corporation',
          company_name: 'XYZ Corporation',
          legal_name: 'XYZ Corporation Inc',
          company_type: 'SUBSIDIARY',
          parent_company_id: 1,
          is_active: true,
          address: '456 Corporate Ave, City',
          tax_id: 'TAX654321',
          registration_number: 'REG210987'
        }
      ]
    }
  }

  // Get profit centers for a company
  static async getProfitCenters(companyId) {
    try {
      const response = await apiService.get(`/api/accounting/companies/companies/${companyId}/profit-centers`)
      return response.data || response
    } catch (error) {
      console.warn('API failed, using mock data:', error.message)
      // Mock data for testing
      const mockData = [
        {
          id: 1,
          company_id: 1,
          profit_center_code: 'PC001',
          profit_center_name: 'Operations Division',
          name: 'Operations Division',
          center_type: 'DIVISION',
          parent_profit_center_id: null,
          is_active: true
        },
        {
          id: 2,
          company_id: 1,
          profit_center_code: 'PC002',
          profit_center_name: 'Sales & Marketing',
          name: 'Sales & Marketing',
          center_type: 'DIVISION',
          parent_profit_center_id: null,
          is_active: true
        },
        {
          id: 3,
          company_id: 2,
          profit_center_code: 'PC003',
          profit_center_name: 'Technology',
          name: 'Technology',
          center_type: 'DIVISION',
          parent_profit_center_id: null,
          is_active: true
        }
      ]
      return mockData.filter(pc => pc.company_id === parseInt(companyId))
    }
  }

  // Get cost centers for a company
  static async getCostCenters(companyId) {
    try {
      const response = await apiService.get(`/api/accounting/companies/companies/${companyId}/cost-centers`)
      return response.data || response
    } catch (error) {
      console.warn('API failed, using mock data:', error.message)
      // Mock data for testing
      const mockData = [
        {
          id: 1,
          company_id: 1,
          profit_center_id: 1,
          cost_center_code: 'CC001',
          cost_center_name: 'Manufacturing',
          name: 'Manufacturing',
          center_type: 'PRODUCTION',
          parent_cost_center_id: null,
          is_active: true
        },
        {
          id: 2,
          company_id: 1,
          profit_center_id: 1,
          cost_center_code: 'CC002',
          cost_center_name: 'Quality Assurance',
          name: 'Quality Assurance',
          center_type: 'SUPPORT',
          parent_cost_center_id: null,
          is_active: true
        },
        {
          id: 3,
          company_id: 1,
          profit_center_id: 2,
          cost_center_code: 'CC003',
          cost_center_name: 'Digital Marketing',
          name: 'Digital Marketing',
          center_type: 'REVENUE',
          parent_cost_center_id: null,
          is_active: true
        },
        {
          id: 4,
          company_id: 2,
          profit_center_id: 3,
          cost_center_code: 'CC004',
          cost_center_name: 'Software Development',
          name: 'Software Development',
          center_type: 'DEVELOPMENT',
          parent_cost_center_id: null,
          is_active: true
        }
      ]
      return mockData.filter(cc => cc.company_id === parseInt(companyId))
    }
  }

  // Create profit center
  static async createProfitCenter(companyId, data) {
    const response = await apiService.post(`/api/accounting/companies/companies/${companyId}/profit-centers`, data)
    return response.data
  }

  // Update profit center
  static async updateProfitCenter(profitCenterId, data) {
    const response = await apiService.put(`/api/accounting/companies/companies/profit-centers/${profitCenterId}`, data)
    return response.data
  }

  // Delete profit center
  static async deleteProfitCenter(profitCenterId) {
    const response = await apiService.delete(`/api/accounting/companies/companies/profit-centers/${profitCenterId}`)
    return response.data
  }

  // Create cost center
  static async createCostCenter(companyId, data) {
    const response = await apiService.post(`/api/accounting/companies/companies/${companyId}/cost-centers`, data)
    return response.data
  }

  // Update cost center
  static async updateCostCenter(costCenterId, data) {
    const response = await apiService.put(`/api/accounting/companies/companies/cost-centers/${costCenterId}`, data)
    return response.data
  }

  // Delete cost center
  static async deleteCostCenter(costCenterId) {
    const response = await apiService.delete(`/api/accounting/companies/companies/cost-centers/${costCenterId}`)
    return response.data
  }

  // Update company
  static async updateCompany(companyId, data) {
    const response = await apiService.put(`/api/accounting/companies/companies/${companyId}`, data)
    return response.data
  }
}
