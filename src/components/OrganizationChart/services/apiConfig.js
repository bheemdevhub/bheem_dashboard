/**
 * API configuration and endpoints for Organization Chart
 */

// Base API configuration
export const API_CONFIG = {
  BASE_URL: 'https://erpbackend.bheem.cloud',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  // Company endpoints
  COMPANIES: '/api/accounting/companies/companies',
  COMPANY_BY_ID: (id) => `/api/accounting/companies/companies/${id}`,
  
  // Profit Center endpoints
  PROFIT_CENTERS: (companyId) => `/api/accounting/companies/companies/${companyId}/profit-centers`,
  PROFIT_CENTER_BY_ID: (id) => `/api/accounting/companies/companies/profit-centers/${id}`,
  
  // Cost Center endpoints
  COST_CENTERS: (companyId) => `/api/accounting/companies/companies/${companyId}/cost-centers`,
  COST_CENTER_BY_ID: (id) => `/api/accounting/companies/companies/cost-centers/${id}`,
}

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

// Response status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden. Please check your permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.'
}

export default {
  API_CONFIG,
  API_ENDPOINTS,
  HTTP_METHODS,
  HTTP_STATUS,
  ERROR_MESSAGES
}
