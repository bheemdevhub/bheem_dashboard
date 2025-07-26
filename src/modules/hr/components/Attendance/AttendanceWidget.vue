<template>
  <div class="attendance-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h3 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Attendance Management
          <span class="item-count">({{ totalAttendanceRecords }})</span>
        </h3>
      </div>
      
      <div class="widget-actions">
        <!-- Date Filter -->
        <div class="date-filter">
          <input
            v-model="filterDate"
            type="date"
            class="date-input"
          />
        </div>
        
        <!-- Search Input -->
        <div class="search-container">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search employees..."
            class="search-input"
          />
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <!-- Add Attendance Button -->
        <button @click="openAddAttendanceModal" class="add-btn" title="Add New Attendance">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Attendance
        </button>

        <!-- Refresh Button -->
        <button @click="refreshData" class="refresh-btn" title="Refresh Attendance Data">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div class="stat-item">
        <div class="stat-icon present">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-details">
          <div class="stat-number">{{ presentCount }}</div>
          <div class="stat-label">Present Today</div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon absent">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-details">
          <div class="stat-number">{{ absentCount }}</div>
          <div class="stat-label">Absent Today</div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon late">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-details">
          <div class="stat-number">{{ lateCount }}</div>
          <div class="stat-label">Late Arrivals</div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon rate">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
          </svg>
        </div>
        <div class="stat-details">
          <div class="stat-number">{{ attendanceRate }}%</div>
          <div class="stat-label">Attendance Rate</div>
        </div>
      </div>
    </div>

    <!-- Widget Content -->
    <div class="widget-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading attendance data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchAttendanceData" class="retry-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          Retry
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredAttendanceData.length" class="empty-container">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <h4>No Attendance Records</h4>
        <p>{{ searchText ? 'No attendance records match your search criteria.' : 'No attendance records found for the selected date.' }}</p>
      </div>

      <!-- Attendance Records Table -->
      <div v-else class="table-container">
        <div class="table-wrapper">
          <table class="attendance-table">
            <thead>
              <tr>
                <th @click="sortBy('employee_name')" class="sortable">
                  Employee
                  <svg v-if="sortField === 'employee_name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th @click="sortBy('check_in')" class="sortable">
                  Check In
                  <svg v-if="sortField === 'check_in'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th @click="sortBy('check_out')" class="sortable">
                  Check Out
                  <svg v-if="sortField === 'check_out'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th>Hours</th>
                <th @click="sortBy('status')" class="sortable">
                  Status
                  <svg v-if="sortField === 'status'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th class="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="record in paginatedAttendanceData" 
                :key="record.id"
                class="table-row"
              >
                <td class="employee-cell">
                  <div class="employee-info">
                    <div class="employee-avatar">
                      <span>{{ getEmployeeInitials(record.employee_name) }}</span>
                    </div>
                    <div class="employee-details">
                      <div class="employee-name">{{ record.employee_name || 'N/A' }}</div>
                      <div class="employee-code">{{ record.employee_code || 'N/A' }}</div>
                    </div>
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
                <td class="actions" @click.stop>
                  <div class="action-buttons">
                    <button @click="viewEmployeeAttendance(record)" class="action-btn view-btn" title="View Employee Attendance">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-container">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredAttendanceData.length }} records
          </div>
          <div class="pagination-controls">
            <button 
              @click="goToPage(1)" 
              :disabled="currentPage === 1" 
              class="pagination-btn"
              title="First Page"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button 
              @click="goToPage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="pagination-btn"
              title="Previous Page"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                :class="['page-btn', { active: page === currentPage }]"
                :disabled="page === '...'"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="goToPage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="pagination-btn"
              title="Next Page"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button 
              @click="goToPage(totalPages)" 
              :disabled="currentPage === totalPages" 
              class="pagination-btn"
              title="Last Page"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'AttendanceWidget',
  emits: ['view-employee-attendance', 'add-attendance', 'edit-attendance'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // Reactive data
    const attendanceData = ref([])
    const employees = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    const filterDate = ref(new Date().toISOString().split('T')[0]) // Today's date
    
    // Sorting
    const sortField = ref('employee_name')
    const sortAsc = ref(true)
    
    // Pagination
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // Additional reactive data
    
    // Computed properties
    const totalAttendanceRecords = computed(() => attendanceData.value.length)
    
    const filteredAttendanceData = computed(() => {
      let filtered = attendanceData.value
      
      if (searchText.value) {
        const search = searchText.value.toLowerCase()
        filtered = filtered.filter(record => 
          (record.employee_name || '').toLowerCase().includes(search) ||
          (record.employee_code || '').toLowerCase().includes(search) ||
          (record.status || '').toLowerCase().includes(search)
        )
      }
      
      // Sort
      filtered.sort((a, b) => {
        let aVal = a[sortField.value]
        let bVal = b[sortField.value]
        
        if (aVal === null || aVal === undefined) aVal = ''
        if (bVal === null || bVal === undefined) bVal = ''
        
        if (sortAsc.value) {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
      
      return filtered
    })
    
    const totalPages = computed(() => Math.ceil(filteredAttendanceData.value.length / pageSize.value))
    
    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredAttendanceData.value.length))
    
    const paginatedAttendanceData = computed(() => {
      return filteredAttendanceData.value.slice(startIndex.value, endIndex.value)
    })
    
    const visiblePages = computed(() => {
      const pages = []
      const total = totalPages.value
      const current = currentPage.value
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        } else if (current >= total - 3) {
          pages.push(1)
          pages.push('...')
          for (let i = total - 4; i <= total; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        }
      }
      
      return pages
    })
    
    // Stats computed properties
    const presentCount = computed(() => {
      return attendanceData.value.filter(record => record.status === 'Present').length
    })
    
    const absentCount = computed(() => {
      return attendanceData.value.filter(record => record.status === 'Absent').length
    })
    
    const lateCount = computed(() => {
      return attendanceData.value.filter(record => isLate(record.check_in)).length
    })
    
    const attendanceRate = computed(() => {
      if (attendanceData.value.length === 0) return 0
      return Math.round((presentCount.value / attendanceData.value.length) * 100)
    })
    
    // Methods
    const fetchAttendanceData = async () => {
      loading.value = true
      error.value = null
      
      try {
        // First get all employees
        const employeesResult = await HRApiService.getEmployees()
        if (employeesResult.success) {
          employees.value = employeesResult.data.items || []
        }
        
        // Try to fetch real attendance data for each employee
        // In a production environment, you'd want a bulk endpoint like:
        // /api/hr/attendance/daily/{date} or /api/hr/attendance/range?start={date}&end={date}
        const attendancePromises = employees.value.map(async (employee) => {
          try {
            const result = await HRApiService.getEmployeeAttendance(employee.id)
            if (result.success && result.data.length > 0) {
              // Filter for the selected date
              return result.data.filter(record => record.date === filterDate.value)
                .map(record => ({
                  ...record,
                  employee_name: `${employee.first_name} ${employee.last_name}`.trim(),
                  employee_code: employee.employee_code
                }))
            }
            return []
          } catch (err) {
            console.warn(`Failed to fetch attendance for employee ${employee.id}:`, err)
            return []
          }
        })
        
        const attendanceResults = await Promise.all(attendancePromises)
        const realAttendanceData = attendanceResults.flat()
        
        // If we have real data, use it; otherwise, generate mock data for demonstration
        if (realAttendanceData.length > 0) {
          attendanceData.value = realAttendanceData
          toast.success(`Loaded ${attendanceData.value.length} real attendance records`, {
            timeout: 2000,
            icon: '📋'
          })
        } else {
          // Generate mock data for demonstration
          const mockAttendanceData = generateMockAttendanceData(filterDate.value)
          attendanceData.value = mockAttendanceData
          toast.info(`Showing ${attendanceData.value.length} sample attendance records (no real data found)`, {
            timeout: 3000,
            icon: '🎭'
          })
        }
        
      } catch (err) {
        error.value = err.message || 'Failed to fetch attendance data'
        toast.error(`Error loading attendance data: ${err.message || 'Connection failed'}`, {
          timeout: 5000,
          icon: '🔌'
        })
      } finally {
        loading.value = false
      }
    }
    
    const generateMockAttendanceData = (selectedDate) => {
      // This is temporary mock data - replace with real API call
      // Generate more records to demonstrate pagination
      const mockEmployees = employees.value.length > 0 ? employees.value : 
        Array.from({ length: 25 }, (_, index) => ({
          id: index + 1,
          first_name: `Employee`,
          last_name: `${index + 1}`,
          employee_code: `EMP${String(index + 1).padStart(3, '0')}`
        }))
      
      return mockEmployees.slice(0, 25).map((employee) => {
        const statuses = ['Present', 'Absent', 'Late', 'Half Day']
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        
        const checkInTimes = ['08:30:00', '09:00:00', '09:15:00', '09:30:00', '10:00:00']
        const checkOutTimes = ['17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00']
        
        return {
          id: `attendance-${employee.id}-${selectedDate}`,
          employee_id: employee.id,
          employee_name: `${employee.first_name} ${employee.last_name}`.trim(),
          employee_code: employee.employee_code,
          date: selectedDate,
          check_in: randomStatus === 'Absent' ? null : checkInTimes[Math.floor(Math.random() * checkInTimes.length)],
          check_out: randomStatus === 'Absent' ? null : checkOutTimes[Math.floor(Math.random() * checkOutTimes.length)],
          status: randomStatus
        }
      })
    }
    
    const refreshData = () => {
      fetchAttendanceData()
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
    
    const getEmployeeInitials = (name) => {
      if (!name) return 'N/A'
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    
    const sortBy = (field) => {
      if (sortField.value === field) {
        sortAsc.value = !sortAsc.value
      } else {
        sortField.value = field
        sortAsc.value = true
      }
      currentPage.value = 1
    }
    
    const goToPage = (page) => {
      if (page !== '...' && page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }
    
    const viewEmployeeAttendance = (record) => {
      emit('view-employee-attendance', {
        employeeId: record.employee_id,
        employeeName: record.employee_name
      })
    }
    
    // Add Attendance Methods
    const openAddAttendanceModal = () => {
      emit('add-attendance')
    }
    
    const openEditAttendanceModal = (attendance) => {
      emit('edit-attendance', attendance)
    }
    
    // Watch for search changes to reset pagination
    watch(searchText, () => {
      currentPage.value = 1
    })
    
    // Watch for date changes to fetch new data
    watch(filterDate, () => {
      fetchAttendanceData()
    })
    
    // Initialize
    onMounted(() => {
      fetchAttendanceData()
    })
    
    return {
      // Data
      attendanceData,
      loading,
      error,
      searchText,
      filterDate,
      sortField,
      sortAsc,
      currentPage,
      pageSize,
      employees,
      
      // Computed
      totalAttendanceRecords,
      filteredAttendanceData,
      totalPages,
      startIndex,
      endIndex,
      paginatedAttendanceData,
      visiblePages,
      presentCount,
      absentCount,
      lateCount,
      attendanceRate,
      
      // Methods
      fetchAttendanceData,
      refreshData,
      formatTime,
      calculateHours,
      isLate,
      getEmployeeInitials,
      sortBy,
      goToPage,
      viewEmployeeAttendance,
      openAddAttendanceModal,
      openEditAttendanceModal
    }
  }
}
</script>

<style scoped>
.attendance-widget {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.widget-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.widget-title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.widget-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.widget-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3b82f6;
}

.item-count {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.widget-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-filter .date-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;
}

.date-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  pointer-events: none;
}

.refresh-btn {
  padding: 0.5rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.refresh-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.add-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.add-btn svg {
  width: 1rem;
  height: 1rem;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.present {
  background: #10b981;
}

.stat-icon.absent {
  background: #ef4444;
}

.stat-icon.late {
  background: #f59e0b;
}

.stat-icon.rate {
  background: #8b5cf6;
}

.stat-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.stat-details {
  flex: 1;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.widget-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  color: #6b7280;
  text-align: center;
  flex: 1;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  width: 3rem;
  height: 3rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

.empty-icon {
  color: #9ca3af;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.retry-btn svg {
  width: 1rem;
  height: 1rem;
}

.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
  border-bottom: 1px solid #e5e7eb;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

.attendance-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  position: relative;
}

.attendance-table th.sortable:hover {
  background: #f3f4f6;
}

.sort-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.attendance-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: #f9fafb;
}

.employee-cell {
  min-width: 200px;
}

.employee-info {
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

.employee-details {
  flex: 1;
}

.employee-name {
  font-weight: 500;
  color: #1f2937;
}

.employee-code {
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

.actions-column {
  width: 80px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.view-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.view-btn:hover {
  background: #3b82f6;
  color: white;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn,
.page-btn {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.pagination-btn:hover:not(:disabled),
.page-btn:hover {
  background: #f3f4f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 1rem;
  height: 1rem;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .widget-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .widget-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-input {
    min-width: 150px;
  }
  
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .quick-stats {
    grid-template-columns: 1fr;
  }
  
  .employee-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .attendance-table th,
  .attendance-table td {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #6b7280;
  pointer-events: none;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #2563eb;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-sm {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@media (max-width: 640px) {
  .modal-content {
    margin: 0.5rem;
    max-width: none;
  }
  
  .modal-header,
  .modal-body {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-btn,
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
