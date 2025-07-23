<template>
  <div class="login-container">
    <!-- Animated Background -->
    <div class="login-background">
      <div class="animated-bg">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
          <div class="shape shape-6"></div>
        </div>
        <div class="gradient-mesh"></div>
        <div class="grid-pattern"></div>
      </div>
    </div>
    
    <!-- Login Content -->
    <div class="login-content">
      <!-- Left Side - Branding & Features -->
      <div class="branding-section">
        <div class="brand-content">
          <div class="logo-container">
            <div class="logo-icon-modern">
              <img src="@/assets/images/bheemlogo.png" alt="Platform Logo" class="bheem-logo">
            </div>
            <div class="brand-info">
              <span class="brand-badge">Enterprise Edition</span>
            </div>
          </div>
          
          <div class="brand-description">
            <h2 class="tagline">Transform Your Business Experience</h2>
            <p class="brand-text">Experience next-generation enterprise resource planning with intelligent automation that adapts to your workflow and delivers insights that matter.</p>
          </div>
          
          <!-- Feature highlights with animations -->
          <div class="features-showcase">
            <div class="feature-item" data-delay="0">
              <div class="feature-icon ai">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 5.26L16 6L13.09 6.74L12 10L10.91 6.74L8 6L10.91 5.26L12 2Z" fill="currentColor"/>
                  <path d="M19 10L19.5 11.5L21 12L19.5 12.5L19 14L18.5 12.5L17 12L18.5 11.5L19 10Z" fill="currentColor"/>
                  <path d="M7 18L7.5 19.5L9 20L7.5 20.5L7 22L6.5 20.5L5 20L6.5 19.5L7 18Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="feature-content">
                <h4>Smart Analytics</h4>
                <p>Intelligent insights that learn from your data</p>
              </div>
            </div>
            
            <div class="feature-item" data-delay="200">
              <div class="feature-icon security">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-content">
                <h4>Enterprise Security</h4>
                <p>Bank-level encryption & compliance</p>
              </div>
            </div>
            
            <div class="feature-item" data-delay="400">
              <div class="feature-icon performance">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="feature-content">
                <h4>Lightning Fast</h4>
                <p>Sub-second response times guaranteed</p>
              </div>
            </div>
          </div>
          
          <!-- Statistics -->
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-number">10M+</div>
              <div class="stat-label">Data Points</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">Uptime</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="form-section">
        <div class="form-container">
          <div class="form-header">
            <div class="form-logo">
              <div class="mini-logo">
                <img src="@/assets/images/bheemlogo.png" alt="Platform Logo" class="mini-bheem-logo">
              </div>
            </div>
            <h2 class="form-title">Welcome Back</h2>
            <p class="form-subtitle">Sign in to access your intelligent workspace</p>
          </div>


          <!-- Enhanced Login Form -->
          <form @submit.prevent="handleLogin" class="login-form">
            <!-- Error Display -->
            <div v-if="authStore.error" class="error-message">
              <div class="error-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <span>{{ authStore.error }}</span>
            </div>

            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="form-label">
                <span>Email Address</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.email, 'valid': form.email && !errors.email }"
                  placeholder="Enter your email address"
                  autocomplete="email"
                  required
                />
                <div v-if="form.email && !errors.email" class="input-valid">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20,6 9,17 4,12" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label for="password" class="form-label">
                <span>Password</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  :class="{ 'error': errors.password, 'valid': form.password && !errors.password }"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  required
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="password-toggle"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
                  <EyeIcon v-else class="w-5 h-5" />
                </button>
              </div>
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
              
              <!-- Password Strength Indicator -->
              <div v-if="form.password" class="password-strength">
                <div class="strength-bar">
                  <div class="strength-fill" :class="passwordStrength.class" :style="{ width: passwordStrength.width }"></div>
                </div>
                <span class="strength-text" :class="passwordStrength.class">{{ passwordStrength.text }}</span>
              </div>
            </div>

            <!-- Form Options -->
            <div class="form-row">
              <label class="checkbox-container">
                <input v-model="form.rememberMe" type="checkbox" class="checkbox">
                <span class="checkmark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20,6 9,17 4,12" stroke-width="3"/>
                  </svg>
                </span>
                <span class="checkbox-text">Remember me for 30 days</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="submit-btn"
              :class="{ 'loading': authStore.isLoading }"
              :disabled="authStore.isLoading || !isFormValid"
            >
              <span v-if="authStore.isLoading" class="loading-content">
                <svg class="loading-spinner" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In...</span>
              </span>
              <span v-else class="normal-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                Login
              </span>
            </button>
          </form>

          <!-- Registration Link -->
          <div class="register-section">
            <p class="register-text">
              Don't have an account?
              <router-link to="/register" class="register-link">
                Create your account
              </router-link>
            </p>
          </div>

        </div>
      </div>
    </div>
    
    <!-- Loading Spinner Overlay -->
    <LoadingSpinner
      :visible="showLoadingSpinner"
      :title="loadingTitle"
      :subtitle="loadingSubtitle"
      :showSuccess="showSuccessAnimation"
      @hidden="onLoadingHidden"
    />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useToast } from 'vue-toastification'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'LoginView',
  components: {
    EyeIcon,
    EyeSlashIcon,
    LoadingSpinner
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const toast = useToast()
    
    const showPassword = ref(false)
    
    // Loading spinner states
    const showLoadingSpinner = ref(false)
    const showSuccessAnimation = ref(false)
    const loadingTitle = ref('Signing In')
    const loadingSubtitle = ref('Verifying your credentials...')
    
    const form = reactive({
      email: '',
      password: '',
      rememberMe: false
    })
    
    const errors = reactive({
      email: '',
      password: ''
    })

    // Computed properties
    const isFormValid = computed(() => {
      return form.email && form.password && !errors.email && !errors.password
    })

    const passwordStrength = computed(() => {
      const password = form.password
      if (!password) return { class: '', width: '0%', text: '' }
      
      let score = 0
      if (password.length >= 8) score++
      if (/[a-z]/.test(password)) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      
      const strength = {
        0: { class: 'weak', width: '20%', text: 'Very Weak' },
        1: { class: 'weak', width: '40%', text: 'Weak' },
        2: { class: 'fair', width: '60%', text: 'Fair' },
        3: { class: 'good', width: '80%', text: 'Good' },
        4: { class: 'strong', width: '100%', text: 'Strong' },
        5: { class: 'strong', width: '100%', text: 'Very Strong' }
      }
      
      return strength[score] || strength[0]
    })

    // Validation functions
    const validateEmail = () => {
      errors.email = ''
      if (!form.email) {
        errors.email = 'Email is required'
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
        return false
      }
      return true
    }

    const validatePassword = () => {
      errors.password = ''
      if (!form.password) {
        errors.password = 'Password is required'
        return false
      }
      if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        return false
      }
      return true
    }

    const validateForm = () => {
      const isEmailValid = validateEmail()
      const isPasswordValid = validatePassword()
      
      if (!isEmailValid || !isPasswordValid) {
        toast.error('Please fix the form errors before submitting', {
          timeout: 4000,
          icon: '⚠️'
        })
      }
      
      return isEmailValid && isPasswordValid
    }

    // Form handlers
    const handleLogin = async () => {
      if (!validateForm()) return
      
      authStore.clearError()
      
      // Show loading spinner
      showLoadingSpinner.value = true
      loadingTitle.value = 'Signing In'
      loadingSubtitle.value = 'Verifying your credentials...'
      showSuccessAnimation.value = false
      
      try {
        // Call login with credentials object
        const result = await authStore.login({
          email: form.email,
          password: form.password
        })
        
        if (result.success) {
          // Update loading text to show success phase
          loadingTitle.value = 'Login Successful!'
          loadingSubtitle.value = 'Preparing your AI workspace...'
          showSuccessAnimation.value = true
          
          // Wait a bit to show success animation, then redirect
          setTimeout(() => {
            loadingTitle.value = 'Loading Dashboard'
            loadingSubtitle.value = 'Setting up your workspace...'
          }, 1000)
          
          // Redirect after showing success animation
          setTimeout(() => {
            showLoadingSpinner.value = false
            router.push('/dashboard')
          }, 3000)
        } else {
          // Hide loading spinner on error
          showLoadingSpinner.value = false
        }
      } catch (error) {
        console.error('Login failed:', error)
        // Hide loading spinner on error
        showLoadingSpinner.value = false
        // Error is already handled in the store with toast notifications
      }
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const fillDemoCredentials = () => {
      // Use the email from the API response example
      form.email = 'bheemverse@gmail.com'
      form.password = 'demo123' // You'll need to use the actual password
      
      // Show info toast
      toast.info('Demo credentials filled! You can now login.', {
        timeout: 3000,
        icon: '📝'
      })
      
      // Add visual feedback
      const button = document.querySelector('.auto-fill-btn')
      if (button) {
        button.classList.add('filled')
        setTimeout(() => button.classList.remove('filled'), 1000)
      }
    }

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        
        toast.success('Copied to clipboard!', {
          timeout: 2000,
          icon: '📋'
        })
        
        console.log('Copied to clipboard:', text)
      } catch (err) {
        console.error('Failed to copy:', err)
        
        toast.error('Failed to copy to clipboard', {
          timeout: 3000,
          icon: '❌'
        })
      }
    }

    // Loading spinner handlers
    const onLoadingHidden = () => {
      console.log('Loading spinner hidden')
    }

    // Lifecycle hooks
    onMounted(() => {
      // Add animation classes to elements
      const shapes = document.querySelectorAll('.shape')
      shapes.forEach((shape, index) => {
        setTimeout(() => {
          shape.classList.add('animate')
        }, index * 200)
      })

      // Animate feature items
      const features = document.querySelectorAll('.feature-item')
      features.forEach((feature, index) => {
        setTimeout(() => {
          feature.classList.add('animate')
        }, 1000 + index * 200)
      })
    })

    return {
      form,
      errors,
      showPassword,
      authStore,
      isFormValid,
      passwordStrength,
      showLoadingSpinner,
      showSuccessAnimation,
      loadingTitle,
      loadingSubtitle,
      handleLogin,
      togglePassword,
      fillDemoCredentials,
      copyToClipboard,
      validateEmail,
      validatePassword,
      onLoadingHidden
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
}

