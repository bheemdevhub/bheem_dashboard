// Test script to check company creation API
const API_BASE_URL = 'https://erpbackend.bheem.cloud'
const API_ENDPOINT = '/api/accounting/companies/companies/'

// Test payload from user
const testPayload = {
  "company_code": "BHM001221",
  "company_name": "BHEEAM VERSE INNOVATION",
  "legal_name": "BHEEM Corporation Ltd.",
  "company_type": "HOLDING",
  "parent_company_id": null,
  "functional_currency_id": null,
  "reporting_currency_id": null,
  "consolidation_method": "FULL",
  "address": "123 Main St, New York, NY",
  "tax_id": "TAX123456",
  "registration_number": "REG987654"
}

// Function to get auth token from localStorage (simulated)
function getAuthToken() {
  // In browser environment, this would be:
  // return localStorage.getItem('auth_token') || localStorage.getItem('access_token')
  return 'YOUR_TEST_TOKEN_HERE' // Replace with actual token for testing
}

// Function to test company creation
async function testCompanyCreation() {
  const url = `${API_BASE_URL}${API_ENDPOINT}`
  const token = getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  console.log('Testing Company Creation API:')
  console.log('URL:', url)
  console.log('Headers:', headers)
  console.log('Payload:', JSON.stringify(testPayload, null, 2))
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(testPayload)
    })
    
    console.log('Response Status:', response.status)
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()))
    
    const contentType = response.headers.get('content-type')
    let responseData
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }
    
    console.log('Response Data:', responseData)
    
    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      })
    } else {
      console.log('Company created successfully!')
    }
    
  } catch (error) {
    console.error('Network Error:', error)
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testCompanyCreation = testCompanyCreation
  window.testPayload = testPayload
}

// For Node.js environment
if (typeof module !== 'undefined') {
  module.exports = { testCompanyCreation, testPayload }
}
