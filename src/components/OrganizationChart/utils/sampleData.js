/**
 * Sample data for Organization Chart demonstration
 * This simulates API responses for development/testing
 */

export const sampleCompanies = [
  {
    id: 1,
    name: 'Tech Solutions Inc.',
    code: 'TSI',
    description: 'Leading technology solutions provider',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Global Innovations Ltd.',
    code: 'GIL',
    description: 'International innovation and research company',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 3,
    name: 'Digital Enterprises Corp.',
    code: 'DEC',
    description: 'Digital transformation specialists',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  }
]

export const sampleProfitCenters = [
  // Tech Solutions Inc. Profit Centers
  {
    id: 1,
    companyId: 1,
    company_id: 1,
    name: 'Software Development',
    code: 'SD',
    description: 'Custom software development services',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    companyId: 1,
    company_id: 1,
    name: 'Cloud Services',
    code: 'CS',
    description: 'Cloud infrastructure and migration services',
    createdAt: '2024-01-15T10:31:00Z',
    updatedAt: '2024-01-15T10:31:00Z'
  },
  {
    id: 3,
    companyId: 1,
    company_id: 1,
    name: 'IT Consulting',
    code: 'ITC',
    description: 'Information technology consulting services',
    createdAt: '2024-01-15T10:32:00Z',
    updatedAt: '2024-01-15T10:32:00Z'
  },
  
  // Global Innovations Ltd. Profit Centers
  {
    id: 4,
    companyId: 2,
    company_id: 2,
    name: 'Research & Development',
    code: 'RD',
    description: 'Product research and development division',
    createdAt: '2024-01-15T11:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: 5,
    companyId: 2,
    company_id: 2,
    name: 'Manufacturing',
    code: 'MFG',
    description: 'Product manufacturing and quality control',
    createdAt: '2024-01-15T11:31:00Z',
    updatedAt: '2024-01-15T11:31:00Z'
  },
  
  // Digital Enterprises Corp. Profit Centers
  {
    id: 6,
    companyId: 3,
    company_id: 3,
    name: 'Digital Marketing',
    code: 'DM',
    description: 'Digital marketing and advertising solutions',
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z'
  },
  {
    id: 7,
    companyId: 3,
    company_id: 3,
    name: 'E-commerce',
    code: 'EC',
    description: 'E-commerce platform development',
    createdAt: '2024-01-15T12:31:00Z',
    updatedAt: '2024-01-15T12:31:00Z'
  }
]

export const sampleCostCenters = [
  // Software Development Cost Centers
  {
    id: 1,
    profitCenterId: 1,
    profit_center_id: 1,
    name: 'Frontend Development',
    code: 'FE',
    description: 'User interface and frontend development',
    createdAt: '2024-01-15T10:45:00Z',
    updatedAt: '2024-01-15T10:45:00Z'
  },
  {
    id: 2,
    profitCenterId: 1,
    profit_center_id: 1,
    name: 'Backend Development',
    code: 'BE',
    description: 'Server-side and database development',
    createdAt: '2024-01-15T10:46:00Z',
    updatedAt: '2024-01-15T10:46:00Z'
  },
  {
    id: 3,
    profitCenterId: 1,
    profit_center_id: 1,
    name: 'Mobile Development',
    code: 'MB',
    description: 'Mobile application development',
    createdAt: '2024-01-15T10:47:00Z',
    updatedAt: '2024-01-15T10:47:00Z'
  },
  
  // Cloud Services Cost Centers
  {
    id: 4,
    profitCenterId: 2,
    profit_center_id: 2,
    name: 'AWS Services',
    code: 'AWS',
    description: 'Amazon Web Services implementation',
    createdAt: '2024-01-15T10:48:00Z',
    updatedAt: '2024-01-15T10:48:00Z'
  },
  {
    id: 5,
    profitCenterId: 2,
    profit_center_id: 2,
    name: 'Azure Services',
    code: 'AZ',
    description: 'Microsoft Azure cloud services',
    createdAt: '2024-01-15T10:49:00Z',
    updatedAt: '2024-01-15T10:49:00Z'
  },
  
  // IT Consulting Cost Centers
  {
    id: 6,
    profitCenterId: 3,
    profit_center_id: 3,
    name: 'System Architecture',
    code: 'SA',
    description: 'Enterprise system architecture design',
    createdAt: '2024-01-15T10:50:00Z',
    updatedAt: '2024-01-15T10:50:00Z'
  },
  {
    id: 7,
    profitCenterId: 3,
    profit_center_id: 3,
    name: 'Security Consulting',
    code: 'SEC',
    description: 'Cybersecurity and data protection consulting',
    createdAt: '2024-01-15T10:51:00Z',
    updatedAt: '2024-01-15T10:51:00Z'
  },
  
  // Research & Development Cost Centers
  {
    id: 8,
    profitCenterId: 4,
    profit_center_id: 4,
    name: 'Product Research',
    code: 'PR',
    description: 'New product research and analysis',
    createdAt: '2024-01-15T11:45:00Z',
    updatedAt: '2024-01-15T11:45:00Z'
  },
  {
    id: 9,
    profitCenterId: 4,
    profit_center_id: 4,
    name: 'Innovation Lab',
    code: 'IL',
    description: 'Innovation and prototype development',
    createdAt: '2024-01-15T11:46:00Z',
    updatedAt: '2024-01-15T11:46:00Z'
  },
  
  // Manufacturing Cost Centers
  {
    id: 10,
    profitCenterId: 5,
    profit_center_id: 5,
    name: 'Production Line A',
    code: 'PLA',
    description: 'Primary production line operations',
    createdAt: '2024-01-15T11:47:00Z',
    updatedAt: '2024-01-15T11:47:00Z'
  },
  {
    id: 11,
    profitCenterId: 5,
    profit_center_id: 5,
    name: 'Quality Control',
    code: 'QC',
    description: 'Product quality assurance and testing',
    createdAt: '2024-01-15T11:48:00Z',
    updatedAt: '2024-01-15T11:48:00Z'
  },
  
  // Digital Marketing Cost Centers
  {
    id: 12,
    profitCenterId: 6,
    profit_center_id: 6,
    name: 'Social Media',
    code: 'SM',
    description: 'Social media marketing and management',
    createdAt: '2024-01-15T12:45:00Z',
    updatedAt: '2024-01-15T12:45:00Z'
  },
  {
    id: 13,
    profitCenterId: 6,
    profit_center_id: 6,
    name: 'Content Marketing',
    code: 'CM',
    description: 'Content creation and marketing strategies',
    createdAt: '2024-01-15T12:46:00Z',
    updatedAt: '2024-01-15T12:46:00Z'
  },
  
  // E-commerce Cost Centers
  {
    id: 14,
    profitCenterId: 7,
    profit_center_id: 7,
    name: 'Platform Development',
    code: 'PD',
    description: 'E-commerce platform development and maintenance',
    createdAt: '2024-01-15T12:47:00Z',
    updatedAt: '2024-01-15T12:47:00Z'
  },
  {
    id: 15,
    profitCenterId: 7,
    profit_center_id: 7,
    name: 'Payment Systems',
    code: 'PS',
    description: 'Payment gateway integration and security',
    createdAt: '2024-01-15T12:48:00Z',
    updatedAt: '2024-01-15T12:48:00Z'
  }
]