.login-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #5b73e8 100%);
  z-index: -1;
  animation: backgroundShift 10s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #5b73e8 100%);
  }
  50% { 
    background: linear-gradient(135deg, #5b73e8 0%, #667eea 50%, #764ba2 100%);
  }
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.login-content {
  width: 100%;
  max-width: 400px;
  z-index: 1;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.logo-icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
}

.logo-icon svg {
  width: 2rem;
  height: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.login-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.error-alert {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.9);
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.input-error {
  border-color: #ef4444;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #374151;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.checkbox {
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  position: relative;
}

.checkbox:checked {
  background: #667eea;
  border-color: #667eea;
}

.checkbox:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 0.75rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-full {
  width: 100%;
}

.login-button {
  min-height: 3rem;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.signup-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.signup-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link:hover {
  text-decoration: underline;
}

.demo-credentials {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1.5rem;
  text-align: center;
}

.demo-title {
  font-weight: 600;
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.demo-info {
  color: #374151;
  font-size: 0.75rem;
  margin: 0.25rem 0;
  font-family: 'Courier New', monospace;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .login-title {
    font-size: 1.5rem;
  }
}

/* Enhanced Animated Background */
.animated-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.floating-shapes {
  position: absolute;
  inset: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(2px);
  animation: float 6s ease-in-out infinite;
  opacity: 0;
  transition: opacity 1s ease;
}

.shape.animate {
  opacity: 1;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 5%;
  animation-delay: 2s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 10%;
  right: 10%;
  animation-delay: 3s;
}

.shape-5 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

.shape-6 {
  width: 90px;
  height: 90px;
  top: 30%;
  left: 30%;
  animation-delay: 5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

.gradient-mesh {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  animation: meshFloat 8s ease-in-out infinite;
}

@keyframes meshFloat {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* Enhanced Login Content */
.login-content {
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 4rem;
  align-items: center;
  z-index: 10;
  position: relative;
}

/* Branding Section Enhancements */
.branding-section {
  padding: 4rem 3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-content {
  max-width: 650px;
  width: 100%;
}

.logo-container {
  margin-bottom: 1.25rem;
  text-align: center;
  animation: slideInUp 1s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-icon-modern {
  width: 200px;
  height: 200px;
  background: transparent;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.25rem;
  color: white;
  animation: logoFloat 3s ease-in-out infinite;
  position: relative;
  overflow: visible;
}

.logo-icon-modern .bheem-logo {
  width: 180px;
  height: 180px;
  object-fit: contain;
  filter: brightness(1.4) contrast(1.3) drop-shadow(0 8px 20px rgba(0,0,0,0.4)) drop-shadow(0 0 40px rgba(255,255,255,0.1));
  z-index: 1;
  transition: all 0.4s ease;
}

.logo-icon-modern:hover .bheem-logo {
  transform: scale(1.08);
  filter: brightness(1.5) contrast(1.4) drop-shadow(0 12px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(255,255,255,0.2));
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.05); }
}

.brand-info {
  text-align: left;
  margin-left: 0;
}

.brand-title {
  font-size: 4rem;
  font-weight: 900;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.02em;
  line-height: 1.1;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% { 
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1);
  }
  100% { 
    text-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
    transform: scale(1.02);
  }
}

.brand-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
}

.brand-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(251, 191, 36, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(251, 191, 36, 0.6); }
}

.tagline {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.brand-text {
  font-size: 1.2rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 3rem;
}

/* Enhanced Features Showcase */
.features-showcase {
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;
}

.feature-item.animate {
  opacity: 1;
  transform: translateX(0);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.feature-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

.feature-icon.ai {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.feature-icon.security {
  background: linear-gradient(135deg, #10b981, #059669);
}

.feature-icon.performance {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.feature-icon svg {
  width: 28px;
  height: 28px;
  z-index: 1;
}

.feature-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.feature-content p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}

/* Statistics Container */
.stats-container {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

/* Enhanced Form Section */
.form-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
}

.form-header {
  text-align: center;
  margin-bottom: 1rem;
}

.mini-logo {
  width: 140px;
  height: 140px;
  background: transparent;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem auto;
  animation: miniLogoFloat 2.5s ease-in-out infinite;
  position: relative;
  overflow: visible;
}

@keyframes miniLogoFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.08); }
}

.mini-bheem-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: brightness(1.3) contrast(1.2) drop-shadow(0 6px 18px rgba(102, 126, 234, 0.4)) drop-shadow(0 0 30px rgba(102, 126, 234, 0.2));
  z-index: 1;
  transition: all 0.4s ease;
}

.mini-logo:hover .mini-bheem-logo {
  transform: scale(1.12);
  filter: brightness(1.4) contrast(1.3) drop-shadow(0 8px 24px rgba(102, 126, 234, 0.5)) drop-shadow(0 0 40px rgba(102, 126, 234, 0.3));
}

.form-title {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #1f2937 0%, #374151 30%, #4b5563 60%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.03em;
  text-align: center;
  animation: formTitleSlide 1s ease-out;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: default;
  transition: all 0.3s ease;
}

.form-title:hover {
  transform: scale(1.02);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #5b73e8 60%, #1f2937 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  animation: titleUnderline 1s ease-out 0.5s both;
  transition: all 0.3s ease;
}

.form-title:hover::after {
  width: 80px;
  background: linear-gradient(90deg, #764ba2, #667eea, #5b73e8);
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.4);
}

@keyframes titleUnderline {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 60px;
    opacity: 1;
  }
}

@keyframes formTitleSlide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-subtitle {
  color: #6b7280;
  margin: 0.5rem 0 1.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  animation: subtitleSlide 1s ease-out 0.2s both;
}

@keyframes subtitleSlide {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced Social Login */
.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.social-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.02), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.social-btn:hover::before {
  transform: translateX(100%);
}

.social-btn:hover {
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-btn.google:hover {
  border-color: #4285f4;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
}

.social-btn.microsoft:hover {
  border-color: #0078d4;
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.2);
}

.social-icon {
  width: 20px;
  height: 20px;
}

/* Enhanced Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}

.divider-text {
  background: rgba(255, 255, 255, 0.95);
  padding: 0 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  position: relative;
}

/* Enhanced Form Inputs */
.form-group {
  margin-bottom: 1.5rem;
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }

.form-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.required {
  color: #ef4444;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #6b7280;
  z-index: 1;
}

.input-icon svg {
  width: 20px;
  height: 20px;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.form-input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input.valid {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.input-valid {
  position: absolute;
  right: 1rem;
  color: #10b981;
}

.input-valid svg {
  width: 20px;
  height: 20px;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #374151;
  background: rgba(0, 0, 0, 0.05);
}

.password-toggle svg {
  width: 20px;
  height: 20px;
}

.error-text {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Password Strength Indicator */
.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak { background: #ef4444; }
.strength-fill.fair { background: #f59e0b; }
.strength-fill.good { background: #10b981; }
.strength-fill.strong { background: #059669; }

.strength-text {
  font-size: 0.75rem;
  font-weight: 500;
}

.strength-text.weak { color: #ef4444; }
.strength-text.fair { color: #f59e0b; }
.strength-text.good { color: #10b981; }
.strength-text.strong { color: #059669; }

/* Enhanced Checkbox */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: #667eea;
  border-color: #667eea;
}

.checkmark {
  position: absolute;
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.checkmark svg {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  color: white;
  transition: transform 0.2s ease;
}

.checkbox:checked + .checkmark svg {
  transform: translate(-50%, -50%) scale(1);
}

.checkbox-text {
  font-size: 0.875rem;
  color: #374151;
}

/* Enhanced Submit Button */
.submit-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.submit-btn:hover:not(:disabled)::before {
  transform: translateX(100%);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Demo Section */
.demo-section {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.demo-title {
  font-weight: 600;
  color: #667eea;
  margin: 0;
  font-size: 0.95rem;
}

.demo-credentials {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.demo-credential {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.demo-label {
  color: #6b7280;
  min-width: 70px;
}

.demo-value {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'SF Mono', Consolas, monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-value:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.02);
}

.auto-fill-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.auto-fill-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.auto-fill-btn.filled {
  background: #10b981;
  transform: scale(1.02);
}

.auto-fill-btn svg {
  width: 16px;
  height: 16px;
}

/* Enhanced Footer */
.form-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.signup-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
}

.signup-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.signup-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.75rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #667eea;
}

.separator {
  color: #d1d5db;
  font-size: 0.75rem;
}

/* Error Message Enhancement */
.error-message {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error-icon {
  color: #dc2626;
  flex-shrink: 0;
}

.error-icon svg {
  width: 20px;
  height: 20px;
}

/* Registration Section */
.register-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  text-align: center;
}

.register-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.register-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.register-link:hover {
  color: #5a67d8;
  text-decoration: none;
}

.register-link:before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.register-link:hover:before {
  transform: scaleX(1);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .login-content {
    grid-template-columns: 1fr;
    max-width: 500px;
    gap: 2rem;
  }
  
  .branding-section {
    display: none;
  }
  
  .logo-icon-modern {
    width: 140px;
    height: 140px;
  }
  
  .logo-icon-modern .bheem-logo {
    width: 120px;
    height: 120px;
  }
  
  .brand-title {
    font-size: 2.75rem;
  }
}

@media (max-width: 640px) {
  .login-container {
    padding: 1rem;
  }
  
  .form-section {
    padding: 2rem 1.5rem;
  }
  
  .form-title {
    font-size: 2rem;
  }
  
  .form-title::after {
    width: 40px;
  }
  
  .mini-logo {
    width: 110px;
    height: 110px;
  }
  
  .mini-bheem-logo {
    width: 90px;
    height: 90px;
  }
  
  .logo-icon-modern {
    width: 130px;
    height: 130px;
  }
  
  .logo-icon-modern .bheem-logo {
    width: 110px;
    height: 110px;
  }
  
  .brand-title {
    font-size: 2.25rem;
  }
  
  .stats-container {
    gap: 1rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .separator {
    display: none;
  }
}

/* Animation for form elements */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading states and micro-interactions */
.form-input:focus + .input-icon {
  color: #667eea;
}

.social-btn:active {
  transform: translateY(0);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode support (future enhancement) */
@media (prefers-color-scheme: dark) {
  .form-section {
    background: rgba(17, 24, 39, 0.95);
    color: #f9fafb;
  }
  
  .form-title {
    color: #f9fafb;
  }
  
  .form-subtitle {
    color: #d1d5db;
  }
  
  .form-input {
    background: rgba(31, 41, 55, 0.8);
    border-color: #374151;
    color: #f9fafb;
  }
  
  .form-input:focus {
    border-color: #667eea;
    background: rgba(31, 41, 55, 0.9);
  }
}
</style>
