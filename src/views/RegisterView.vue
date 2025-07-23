<template>
  <div class="register-container">
    <!-- Background Animation -->
    <div class="background-animation">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="register-content">
      <!-- Left Side - Branding -->
      <div class="branding-section">
        <div class="brand-container">
          <!-- Logo -->
          <div class="logo-section">
            <div class="logo-icon">
              <img src="@/assets/images/bheemlogo.png" alt="Agent Bheem Logo" class="bheem-logo">
            </div>
            <div class="logo-text">
        
              <span>Company Registration</span>
            </div>
          </div>

          <!-- Progress Indicator -->
          <div class="progress-section">
            <h3>Registration Progress</h3>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <div class="steps-list">
              <div 
                v-for="(step, index) in steps" 
                :key="index"
                class="step-item"
                :class="{
                  'active': companyStore.registrationStep === index + 1,
                  'completed': companyStore.registrationStep > index + 1
                }"
              >
                <div class="step-number">
                  <span v-if="companyStore.registrationStep > index + 1">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="step-details">
                  <div class="step-title">{{ step.title }}</div>
                  <div class="step-desc">{{ step.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="features-section">
            <h4>Why Choose Agent Bheem?</h4>
            <div class="feature-list">
              <div class="feature-item">
                <div class="feature-icon">🚀</div>
                <span>Fast & Secure Setup</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">💼</div>
                <span>Enterprise Grade ERP</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📊</div>
                <span>Advanced Analytics</span>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔒</div>
                <span>Bank-Level Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Registration Form -->
      <div class="form-section">
        <div class="form-container">
          <!-- Form Header -->
          <div class="form-header">
            <div class="step-indicator">
              Step {{ companyStore.registrationStep }} of {{ steps.length }}
            </div>
            <h2>{{ steps[companyStore.registrationStep - 1]?.title }}</h2>
            <p>{{ steps[companyStore.registrationStep - 1]?.description }}</p>
          </div>

          <!-- Form Content -->
          <div class="form-content">
            <!-- Step 1: Basic Company Information -->
            <div v-if="companyStore.registrationStep === 1" class="step-form">
              <div class="form-group">
                <label for="company_code" class="form-label">
                  Company Code *
                  <button type="button" @click="generateCode" class="generate-btn" title="Auto Generate">
                    🔄
                  </button>
                </label>
                <input
                  id="company_code"
                  v-model="companyStore.registrationData.company_code"
                  type="text"
                  class="form-input"
                  placeholder="e.g., BHM001"
                  maxlength="10"
                  required
                />
              </div>

              <div class="form-group">
                <label for="company_name" class="form-label">Company Name *</label>
                <input
                  id="company_name"
                  v-model="companyStore.registrationData.company_name"
                  type="text"
                  class="form-input"
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="legal_name" class="form-label">Legal Name *</label>
                <input
                  id="legal_name"
                  v-model="companyStore.registrationData.legal_name"
                  type="text"
                  class="form-input"
                  placeholder="Enter legal company name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="company_type" class="form-label">Company Type *</label>
                <select
                  id="company_type"
                  v-model="companyStore.registrationData.company_type"
                  class="form-input"
                  required
                >
                  <option value="">Select company type</option>
                  <option value="HOLDING">Holding Company</option>
                  <option value="SUBSIDIARY">Subsidiary</option>
                  <option value="DIVISION">Division</option>
                  <option value="BRANCH">Branch</option>
                </select>
              </div>
            </div>

            <!-- Step 2: Financial Configuration -->
            <div v-if="companyStore.registrationStep === 2" class="step-form">
              <div class="form-group">
                <label for="parent_company_id" class="form-label">Parent Company ID (Optional)</label>
                <input
                  id="parent_company_id"
                  v-model="companyStore.registrationData.parent_company_id"
                  type="text"
                  class="form-input"
                  placeholder="Enter parent company ID"
                />
              </div>

              <div class="form-group">
                <label for="functional_currency_id" class="form-label">Functional Currency (Optional)</label>
                <select
                  id="functional_currency_id"
                  v-model="companyStore.registrationData.functional_currency_id"
                  class="form-input"
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>

              <div class="form-group">
                <label for="reporting_currency_id" class="form-label">Reporting Currency (Optional)</label>
                <select
                  id="reporting_currency_id"
                  v-model="companyStore.registrationData.reporting_currency_id"
                  class="form-input"
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>

              <div class="form-group">
                <label for="consolidation_method" class="form-label">Consolidation Method *</label>
                <select
                  id="consolidation_method"
                  v-model="companyStore.registrationData.consolidation_method"
                  class="form-input"
                  required
                >
                  <option value="">Select consolidation method</option>
                  <option value="FULL">Full Consolidation</option>
                  <option value="EQUITY">Equity Method</option>
                  <option value="PROPORTIONAL">Proportional Consolidation</option>
                  <option value="NONE">No Consolidation</option>
                </select>
              </div>
            </div>

            <!-- Step 3: Address & Legal Information -->
            <div v-if="companyStore.registrationStep === 3" class="step-form">
              <div class="form-group">
                <label for="address" class="form-label">Business Address *</label>
                <textarea
                  id="address"
                  v-model="companyStore.registrationData.address"
                  class="form-input form-textarea"
                  placeholder="Enter complete business address"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="tax_id" class="form-label">Tax ID *</label>
                  <input
                    id="tax_id"
                    v-model="companyStore.registrationData.tax_id"
                    type="text"
                    class="form-input"
                    placeholder="e.g., TAX123456"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="registration_number" class="form-label">Registration Number *</label>
                  <input
                    id="registration_number"
                    v-model="companyStore.registrationData.registration_number"
                    type="text"
                    class="form-input"
                    placeholder="e.g., REG987654"
                    required
                  />
                </div>
              </div>

              <div class="info-box">
                <div class="info-icon">ℹ️</div>
                <div class="info-text">
                  <strong>Important:</strong> Please ensure all legal information matches your official business registration documents.
                </div>
              </div>
            </div>
          </div>

          <!-- Form Navigation -->
          <div class="form-navigation">
            <button
              v-if="companyStore.registrationStep > 1"
              @click="handlePreviousStep"
              class="btn btn-secondary"
              :disabled="companyStore.isLoading"
            >
              ← Previous
            </button>

            <button
              v-if="companyStore.registrationStep < 3"
              @click="handleNextStep"
              class="btn btn-primary"
              :disabled="!canProceedToNext"
            >
              Next →
            </button>

            <button
              v-if="companyStore.registrationStep === 3"
              @click="handleSubmit"
              class="btn btn-primary btn-submit"
              :disabled="companyStore.isLoading || !canSubmit"
            >
              <span v-if="companyStore.isLoading" class="loading-spinner"></span>
              {{ companyStore.isLoading ? 'Creating Company...' : 'Create Company' }}
            </button>
          </div>

          <!-- Login Link -->
          <div class="form-footer">
            <p>
              Already have an account? 
              <router-link to="/login" class="login-link">Sign in here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCompanyStore } from '@/store/company'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const companyStore = useCompanyStore()

    // Steps configuration
    const steps = [
      {
        title: 'Company Information',
        description: 'Company code, name, legal name and type'
      },
      {
        title: 'Financial Configuration', 
        description: 'Parent company, currencies and consolidation method'
      },
      {
        title: 'Legal & Registration',
        description: 'Address, tax ID and registration number'
      }
    ]

    // Computed properties
    const progressPercentage = computed(() => {
      return Math.round(((companyStore.registrationStep - 1) / steps.length) * 100)
    })

    const canProceedToNext = computed(() => {
      const step = companyStore.registrationStep
      const data = companyStore.registrationData
      
      console.log('=== Validation Debug ===')
      console.log('Current step:', step)
      console.log('Registration data:', data)
      console.log('Step 1 validation:', {
        company_code: !!data.company_code,
        company_name: !!data.company_name,
        legal_name: !!data.legal_name,
        company_type: !!data.company_type,
        isStepOneValid: companyStore.isStepOneValid
      })
      
      switch (step) {
        case 1: {
          const isValid = companyStore.isStepOneValid
          console.log('Step 1 can proceed:', isValid)
          return isValid
        }
        case 2: {
          const isValid2 = companyStore.isStepTwoValid
          console.log('Step 2 can proceed:', isValid2)
          return isValid2
        }
        default:
          return false
      }
    })

    const canSubmit = computed(() => {
      return companyStore.isStepThreeValid
    })

    // Methods
    const generateCode = () => {
      companyStore.generateCompanyCode()
      toast.info('Company code generated automatically! 🔄', {
        timeout: 3000
      })
    }

    const handleNextStep = () => {
      if (companyStore.validateCurrentStep()) {
        companyStore.nextStep()
        
        toast.success(`Step ${companyStore.registrationStep - 1} completed successfully! ✅`, {
          timeout: 3000
        })
      }
    }

    const handlePreviousStep = () => {
      companyStore.previousStep()
    }

    const handleSubmit = async () => {
      if (!companyStore.validateCurrentStep()) {
        return
      }

      try {
        const result = await companyStore.createCompany()
        
        if (result.success) {
          // Show success message
          toast.success('Company created successfully! Redirecting to dashboard...', {
            timeout: 5000,
            icon: '🎉'
          })
          
          // Redirect to dashboard after brief delay
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        }
      } catch (error) {
        console.error('Company creation failed:', error)
      }
    }

    // Lifecycle
    onMounted(() => {
      // Reset registration data on mount
      companyStore.resetRegistration()
      
      // Add entrance animations
      setTimeout(() => {
        const shapes = document.querySelectorAll('.shape')
        shapes.forEach((shape, index) => {
          setTimeout(() => {
            shape.classList.add('animate')
          }, index * 200)
        })
      }, 100)
    })

    return {
      steps,
      companyStore,
      progressPercentage,
      canProceedToNext,
      canSubmit,
      generateCode,
      handleNextStep,
      handlePreviousStep,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dark .register-container {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: float 6s ease-in-out infinite;
}

.shape.animate {
  opacity: 1;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 60px;
  height: 60px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.register-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.branding-section {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.brand-container {
  max-width: 400px;
  color: white;
}

.logo-section {
  text-align: center;
  margin-bottom: 3rem;
}

.logo-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.logo-text h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text span {
  display: block;
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

.progress-section h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #f0f0f0);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.step-item.active {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.step-item.completed {
  background: rgba(34, 197, 94, 0.2);
  border: 2px solid rgba(34, 197, 94, 0.3);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.step-item.active .step-number {
  background: rgba(255, 255, 255, 0.3);
}

.step-item.completed .step-number {
  background: rgba(34, 197, 94, 0.8);
}

.step-details {
  flex: 1;
}

.step-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.875rem;
  opacity: 0.8;
}

.features-section {
  margin-top: 2rem;
}

.features-section h4 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.feature-icon {
  font-size: 1.25rem;
}

.form-section {
  padding: 2rem;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-indicator {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.form-header p {
  color: var(--text-secondary);
  margin: 0;
}

.step-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.generate-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.generate-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.info-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  margin-top: 1rem;
}

.info-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.info-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-tertiary);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.btn-submit {
  flex: 1;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.form-footer {
  text-align: center;
}

.form-footer p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .register-content {
    grid-template-columns: 1fr;
  }
  
  .branding-section {
    min-height: 40vh;
  }
  
  .form-section {
    min-height: 60vh;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .branding-section,
  .form-section {
    padding: 1.5rem;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
  
  .logo-text h1 {
    font-size: 2rem;
  }
}
</style>
