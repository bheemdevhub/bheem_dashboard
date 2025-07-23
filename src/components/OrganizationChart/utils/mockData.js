// Mock data for testing Organization Chart
export const mockCompanies = [
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

export const mockProfitCenters = [
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

export const mockCostCenters = [
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
