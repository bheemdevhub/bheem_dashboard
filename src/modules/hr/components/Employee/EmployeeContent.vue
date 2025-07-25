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
                  <!-- Attendance Header with Actions -->
                  <div class="attendance-header">
                    <div class="attendance-title-section">
                      <h3 class="attendance-title">Attendance Records</h3>
                      <div class="attendance-summary-badges" v-if="attendanceRecords.length > 0">
                        <span class="summary-badge total">
                          {{ attendanceRecords.length }} Records
                        </span>
                        <span class="summary-badge present">
                          {{ presentDays }} Present
                        </span>
                        <span class="summary-badge rate" :class="attendanceRate >= 90 ? 'excellent' : attendanceRate >= 80 ? 'good' : 'needs-improvement'">
                          {{ attendanceRate }}% Rate
                        </span>
                      </div>
                    </div>
                    <div class="attendance-actions">
                      <!-- Quick Clock Actions -->
                      <div class="clock-actions">
                        <button 
                          @click="quickClockIn" 
                          class="action-btn clock-in"
                          :disabled="loadingAttendance"
                          title="Quick Clock In for Today"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                          </svg>
                          Clock In
                        </button>
                        <button 
                          @click="quickClockOut" 
                          class="action-btn clock-out"
                          :disabled="loadingAttendance"
                          title="Quick Clock Out for Today"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                          </svg>
                          Clock Out
                        </button>
                      </div>

                      <!-- Standard Actions -->
                      <button @click="refreshAttendance" class="action-btn secondary" :disabled="loadingAttendance">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg>
                        Refresh
                      </button>
                      <button @click="exportAttendanceData" class="action-btn export" :disabled="attendanceRecords.length === 0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        Export
                      </button>
                    </div>
                  </div>

                  <!-- Loading State -->
                  <div v-if="loadingAttendance" class="loading-state">
                    <div class="spinner"></div>
                    <p>Loading attendance records...</p>
                  </div>

                  <!-- Error State -->
                  <div v-else-if="attendanceError" class="error-state">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <p>{{ attendanceError }}</p>
                    <button @click="fetchAttendanceRecords" class="retry-btn">Try Again</button>
                  </div>

                  <!-- Attendance Records -->
                  <div v-else-if="attendanceRecords.length > 0" class="attendance-records">
                    <!-- Summary Stats -->
                    <div class="attendance-stats">
                      <div class="stat-item">
                        <span class="stat-label">Total Days</span>
                        <span class="stat-value">{{ attendanceRecords.length }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Present Days</span>
                        <span class="stat-value present">{{ presentDays }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Attendance Rate</span>
                        <span class="stat-value">{{ attendanceRate }}%</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Avg Hours/Day</span>
                        <span class="stat-value">{{ averageHoursPerDay }}</span>
                      </div>
                    </div>

                    <!-- Records Table -->
                    <div class="attendance-table-container">
                      <table class="attendance-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Hours</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr 
                            v-for="record in paginatedAttendance" 
                            :key="record.id"
                            class="attendance-row"
                          >
                            <td class="date-cell">
                              <div class="date-display">
                                <span class="date">{{ formatAttendanceDate(record.date) }}</span>
                                <span class="day">{{ getDayOfWeek(record.date) }}</span>
                              </div>
                            </td>
                            <td class="time-cell">
                              <span class="time" :class="{ 'late': isLate(record.check_in) }">
                                {{ formatTime(record.check_in) }}
                              </span>
                            </td>
                            <td class="time-cell">
                              <span class="time">{{ formatTime(record.check_out) }}</span>
                            </td>
                            <td class="hours-cell">
                              <span class="hours">{{ calculateHours(record.check_in, record.check_out) }}</span>
                            </td>
                            <td class="status-cell">
                              <span :class="['status-badge', record.status.toLowerCase()]">
                                {{ record.status }}
                              </span>
                            </td>
                            <td class="actions-cell">
                              <button 
                                @click="editAttendanceRecord(record)" 
                                class="action-icon edit"
                                title="Edit Record"
                              >
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button 
                                @click="deleteAttendanceRecord(record)" 
                                class="action-icon delete"
                                title="Delete Record"
                              >
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd" />
                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v6a1 1 0 11-2 0V7zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="totalAttendancePages > 1" class="attendance-pagination">
                      <button 
                        @click="currentAttendancePage--" 
                        :disabled="currentAttendancePage === 1"
                        class="pagination-btn"
                      >
                        Previous
                      </button>
                      <span class="pagination-info">
                        Page {{ currentAttendancePage }} of {{ totalAttendancePages }}
                      </span>
                      <button 
                        @click="currentAttendancePage++" 
                        :disabled="currentAttendancePage === totalAttendancePages"
                        class="pagination-btn"
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div v-else class="attendance-empty-state">
                    <div class="empty-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                    </div>
                    <h4>No Attendance Records</h4>
                    <p>No attendance records found for {{ getFullName(employee) }}. Get started by adding a record or using quick clock actions.</p>
                    <div class="empty-actions">
                      <button @click="quickClockIn" class="action-btn clock-in">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                        </svg>
                        Clock In Now
                      </button>
                    </div>
                  </div>

                  <!-- Add/Edit Attendance Modal -->
                  <div v-if="showAddAttendanceModal" class="modal-overlay" @click="closeAttendanceModal">
                    <div class="modal-content" @click.stop>
                      <div class="modal-header">
                        <h3>{{ editingAttendance ? 'Edit' : 'Add' }} Attendance Record</h3>
                        <button @click="closeAttendanceModal" class="close-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label>Date</label>
                          <input 
                            v-model="attendanceForm.date" 
                            type="date" 
                            class="form-input"
                            :max="today"
                          />
                        </div>
                        <div class="form-row">
                          <div class="form-group">
                            <label>Check In</label>
                            <input 
                              v-model="attendanceForm.check_in" 
                              type="time" 
                              class="form-input"
                            />
                          </div>
                          <div class="form-group">
                            <label>Check Out</label>
                            <input 
                              v-model="attendanceForm.check_out" 
                              type="time" 
                              class="form-input"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Status</label>
                          <select v-model="attendanceForm.status" class="form-input">
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                            <option value="Half Day">Half Day</option>
                          </select>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button @click="closeAttendanceModal" class="btn secondary">Cancel</button>
                        <button @click="saveAttendanceRecord" class="btn primary" :disabled="savingAttendance">
                          {{ savingAttendance ? 'Saving...' : 'Save' }}
                        </button>
                      </div>
                    </div>
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
import { ref, reactive, onMounted, nextTick, computed, watch } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

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
    
    // Attendance-related reactive data
    const attendanceRecords = ref([])
    const loadingAttendance = ref(false)
    const attendanceError = ref(null)
    const showAddAttendanceModal = ref(false)
    const editingAttendance = ref(null)
    const savingAttendance = ref(false)
    const currentAttendancePage = ref(1)
    const attendancePageSize = ref(10)
    
    const attendanceForm = reactive({
      date: '',
      check_in: '',
      check_out: '',
      status: 'Present'
    })
    
    // Get today's date for max date constraint
    const today = new Date().toISOString().split('T')[0]
    
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
    
    // Computed properties for attendance
    const presentDays = computed(() => {
      return attendanceRecords.value.filter(record => record.status === 'Present').length
    })
    
    const attendanceRate = computed(() => {
      if (attendanceRecords.value.length === 0) return 0
      return Math.round((presentDays.value / attendanceRecords.value.length) * 100)
    })
    
    const averageHoursPerDay = computed(() => {
      if (attendanceRecords.value.length === 0) return '0.0'
      const totalHours = attendanceRecords.value.reduce((sum, record) => {
        const hours = calculateHours(record.check_in, record.check_out)
        return sum + (parseFloat(hours) || 0)
      }, 0)
      return (totalHours / attendanceRecords.value.length).toFixed(1)
    })
    
    const totalAttendancePages = computed(() => {
      return Math.ceil(attendanceRecords.value.length / attendancePageSize.value)
    })
    
    const paginatedAttendance = computed(() => {
      const start = (currentAttendancePage.value - 1) * attendancePageSize.value
      const end = start + attendancePageSize.value
      return attendanceRecords.value.slice(start, end)
    })
    
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
    
    // Attendance Methods
    const fetchAttendanceRecords = async () => {
      if (!props.employee?.id) return
      
      loadingAttendance.value = true
      attendanceError.value = null
      
      try {
        const result = await HRApiService.getEmployeeAttendance(props.employee.id)
        if (result.success) {
          // Sort by date descending (newest first)
          attendanceRecords.value = result.data.sort((a, b) => new Date(b.date) - new Date(a.date))
          
          if (result.data.length > 0) {
            toast.success(`Loaded ${result.data.length} attendance records`, {
              timeout: 2000,
              icon: '📋'
            })
          } else {
            toast.info('No attendance records found for this employee', {
              timeout: 3000,
              icon: 'ℹ️'
            })
          }
        } else {
          attendanceError.value = result.error || 'Failed to fetch attendance records'
          toast.error(`Failed to load attendance: ${result.error}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error fetching attendance:', error)
        attendanceError.value = 'An unexpected error occurred while loading attendance data'
        toast.error('Failed to load attendance records', {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        loadingAttendance.value = false
      }
    }
    
    const refreshAttendance = () => {
      fetchAttendanceRecords()
    }
    
    const formatAttendanceDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    }
    
    const getDayOfWeek = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    }
    
    const formatTime = (timeString) => {
      if (!timeString) return 'N/A'
      const time = new Date(`1970-01-01T${timeString}`)
      return time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    }
    
    const calculateHours = (checkIn, checkOut) => {
      if (!checkIn || !checkOut) return '0.0'
      
      const start = new Date(`1970-01-01T${checkIn}`)
      const end = new Date(`1970-01-01T${checkOut}`)
      const diffMs = end - start
      const diffHours = diffMs / (1000 * 60 * 60)
      
      return diffHours > 0 ? diffHours.toFixed(1) : '0.0'
    }
    
    const isLate = (checkInTime) => {
      if (!checkInTime) return false
      const checkIn = new Date(`1970-01-01T${checkInTime}`)
      const standardTime = new Date(`1970-01-01T09:15:00`) // 15 minutes grace period
      return checkIn > standardTime
    }
    
    const editAttendanceRecord = (record) => {
      editingAttendance.value = record
      attendanceForm.date = record.date
      attendanceForm.check_in = record.check_in
      attendanceForm.check_out = record.check_out
      attendanceForm.status = record.status
      showAddAttendanceModal.value = true
    }
    
    const deleteAttendanceRecord = async (record) => {
      const result = await Swal.fire({
        title: 'Delete Attendance Record?',
        text: `This will permanently delete the attendance record for ${formatAttendanceDate(record.date)}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel'
      })
      
      if (result.isConfirmed) {
        try {
          const deleteResult = await HRApiService.deleteAttendanceRecord(record.id)
          if (deleteResult.success) {
            toast.success('Attendance record deleted successfully!', {
              timeout: 3000,
              icon: '✅'
            })
            fetchAttendanceRecords() // Refresh the list
          } else {
            toast.error(`Failed to delete record: ${deleteResult.error}`, {
              timeout: 5000,
              icon: '❌'
            })
          }
        } catch (error) {
          console.error('Error deleting attendance record:', error)
          toast.error('An unexpected error occurred while deleting the record', {
            timeout: 5000,
            icon: '❌'
          })
        }
      }
    }
    
    const closeAttendanceModal = () => {
      showAddAttendanceModal.value = false
      editingAttendance.value = null
      attendanceForm.date = ''
      attendanceForm.check_in = ''
      attendanceForm.check_out = ''
      attendanceForm.status = 'Present'
    }
    
    const saveAttendanceRecord = async () => {
      if (!attendanceForm.date) {
        toast.warning('Please select a date', { timeout: 3000, icon: '⚠️' })
        return
      }
      
      savingAttendance.value = true
      
      try {
        const attendanceData = {
          employee_id: props.employee.id,
          date: attendanceForm.date,
          check_in: attendanceForm.check_in,
          check_out: attendanceForm.check_out,
          status: attendanceForm.status
        }
        
        let result
        if (editingAttendance.value) {
          result = await HRApiService.updateAttendanceRecord(editingAttendance.value.id, attendanceData)
        } else {
          result = await HRApiService.createAttendanceRecord(attendanceData)
        }
        
        if (result.success) {
          const action = editingAttendance.value ? 'updated' : 'created'
          toast.success(`Attendance record ${action} successfully!`, {
            timeout: 3000,
            icon: '✅'
          })
          closeAttendanceModal()
          fetchAttendanceRecords() // Refresh the list
        } else {
          toast.error(`Failed to save record: ${result.error}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving attendance record:', error)
        toast.error('An unexpected error occurred while saving the record', {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        savingAttendance.value = false
      }
    }

    // New attendance action methods
    const quickClockIn = async () => {
      const today = new Date().toISOString().split('T')[0]
      const currentTime = new Date().toTimeString().split(' ')[0].substring(0, 5)
      
      // Check if there's already a record for today
      const todayRecord = attendanceRecords.value.find(record => record.date === today)
      if (todayRecord && todayRecord.check_in) {
        toast.warning('Employee already clocked in today', {
          timeout: 3000,
          icon: '⚠️'
        })
        return
      }
      
      try {
        const attendanceData = {
          employee_id: props.employee.id,
          date: today,
          check_in: currentTime,
          check_out: null,
          status: 'Present'
        }
        
        const result = await HRApiService.createAttendanceRecord(attendanceData)
        if (result.success) {
          toast.success(`Employee clocked in at ${formatTime(currentTime)}`, {
            timeout: 3000,
            icon: '✅'
          })
          fetchAttendanceRecords()
        } else {
          toast.error(`Failed to clock in: ${result.error}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error clocking in:', error)
        toast.error('Failed to clock in', {
          timeout: 5000,
          icon: '❌'
        })
      }
    }

    const quickClockOut = async () => {
      const today = new Date().toISOString().split('T')[0]
      const currentTime = new Date().toTimeString().split(' ')[0].substring(0, 5)
      
      // Find today's record
      const todayRecord = attendanceRecords.value.find(record => record.date === today)
      if (!todayRecord) {
        toast.warning('No clock-in record found for today. Please clock in first.', {
          timeout: 3000,
          icon: '⚠️'
        })
        return
      }
      
      if (todayRecord.check_out) {
        toast.warning('Employee already clocked out today', {
          timeout: 3000,
          icon: '⚠️'
        })
        return
      }
      
      try {
        const attendanceData = {
          employee_id: props.employee.id,
          date: today,
          check_in: todayRecord.check_in,
          check_out: currentTime,
          status: 'Present'
        }
        
        const result = await HRApiService.updateAttendanceRecord(todayRecord.id, attendanceData)
        if (result.success) {
          const hoursWorked = calculateHours(todayRecord.check_in, currentTime)
          toast.success(`Employee clocked out at ${formatTime(currentTime)} (${hoursWorked} hours worked)`, {
            timeout: 4000,
            icon: '✅'
          })
          fetchAttendanceRecords()
        } else {
          toast.error(`Failed to clock out: ${result.error}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error clocking out:', error)
        toast.error('Failed to clock out', {
          timeout: 5000,
          icon: '❌'
        })
      }
    }

    const exportAttendanceData = () => {
      if (attendanceRecords.value.length === 0) {
        toast.warning('No attendance data to export', {
          timeout: 3000,
          icon: '⚠️'
        })
        return
      }

      try {
        // Prepare data for export
        const exportData = attendanceRecords.value.map(record => ({
          'Date': formatAttendanceDate(record.date),
          'Day': getDayOfWeek(record.date),
          'Check In': formatTime(record.check_in),
          'Check Out': formatTime(record.check_out),
          'Hours': calculateHours(record.check_in, record.check_out),
          'Status': record.status
        }))

        // Convert to CSV
        const headers = Object.keys(exportData[0])
        const csvContent = [
          headers.join(','),
          ...exportData.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n')

        // Download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', `${getFullName(props.employee)}_attendance_${new Date().toISOString().split('T')[0]}.csv`)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }

        toast.success('Attendance data exported successfully!', {
          timeout: 3000,
          icon: '📁'
        })
      } catch (error) {
        console.error('Error exporting data:', error)
        toast.error('Failed to export attendance data', {
          timeout: 5000,
          icon: '❌'
        })
      }
    }
    
    // Initialize
    onMounted(() => {
      fetchLookups()
      if (props.employee?.id) {
        fetchAttendanceRecords()
      }
    })
    
    // Watch for employee changes to refresh attendance
    watch(() => props.employee?.id, (newId, oldId) => {
      if (newId && newId !== oldId) {
        fetchAttendanceRecords()
      }
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
      
      // Attendance data
      attendanceRecords,
      loadingAttendance,
      attendanceError,
      showAddAttendanceModal,
      editingAttendance,
      savingAttendance,
      currentAttendancePage,
      attendancePageSize,
      attendanceForm,
      today,
      
      // Computed properties
      presentDays,
      attendanceRate,
      averageHoursPerDay,
      totalAttendancePages,
      paginatedAttendance,
      
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
      handleEdit,
      
      // Attendance methods
      fetchAttendanceRecords,
      refreshAttendance,
      formatAttendanceDate,
      getDayOfWeek,
      formatTime,
      calculateHours,
      isLate,
      editAttendanceRecord,
      deleteAttendanceRecord,
      closeAttendanceModal,
      saveAttendanceRecord,
      quickClockIn,
      quickClockOut,
      exportAttendanceData
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

/* Enhanced Attendance Styles */
.attendance-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.attendance-title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.attendance-title {
  margin: 0;
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 600;
}

.attendance-summary-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.summary-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.summary-badge.total {
  background: #e0e7ff;
  color: #3730a3;
}

.summary-badge.present {
  background: #d1fae5;
  color: #065f46;
}

.summary-badge.rate.excellent {
  background: #d1fae5;
  color: #065f46;
}

.summary-badge.rate.good {
  background: #fef3c7;
  color: #92400e;
}

.summary-badge.rate.needs-improvement {
  background: #fee2e2;
  color: #991b1b;
}

.attendance-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.clock-actions {
  display: flex;
  gap: 0.25rem;
  margin-right: 0.5rem;
  padding-right: 0.5rem;
  border-right: 1px solid #e2e8f0;
}

.action-btn {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn.secondary {
  background: #6b7280;
  color: white;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #4b5563;
}

.action-btn.clock-in {
  background: #10b981;
  color: white;
}

.action-btn.clock-in:hover:not(:disabled) {
  background: #059669;
}

.action-btn.clock-out {
  background: #f59e0b;
  color: white;
}

.action-btn.clock-out:hover:not(:disabled) {
  background: #d97706;
}

.action-btn.export {
  background: #8b5cf6;
  color: white;
}

.action-btn.export:hover:not(:disabled) {
  background: #7c3aed;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6b7280;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #ef4444;
}

.error-state svg {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.attendance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.stat-value.present {
  color: #059669;
}

.attendance-table-container {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-table th,
.attendance-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.attendance-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.attendance-row:hover {
  background: #f9fafb;
}

.date-cell {
  min-width: 120px;
}

.date-display {
  display: flex;
  flex-direction: column;
}

.date {
  font-weight: 500;
}

.day {
  font-size: 0.75rem;
  color: #6b7280;
}

.time-cell {
  min-width: 100px;
}

.time.late {
  color: #ef4444;
  font-weight: 500;
}

.hours-cell {
  min-width: 80px;
  font-weight: 500;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.present {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.absent {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.late {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.half-day {
  background: #e0e7ff;
  color: #3730a3;
}

.actions-cell {
  min-width: 100px;
}

.action-icon {
  padding: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.action-icon svg {
  width: 1rem;
  height: 1rem;
}

.action-icon.edit {
  color: #3b82f6;
}

.action-icon.edit:hover {
  background: #dbeafe;
}

.action-icon.delete {
  color: #ef4444;
}

.action-icon.delete:hover {
  background: #fee2e2;
}

.attendance-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #6b7280;
}

.attendance-empty-state .empty-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  color: #9ca3af;
}

.attendance-empty-state .empty-icon svg {
  width: 100%;
  height: 100%;
}

.attendance-empty-state h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.attendance-empty-state p {
  margin: 0 0 1.5rem 0;
  max-width: 400px;
  line-height: 1.5;
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.attendance-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .attendance-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .attendance-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .clock-actions {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .attendance-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-btn {
    font-size: 0.75rem;
    padding: 0.375rem 0.5rem;
  }
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
