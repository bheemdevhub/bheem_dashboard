<template>
  <div class="api-test-container">
    <div class="test-card">
      <h2>API Connection Test</h2>
      <p>Test the authentication API endpoint</p>
      
      <div class="form-section">
        <div class="input-group">
          <label>Email:</label>
          <input v-model="testCredentials.email" type="email" placeholder="Enter test email" />
        </div>
        
        <div class="input-group">
          <label>Password:</label>
          <input v-model="testCredentials.password" type="password" placeholder="Enter test password" />
        </div>
        
        <button @click="testApiConnection" :disabled="testing" class="test-btn">
          {{ testing ? 'Testing...' : 'Test API Connection' }}
        </button>
      </div>
      
      <div v-if="testResult" class="result-section">
        <h3>Test Result:</h3>
        <div class="result-box" :class="testResult.success ? 'success' : 'error'">
          <pre>{{ JSON.stringify(testResult, null, 2) }}</pre>
        </div>
      </div>
      
      <div class="debug-section">
        <h3>Debug Information:</h3>
        <div class="debug-info">
          <p><strong>API URL:</strong> {{ API_URL }}</p>
          <p><strong>Endpoint:</strong> {{ ENDPOINT }}</p>
          <p><strong>Full URL:</strong> {{ FULL_URL }}</p>
          <p><strong>Content-Type:</strong> application/x-www-form-urlencoded</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

const API_URL = 'https://erpbackend.bheem.cloud'
const ENDPOINT = '/api/auth/auth/login'
const FULL_URL = `${API_URL}${ENDPOINT}`

export default {
  name: 'ApiTestView',
  setup() {
    const testing = ref(false)
    const testResult = ref(null)
    
    const testCredentials = reactive({
      email: 'bheemverse@gmail.com',  // Use the example from the response
      password: 'test123'
    })
    
    const testApiConnection = async () => {
      testing.value = true
      testResult.value = null
      
      try {
        // Test 1: Basic connectivity
        console.log('Testing API connection...')
        
        const formData = new URLSearchParams()
        formData.append('email', testCredentials.email)
        formData.append('password', testCredentials.password)
        
        const response = await fetch(FULL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: formData.toString()
        })
        
        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
        
        let responseData
        const contentType = response.headers.get('content-type')
        
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json()
        } else {
          responseData = await response.text()
        }
        
        testResult.value = {
          success: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: responseData,
          formDataSent: Object.fromEntries(formData.entries())
        }
        
      } catch (error) {
        console.error('API test error:', error)
        testResult.value = {
          success: false,
          error: error.message,
          stack: error.stack
        }
      } finally {
        testing.value = false
      }
    }
    
    return {
      testing,
      testResult,
      testCredentials,
      testApiConnection,
      API_URL,
      ENDPOINT,
      FULL_URL
    }
  }
}
</script>

<style scoped>
.api-test-container {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.test-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin: 2rem 0;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.test-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.test-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.result-section {
  margin: 2rem 0;
}

.result-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
}

.result-box.success {
  background: #f0fdf4;
  border-color: #86efac;
}

.result-box.error {
  background: #fef2f2;
  border-color: #fca5a5;
}

.result-box pre {
  margin: 0;
  font-size: 0.875rem;
  white-space: pre-wrap;
}

.debug-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.debug-info p {
  margin: 0.5rem 0;
  font-family: monospace;
  background: #f9fafb;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
