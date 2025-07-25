// API Configuration
export const API_BASE_URL = 'https://erpbackend.bheem.cloud'

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify'
  },
  
  // Companies
  COMPANIES: {
    CREATE: '/api/accounting/companies/companies/',
    LIST: '/api/accounting/companies/companies/',
    UPDATE: '/api/accounting/companies/companies/',
    DELETE: '/api/accounting/companies/companies/',
    GET_BY_ID: '/api/accounting/companies/companies/'
  },
  
  // Add more modules as needed
  EMPLOYEES: {
    LIST: '/api/hr/employees/',
    CREATE: '/api/hr/employees/',
    UPDATE: '/api/hr/employees/',
    DELETE: '/api/hr/employees/'
  },
  
  DEPARTMENTS: {
    LIST: '/api/hr/departments/',
    CREATE: '/api/hr/departments/',
    UPDATE: '/api/hr/departments/',
    DELETE: '/api/hr/departments/'
  },

  ATTENDANCE: {
    LIST: '/api/hr/attendance/attendance',
    CREATE: '/api/hr/attendance/attendance',
    UPDATE: '/api/hr/attendance/attendance',
    DELETE: '/api/hr/attendance/attendance',
    BY_EMPLOYEE: '/api/hr/attendance/attendance/by-employee'
  }
}

// Request configuration defaults
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// Form data headers for specific endpoints
export const FORM_DATA_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}
