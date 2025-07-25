<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="header-text">
            <h2>{{ isEdit ? 'Edit Attendance' : 'Add New Attendance' }}</h2>
            <p>{{ isEdit ? 'Update attendance record' : 'Create a new attendance record' }}</p>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="attendance-form">
          <!-- Attendance Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3>Attendance Information</h3>
            </div>
            <div class="form-grid">
              <!-- Employee Selection -->
              <div class="form-group">
                <label class="form-label required">Employee</label>
                <select 
                  v-model="formData.employee_id" 
                  class="form-input"
                  :class="{ error: errors.employee_id }"
                  :disabled="isEdit"
                >
                  <option value="">Select Employee</option>
                  <option 
                    v-for="employee in employees" 
                    :key="employee.id" 
                    :value="employee.id"
                  >
                    {{ employee.employee_code }} - {{ employee.first_name }} {{ employee.last_name }}
                  </option>
                </select>
                <span v-if="errors.employee_id" class="error-text">{{ errors.employee_id }}</span>
              </div>

              <!-- Date -->
              <div class="form-group">
                <label class="form-label required">Date</label>
                <input 
                  v-model="formData.date" 
                  type="date" 
                  class="form-input"
                  :class="{ error: errors.date }"
                  :max="today"
                />
                <span v-if="errors.date" class="error-text">{{ errors.date }}</span>
              </div>

              <!-- Status -->
              <div class="form-group">
                <label class="form-label required">Status</label>
                <select 
                  v-model="formData.status" 
                  class="form-input"
                  :class="{ error: errors.status }"
                  @change="handleStatusChange"
                >
                  <option value="">Select Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Work From Home">Work From Home</option>
                  <option value="On Leave">On Leave</option>
                </select>
                <span v-if="errors.status" class="error-text">{{ errors.status }}</span>
              </div>

              <!-- Check In Time -->
              <div class="form-group" v-if="formData.status !== 'Absent' && formData.status !== 'On Leave'">
                <label class="form-label" :class="{ required: isCheckInRequired }">Check In Time</label>
                <input 
                  v-model="formData.check_in" 
                  type="time" 
                  class="form-input"
                  :class="{ error: errors.check_in }"
                />
                <span v-if="errors.check_in" class="error-text">{{ errors.check_in }}</span>
              </div>

              <!-- Check Out Time -->
              <div class="form-group" v-if="formData.status !== 'Absent' && formData.status !== 'On Leave'">
                <label class="form-label">Check Out Time</label>
                <input 
                  v-model="formData.check_out" 
                  type="time" 
                  class="form-input"
                  :class="{ error: errors.check_out }"
                  :min="formData.check_in"
                />
                <span v-if="errors.check_out" class="error-text">{{ errors.check_out }}</span>
              </div>

              <!-- Notes -->
              <div class="form-group full-width">
                <label class="form-label">Notes</label>
                <textarea 
                  v-model="formData.notes" 
                  class="form-input"
                  rows="3"
                  placeholder="Additional notes (optional)"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Quick Time Buttons -->
          <div class="form-section" v-if="formData.status !== 'Absent' && formData.status !== 'On Leave'">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h3>Quick Time Selection</h3>
            </div>
            <div class="quick-times">
              <div class="time-section">
                <h4>Check In</h4>
                <div class="time-buttons">
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckIn('08:00:00')"
                  >
                    8:00 AM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckIn('08:30:00')"
                  >
                    8:30 AM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckIn('09:00:00')"
                  >
                    9:00 AM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckIn('09:30:00')"
                  >
                    9:30 AM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn current-time"
                    @click="setCurrentCheckIn"
                  >
                    Current Time
                  </button>
                </div>
              </div>
              
              <div class="time-section">
                <h4>Check Out</h4>
                <div class="time-buttons">
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckOut('17:00:00')"
                  >
                    5:00 PM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckOut('17:30:00')"
                  >
                    5:30 PM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckOut('18:00:00')"
                  >
                    6:00 PM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn"
                    @click="setCheckOut('18:30:00')"
                  >
                    6:30 PM
                  </button>
                  <button 
                    type="button" 
                    class="time-btn current-time"
                    @click="setCurrentCheckOut"
                  >
                    Current Time
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" @click="closeModal" class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
          Cancel
        </button>
        <button type="submit" @click="handleSubmit" class="btn btn-primary" :disabled="loading">
          <svg v-if="loading" class="animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
            <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          {{ loading ? 'Saving...' : (isEdit ? 'Update Attendance' : 'Add Attendance') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'AddAttendance',
  props: {
    isVisible: { type: Boolean, default: false },
    attendance: { type: Object, default: null }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    const loading = ref(false)
    const errors = ref({})
    const employees = ref([])

    // Form data
    const formData = reactive({
      employee_id: '',
      date: '',
      check_in: '',
      check_out: '',
      status: '',
      notes: ''
    })

    const today = computed(() => {
      return new Date().toISOString().split('T')[0]
    })

    const isEdit = computed(() => !!props.attendance)

    const isCheckInRequired = computed(() => {
      return ['Present', 'Late', 'Half Day', 'Work From Home'].includes(formData.status)
    })

    // Watch for attendance data to populate form
    watch(() => props.attendance, (newAttendance) => {
      if (newAttendance) {
        Object.keys(formData).forEach(key => {
          if (newAttendance[key] !== undefined) {
            formData[key] = newAttendance[key]
          }
        })
      }
    }, { immediate: true })

    // Watch for modal visibility to set default date
    watch(() => props.isVisible, (isVisible) => {
      if (isVisible && !isEdit.value) {
        formData.date = today.value
      }
    })

    // Methods
    const loadEmployees = async () => {
      try {
        const result = await HRApiService.getEmployees()
        if (result.success) {
          employees.value = result.data.items || result.data.results || result.data || []
          employees.value = employees.value.filter(emp => emp.is_active)
        } else {
          console.warn('Failed to load employees:', result.error)
          toast.warning('Failed to load employee list', { icon: '⚠️' })
        }
      } catch (error) {
        console.error('Error loading employees:', error)
        toast.error('Failed to load employees', { icon: '❌' })
      }
    }

    const handleStatusChange = () => {
      if (formData.status === 'Absent' || formData.status === 'On Leave') {
        formData.check_in = ''
        formData.check_out = ''
      }
    }

    const setCheckIn = (time) => {
      formData.check_in = time
    }

    const setCheckOut = (time) => {
      formData.check_out = time
    }

    const setCurrentCheckIn = () => {
      const now = new Date()
      formData.check_in = now.toTimeString().slice(0, 8)
    }

    const setCurrentCheckOut = () => {
      const now = new Date()
      formData.check_out = now.toTimeString().slice(0, 8)
    }

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      // Required fields
      const requiredFields = ['employee_id', 'date', 'status']
      
      requiredFields.forEach(field => {
        if (!formData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Check in time validation
      if (isCheckInRequired.value && !formData.check_in) {
        errors.value.check_in = 'Check in time is required for this status'
        isValid = false
      }

      // Check out validation
      if (formData.check_in && formData.check_out) {
        if (formData.check_out <= formData.check_in) {
          errors.value.check_out = 'Check out time must be after check in time'
          isValid = false
        }
      }

      // Date validation
      if (formData.date && formData.date > today.value) {
        errors.value.date = 'Date cannot be in the future'
        isValid = false
      }

      return isValid
    }

    const prepareSubmissionData = () => {
      const data = { ...formData }

      // Convert time format to HH:MM:SS if needed
      if (data.check_in && !data.check_in.includes(':')) {
        data.check_in = data.check_in + ':00'
      }
      if (data.check_out && !data.check_out.includes(':')) {
        data.check_out = data.check_out + ':00'
      }

      // Set null values for absent/leave status
      if (data.status === 'Absent' || data.status === 'On Leave') {
        data.check_in = null
        data.check_out = null
      }

      // Remove empty notes
      if (!data.notes || data.notes.trim() === '') {
        delete data.notes
      }

      return data
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        const errorFields = Object.keys(errors.value)
        if (errorFields.length > 0) {
          const firstError = errors.value[errorFields[0]]
          toast.warning(`Please fix the following: ${firstError}`, { icon: '⚠️' })
        }
        return
      }

      loading.value = true

      try {
        const data = prepareSubmissionData()
        console.log('Prepared attendance data:', data)
        
        let result

        if (isEdit.value) {
          result = await HRApiService.updateAttendanceRecord(props.attendance.id, data)
        } else {
          result = await HRApiService.createAttendanceRecord(data)
        }

        console.log('API result:', result)

        if (result.success) {
          const employee = employees.value.find(emp => emp.id === data.employee_id)
          const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : 'Employee'
          const actionText = isEdit.value ? 'updated' : 'created'
          
          toast.success(`Attendance record for "${employeeName}" has been ${actionText} successfully!`, {
            icon: '✅'
          })

          emit('success', result.data)
          closeModal()
        } else {
          const actionText = isEdit.value ? 'update' : 'create'
          let errorMessage = 'Unknown error occurred'
          
          if (result.error && typeof result.error === 'string') {
            errorMessage = result.error
          } else if (result.error && typeof result.error === 'object') {
            errorMessage = JSON.stringify(result.error)
          }
          
          toast.error(`Failed to ${actionText} attendance record: ${errorMessage}`, {
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving attendance:', error)
        const actionText = isEdit.value ? 'update' : 'create'
        
        let errorMessage = 'Unknown error occurred'
        if (error.message) {
          errorMessage = error.message
        }
        
        toast.error(`Failed to ${actionText} attendance record: ${errorMessage}`, {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        loading.value = false
      }
    }

    const closeModal = () => {
      // Reset form data
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      errors.value = {}
      emit('close')
    }

    // Initialize
    onMounted(() => {
      loadEmployees()
    })

    return {
      loading,
      errors,
      formData,
      employees,
      today,
      isEdit,
      isCheckInRequired,
      handleStatusChange,
      setCheckIn,
      setCheckOut,
      setCurrentCheckIn,
      setCurrentCheckOut,
      handleSubmit,
      closeModal
    }
  }
}
</script>

<style scoped>
/* Base Modal Styles - Same as AddEmployee */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.95);
  animation: modalAppear 0.2s ease-out forwards;
}

@keyframes modalAppear {
  to {
    transform: scale(1);
  }
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.header-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.header-text p {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
}

.close-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background: #fafbfc;
}

.attendance-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.section-header {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.section-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.form-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.form-label.required::after {
  content: '*';
  color: #ef4444;
  margin-left: 0.25rem;
  font-size: 1rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-input:hover:not(:focus) {
  border-color: #d1d5db;
}

.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.form-input::placeholder {
  color: #9ca3af;
}

.error-text {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.error-text::before {
  content: '⚠';
}

/* Quick Time Selection Styles */
.quick-times {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.time-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  text-align: center;
}

.time-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time-btn {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.time-btn:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
  color: #1e40af;
  transform: translateY(-1px);
}

.time-btn.current-time {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
  color: white;
}

.time-btn.current-time:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  border-color: #059669;
  color: white;
  transform: translateY(-1px);
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;
}

.btn svg {
  width: 1rem;
  height: 1rem;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-secondary {
  background: white;
  border-color: #d1d5db;
  color: #374151;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border-color: #2563eb;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-container {
    max-height: 95vh;
    border-radius: 12px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .quick-times {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .attendance-form {
    padding: 1rem;
  }
  
  .quick-times {
    padding: 1rem;
  }
}
</style>
