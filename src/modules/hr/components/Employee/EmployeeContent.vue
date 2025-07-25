<template>
  <div class="employee-content">
    <!-- Edit Button -->
    <div class="content-header">
      <button @click="handleEdit" class="edit-btn">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Edit Employee
      </button>
    </div>

    <!-- Employee Information Table -->
    <div class="employee-table">
      <table class="info-table">
        <tbody>
          <!-- First Row -->
          <tr>
            <td class="info-cell">
              <span class="info-label">Name</span>
              <div class="info-value name-value">
                <div class="employee-avatar">
                  <span>{{ getInitials(employee) }}</span>
                </div>
                <span>{{ getFullName(employee) }}</span>
              </div>
            </td>
            <td class="info-cell">
              <span class="info-label">Email</span>
              <div class="info-value">{{ getEmail(employee) }}</div>
            </td>
            <td class="info-cell editable" @dblclick="startEdit('department')">
              <span class="info-label">Department</span>
              <div v-if="editMode.department" class="edit-container">
                <select 
                  v-model="editValues.department_id" 
                  @blur="saveEdit('department')"
                  @keyup.enter="saveEdit('department')"
                  class="edit-select"
                  :disabled="saving.department"
                  ref="departmentSelect"
                >
                  <option value="">Select Department</option>
                  <option 
                    v-for="dept in departments" 
                    :key="dept.id" 
                    :value="dept.id"
                  >
                    {{ dept.name }}
                  </option>
                </select>
                <div v-if="saving.department" class="saving-spinner">
                  <div class="mini-spinner"></div>
                </div>
              </div>
              <div v-else class="info-value editable-value">
                {{ getDepartmentName(employee) }}
                <svg class="edit-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </td>
            <td class="info-cell editable" @dblclick="startEdit('position')">
              <span class="info-label">Position</span>
              <div v-if="editMode.position" class="edit-container">
                <select 
                  v-model="editValues.position_id" 
                  @blur="saveEdit('position')"
                  @keyup.enter="saveEdit('position')"
                  class="edit-select"
                  :disabled="saving.position"
                  ref="positionSelect"
                >
                  <option value="">Select Position</option>
                  <option 
                    v-for="pos in positions" 
                    :key="pos.id" 
                    :value="pos.id"
                  >
                    {{ pos.name }}
                  </option>
                </select>
                <div v-if="saving.position" class="saving-spinner">
                  <div class="mini-spinner"></div>
                </div>
              </div>
              <div v-else class="info-value editable-value">
                {{ getPositionName(employee) }}
                <svg class="edit-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </td>
            <td class="info-cell editable" @dblclick="startEdit('role')">
              <span class="info-label">Role</span>
              <div v-if="editMode.role" class="edit-container">
                <select 
                  v-model="editValues.role_id" 
                  @blur="saveEdit('role')"
                  @keyup.enter="saveEdit('role')"
                  class="edit-select"
                  :disabled="saving.role"
                  ref="roleSelect"
                >
                  <option value="">Select Role</option>
                  <option 
                    v-for="role in roles" 
                    :key="role.id" 
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
                <div v-if="saving.role" class="saving-spinner">
                  <div class="mini-spinner"></div>
                </div>
              </div>
              <div v-else class="info-value editable-value">
                {{ getRoleName(employee) }}
                <svg class="edit-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </td>
            <td class="info-cell status-cell">
              <span class="info-label">Status</span>
              <div class="status-toggle">
                <label class="switch">
                  <input 
                    type="checkbox" 
                    :checked="employee.is_active"
                    @change="toggleStatus"
                    :disabled="saving.status"
                  >
                  <span class="slider"></span>
                </label>
                <div v-if="saving.status" class="saving-spinner">
                  <div class="mini-spinner"></div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Second Row -->
          <tr>
            <td class="info-cell">
              <span class="info-label">Address</span>
              <div class="info-value">{{ getAddress(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Mobile</span>
              <div class="info-value">{{ getMobile(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Personal Email</span>
              <div class="info-value">{{ getPersonalEmail(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Blood Group</span>
              <div class="info-value">{{ getBloodGroup(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Date of Birth</span>
              <div class="info-value">{{ formatDate(employee.date_of_birth) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Bank Name</span>
              <div class="info-value">{{ getBankName(employee) }}</div>
            </td>
          </tr>

          <!-- Third Row -->
          <tr>
            <td class="info-cell">
              <span class="info-label">Account Number</span>
              <div class="info-value">{{ getAccountNumber(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Account Holder</span>
              <div class="info-value">{{ getAccountHolderName(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Routing Number</span>
              <div class="info-value">{{ getRoutingNumber(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Emergency Contact</span>
              <div class="info-value">{{ getEmergencyContact(employee) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Employee Code</span>
              <div class="info-value">{{ employee.employee_code || 'N/A' }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Hire Date</span>
              <div class="info-value">{{ formatDate(employee.hire_date) }}</div>
            </td>
          </tr>

          <!-- Tabs Row -->
          <tr>
            <td colspan="6" class="tabs-container">
              <div class="tabs-header">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="tab-btn"
                  :class="{ active: activeTab === tab.id }"
                >
                  <svg class="tab-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="tab.icon" />
                  </svg>
                  {{ tab.name }}
                </button>
              </div>
              
              <div class="tab-content">
                <div v-if="activeTab === 'attendance'" class="tab-pane">
                  <div class="coming-soon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <h4>Attendance Details</h4>
                    <p>Coming soon...</p>
                  </div>
                </div>
                
                <div v-if="activeTab === 'payroll'" class="tab-pane">
                  <div class="payroll-info">
                    <div class="payroll-item">
                      <span class="payroll-label">Base Salary:</span>
                      <span class="payroll-value">{{ formatCurrency(employee.base_salary, employee.currency) }}</span>
                    </div>
                    <div v-if="employee.hourly_rate" class="payroll-item">
                      <span class="payroll-label">Hourly Rate:</span>
                      <span class="payroll-value">{{ formatCurrency(employee.hourly_rate, employee.currency) }}</span>
                    </div>
                    <div class="payroll-item">
                      <span class="payroll-label">Pay Frequency:</span>
                      <span class="payroll-value">{{ employee.pay_frequency || 'N/A' }}</span>
                    </div>
                    <div class="payroll-item">
                      <span class="payroll-label">Currency:</span>
                      <span class="payroll-value">{{ employee.currency || 'N/A' }}</span>
                    </div>
                  </div>
                </div>
                
                <div v-if="activeTab === 'leaves'" class="tab-pane">
                  <div class="coming-soon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <h4>Leave Details</h4>
                    <p>Coming soon...</p>
                  </div>
                </div>
                
                <div v-if="activeTab === 'documents'" class="tab-pane">
                  <div class="documents-info">
                    <div v-if="employee.passports && employee.passports.length > 0" class="document-section">
                      <h5>Passport Information</h5>
                      <div v-for="passport in employee.passports" :key="passport.passport_number" class="document-item">
                        <div class="document-field">
                          <span class="document-label">Passport Number:</span>
                          <span class="document-value">{{ passport.passport_number }}</span>
                        </div>
                        <div class="document-field">
                          <span class="document-label">Country of Issue:</span>
                          <span class="document-value">{{ passport.country_of_issue }}</span>
                        </div>
                        <div class="document-field">
                          <span class="document-label">Expiry Date:</span>
                          <span class="document-value">{{ formatDate(passport.expiry_date) }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="document-section">
                      <h5>National ID</h5>
                      <div class="document-item">
                        <div class="document-field">
                          <span class="document-label">National ID:</span>
                          <span class="document-value">{{ employee.national_id || 'N/A' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'EmployeeContent',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  emits: ['refresh', 'edit'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // Template refs
    const departmentSelect = ref(null)
    const positionSelect = ref(null)
    const roleSelect = ref(null)
    
    // Reactive data
    const activeTab = ref('attendance')
    const departments = ref([])
    const positions = ref([])
    const roles = ref([])
    
    const editMode = reactive({
      department: false,
      position: false,
      role: false
    })
    
    const editValues = reactive({
      department_id: '',
      position_id: '',
      role_id: ''
    })
    
    const saving = reactive({
      department: false,
      position: false,
      role: false,
      status: false
    })
    
    // Tab configuration
    const tabs = [
      {
        id: 'attendance',
        name: 'Attendance',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      {
        id: 'payroll',
        name: 'Payroll',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      {
        id: 'leaves',
        name: 'Leaves',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      {
        id: 'documents',
        name: 'Documents',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      }
    ]
    
    // Methods
    const fetchLookups = async () => {
      try {
        const result = await HRApiService.getLookups()
        if (result.success) {
          const lookups = result.data
          departments.value = lookups.filter(item => item.type === 'department' && item.is_active)
          positions.value = lookups.filter(item => item.type === 'position' && item.is_active)
          roles.value = lookups.filter(item => item.type === 'role' && item.is_active)
        }
      } catch (error) {
        console.error('Error fetching lookups:', error)
      }
    }
    
    const getFullName = (employee) => {
      if (!employee) return 'N/A'
      const parts = [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean)
      return parts.join(' ') || employee.preferred_name || 'N/A'
    }
    
    const getInitials = (employee) => {
      const name = getFullName(employee)
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    
    const getEmail = (employee) => {
      if (!employee) return 'N/A'
      if (Array.isArray(employee.contacts) && employee.contacts.length > 0) {
        return employee.contacts[0].email_primary || 'N/A'
      }
      return 'N/A'
    }
    
    const getAddress = (employee) => {
      if (!employee) return 'N/A'
      if (Array.isArray(employee.addresses) && employee.addresses.length > 0) {
        const addr = employee.addresses[0]
        return `${addr.line1 || ''} ${addr.line2 || ''}`.trim() || 'N/A'
      }
      return 'N/A'
    }
    
    const getMobile = (employee) => {
      if (!employee) return 'N/A'
      if (Array.isArray(employee.contacts) && employee.contacts.length > 0) {
        return employee.contacts[0].phone_mobile || 'N/A'
      }
      return 'N/A'
    }
    
    const getPersonalEmail = (employee) => {
      if (!employee) return 'N/A'
      if (Array.isArray(employee.contacts) && employee.contacts.length > 0) {
        return employee.contacts[0].email_secondary || 'N/A'
      }
      return 'N/A'
    }
    
    const getBloodGroup = (employee) => {
      return employee?.blood_group || 'N/A'
    }
    
    const getBankName = (employee) => {
      if (Array.isArray(employee.bank_accounts) && employee.bank_accounts.length > 0) {
        return employee.bank_accounts[0].bank_name || 'N/A'
      }
      return 'N/A'
    }
    
    const getAccountNumber = (employee) => {
      if (Array.isArray(employee.bank_accounts) && employee.bank_accounts.length > 0) {
        return employee.bank_accounts[0].account_number || 'N/A'
      }
      return 'N/A'
    }
    
    const getAccountHolderName = (employee) => {
      if (Array.isArray(employee.bank_accounts) && employee.bank_accounts.length > 0) {
        return employee.bank_accounts[0].account_name || 'N/A'
      }
      return 'N/A'
    }
    
    const getRoutingNumber = (employee) => {
      if (Array.isArray(employee.bank_accounts) && employee.bank_accounts.length > 0) {
        return employee.bank_accounts[0].routing_number || 'N/A'
      }
      return 'N/A'
    }
    
    const getEmergencyContact = (employee) => {
      if (Array.isArray(employee.contacts) && employee.contacts.length > 0) {
        const contact = employee.contacts[0]
        return contact.emergency_contact_name ? 
          `${contact.emergency_contact_name} (${contact.emergency_contact_phone})` : 'N/A'
      }
      return 'N/A'
    }
    
    const getDepartmentName = (employee) => {
      if (!employee.department_id) return 'N/A'
      const dept = departments.value.find(d => d.id === employee.department_id)
      return dept?.name || 'N/A'
    }
    
    const getPositionName = (employee) => {
      if (!employee.position_id) return 'N/A'
      const pos = positions.value.find(p => p.id === employee.position_id)
      return pos?.name || 'N/A'
    }
    
    const getRoleName = (employee) => {
      if (!employee.role_id) return 'N/A'
      const role = roles.value.find(r => r.id === employee.role_id)
      return role?.name || 'N/A'
    }
    
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('en-GB')
    }
    
    const formatCurrency = (amount, currency = 'USD') => {
      if (!amount) return 'N/A'
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD'
      })
      return formatter.format(amount)
    }
    
    const startEdit = (field) => {
      editMode[field] = true
      editValues[`${field}_id`] = props.employee[`${field}_id`] || ''
      
      nextTick(() => {
        let selectElement = null
        
        if (field === 'department') {
          selectElement = departmentSelect.value
        } else if (field === 'position') {
          selectElement = positionSelect.value
        } else if (field === 'role') {
          selectElement = roleSelect.value
        }
        
        if (selectElement) {
          selectElement.focus()
        }
      })
    }
    
    const saveEdit = async (field) => {
      if (saving[field]) return
      
      const newValue = editValues[`${field}_id`]
      const currentValue = props.employee[`${field}_id`]
      
      if (newValue === currentValue) {
        editMode[field] = false
        return
      }
      
      saving[field] = true
      
      try {
        const updateData = { [`${field}_id`]: newValue }
        const result = await HRApiService.updateEmployee(props.employee.id, updateData)
        
        if (result.success) {
          toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`, {
            timeout: 1500,
            icon: '✅'
          })
          emit('refresh')
        } else {
          // Handle API service error response
          let errorMessage = 'Unknown error occurred'
          
          if (result.error && typeof result.error === 'string') {
            errorMessage = result.error
          } else if (result.error && typeof result.error === 'object') {
            try {
              errorMessage = JSON.stringify(result.error)
            } catch (e) {
              errorMessage = 'Complex error occurred'
            }
          }
          
          throw new Error(errorMessage)
        }
      } catch (error) {
        console.error(`Error updating ${field}:`, error)
        
        // Enhanced error message parsing
        let errorMessage = 'Unknown error occurred'
        
        if (error && typeof error.message === 'string') {
          errorMessage = error.message
        } else if (error && typeof error === 'string') {
          errorMessage = error
        } else if (error && typeof error === 'object') {
          try {
            errorMessage = JSON.stringify(error)
          } catch (e) {
            errorMessage = 'Complex error object - check console for details'
          }
        }
        
        toast.error(`Failed to update ${field}: ${errorMessage}`, {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        saving[field] = false
        editMode[field] = false
      }
    }
    
    const toggleStatus = async (event) => {
      const newStatus = event.target.checked
      saving.status = true
      
      try {
        const result = await HRApiService.updateEmployee(props.employee.id, {
          is_active: newStatus
        })
        
        if (result.success) {
          toast.success(`Employee status updated to ${newStatus ? 'Active' : 'Inactive'}.`, {
            timeout: 1500,
            icon: '✅'
          })
          emit('refresh')
        } else {
          // Handle API service error response
          let errorMessage = 'Unknown error occurred'
          
          if (result.error && typeof result.error === 'string') {
            errorMessage = result.error
          } else if (result.error && typeof result.error === 'object') {
            try {
              errorMessage = JSON.stringify(result.error)
            } catch (e) {
              errorMessage = 'Complex error occurred'
            }
          }
          
          throw new Error(errorMessage)
        }
      } catch (error) {
        console.error('Error updating status:', error)
        
        // Revert the checkbox
        event.target.checked = !newStatus
        
        // Enhanced error message parsing
        let errorMessage = 'Unknown error occurred'
        
        if (error && typeof error.message === 'string') {
          errorMessage = error.message
        } else if (error && typeof error === 'string') {
          errorMessage = error
        } else if (error && typeof error === 'object') {
          try {
            errorMessage = JSON.stringify(error)
          } catch (e) {
            errorMessage = 'Complex error object - check console for details'
          }
        }
        
        toast.error(`Failed to update status: ${errorMessage}`, {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        saving.status = false
      }
    }
    
    const handleEdit = () => {
      emit('edit', props.employee)
    }
    
    // Initialize
    onMounted(() => {
      fetchLookups()
    })
    
    return {
      // Template refs
      departmentSelect,
      positionSelect,
      roleSelect,
      
      // Data
      activeTab,
      tabs,
      departments,
      positions,
      roles,
      editMode,
      editValues,
      saving,
      
      // Methods
      getFullName,
      getInitials,
      getEmail,
      getAddress,
      getMobile,
      getPersonalEmail,
      getBloodGroup,
      getBankName,
      getAccountNumber,
      getAccountHolderName,
      getRoutingNumber,
      getEmergencyContact,
      getDepartmentName,
      getPositionName,
      getRoleName,
      formatDate,
      formatCurrency,
      startEdit,
      saveEdit,
      toggleStatus,
      handleEdit
    }
  }
}
</script>

<style scoped>
.employee-content {
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.content-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
}

.edit-btn {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.edit-btn svg {
  width: 1rem;
  height: 1rem;
}

.employee-table {
  overflow-x: auto;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
}

.info-cell {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
  min-width: 150px;
}

.info-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.name-value {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.employee-avatar {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.editable {
  cursor: pointer;
  position: relative;
}

.editable-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.editable:hover .editable-value {
  background: #f3f4f6;
}

.edit-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: #9ca3af;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.editable:hover .edit-icon {
  opacity: 1;
}

.edit-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-select {
  padding: 0.375rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: white;
  min-width: 150px;
}

.edit-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.saving-spinner {
  display: flex;
  align-items: center;
}

.mini-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-cell {
  text-align: right;
}

.status-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 1.5rem;
  transition: 0.3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.125rem;
  width: 1.125rem;
  left: 0.1875rem;
  bottom: 0.1875rem;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider {
  background-color: #10b981;
}

input:checked + .slider:before {
  transform: translateX(1rem);
}

.tabs-container {
  padding: 0 !important;
  border-top: 1px solid #e5e7eb;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  color: #374151;
  background: #f3f4f6;
}

.tab-btn.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  background: white;
}

.tab-icon {
  width: 1rem;
  height: 1rem;
}

.tab-content {
  padding: 1.5rem;
}

.tab-pane {
  min-height: 200px;
}

.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #6b7280;
  height: 200px;
}

.coming-soon svg {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  stroke-width: 1;
}

.coming-soon h4 {
  margin: 0 0 0.5rem 0;
  color: #374151;
}

.coming-soon p {
  margin: 0;
}

.payroll-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.payroll-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.payroll-label {
  font-weight: 600;
  color: #374151;
}

.payroll-value {
  color: #1f2937;
  font-weight: 500;
}

.documents-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.document-section h5 {
  margin: 0 0 1rem 0;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
}

.document-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 0.5rem;
}

.document-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.document-field:last-child {
  margin-bottom: 0;
}

.document-label {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.875rem;
}

.document-value {
  color: #1f2937;
  font-weight: 500;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .info-cell {
    padding: 0.75rem;
    min-width: auto;
  }
  
  .info-table {
    font-size: 0.875rem;
  }
  
  .name-value {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .employee-avatar {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.625rem;
  }
  
  .tabs-header {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .tabs-header::-webkit-scrollbar {
    display: none;
  }
  
  .tab-btn {
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }
  
  .payroll-info {
    grid-template-columns: 1fr;
  }
  
  .document-field {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