/**
 * Mock API functions for development
 */
export const mockApi = {
  // Company APIs
  getCompanies: () => Promise.resolve({ data: sampleCompanies }),
  getCompanyById: (id) => Promise.resolve({ 
    data: sampleCompanies.find(c => c.id === parseInt(id)) 
  }),
  createCompany: (data) => Promise.resolve({ 
    data: { 
      id: Date.now(), 
      ...data, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } 
  }),
  updateCompany: (_id, data) => Promise.resolve({ 
    data: { 
      ...sampleCompanies.find(c => c.id === parseInt(_id)), 
      ...data,
      updatedAt: new Date().toISOString()
    } 
  }),
  deleteCompany: () => Promise.resolve({ 
    data: { success: true, message: 'Company deleted successfully' } 
  }),

  // Profit Center APIs
  getProfitCenters: () => Promise.resolve({ data: sampleProfitCenters }),
  getProfitCentersByCompany: (companyId) => Promise.resolve({ 
    data: sampleProfitCenters.filter(pc => pc.companyId === parseInt(companyId) || pc.company_id === parseInt(companyId))
  }),
  getProfitCenterById: (id) => Promise.resolve({ 
    data: sampleProfitCenters.find(pc => pc.id === parseInt(id)) 
  }),
  createProfitCenter: (data) => Promise.resolve({ 
    data: { 
      id: Date.now(), 
      ...data, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } 
  }),
  updateProfitCenter: (profitCenterId, data) => Promise.resolve({ 
    data: { 
      ...sampleProfitCenters.find(pc => pc.id === parseInt(profitCenterId)), 
      ...data,
      updatedAt: new Date().toISOString()
    } 
  }),
  deleteProfitCenter: () => Promise.resolve({ 
    data: { success: true, message: 'Profit center deleted successfully' } 
  }),

  // Cost Center APIs
  getCostCenters: () => Promise.resolve({ data: sampleCostCenters }),
  getCostCentersByProfitCenter: (profitCenterId) => Promise.resolve({ 
    data: sampleCostCenters.filter(cc => cc.profitCenterId === parseInt(profitCenterId) || cc.profit_center_id === parseInt(profitCenterId))
  }),
  getCostCenterById: (costCenterId) => Promise.resolve({ 
    data: sampleCostCenters.find(cc => cc.id === parseInt(costCenterId)) 
  }),
  createCostCenter: (data) => Promise.resolve({ 
    data: { 
      id: Date.now(), 
      ...data, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } 
  }),
  updateCostCenter: (costCenterId, data) => Promise.resolve({ 
    data: { 
      ...sampleCostCenters.find(cc => cc.id === parseInt(costCenterId)), 
      ...data,
      updatedAt: new Date().toISOString()
    } 
  }),
  deleteCostCenter: () => Promise.resolve({ 
    data: { success: true, message: 'Cost center deleted successfully' } 
  })
}

export default {
  sampleCompanies,
  sampleProfitCenters,
  sampleCostCenters,
  mockApi
}
