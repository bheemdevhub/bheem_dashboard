// Attendance API Service
import { getAuthHeaders } from '@/config/api'

const BASE_URL = 'https://erpbackend.bheem.cloud'

export class AttendanceApiService {
  /**
   * Get attendance records for a specific employee
   * @param {string} employeeId - The employee ID
   * @returns {Promise<object>} Attendance records response
   */
  static async getEmployeeAttendance(employeeId) {
    try {
      console.log('AttendanceApiService: Fetching attendance for employee:', employeeId)
      const url = `${BASE_URL}/api/hr/attendance/attendance/by-employee/${employeeId}`
      console.log('AttendanceApiService: URL:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      console.log('AttendanceApiService: Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('AttendanceApiService: Error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('AttendanceApiService: Raw response data:', data)
      
      // Handle the response format: { total, limit, offset, records: [...] }
      let attendanceRecords = []
      if (data && Array.isArray(data.records)) {
        attendanceRecords = data.records
        console.log('AttendanceApiService: Using records array from response')
      } else if (Array.isArray(data)) {
        attendanceRecords = data
        console.log('AttendanceApiService: Using direct array response')
      } else {
        console.warn('AttendanceApiService: Unexpected response format:', data)
        attendanceRecords = []
      }
      
      console.log('AttendanceApiService: Final processed records count:', attendanceRecords.length)
      
      return {
        success: true,
        data: attendanceRecords,
        pagination: {
          total: data.total || attendanceRecords.length,
          limit: data.limit || 10,
          offset: data.offset || 0
        }
      }
    } catch (error) {
      console.error('AttendanceApiService: Error fetching employee attendance:', error)
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  }

  /**
   * Create a new attendance record
   * @param {object} attendanceData - Attendance record data
   * @returns {Promise<object>} Create response
   */
  static async createAttendanceRecord(attendanceData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(attendanceData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error creating attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Update an existing attendance record by employee ID and date
   * @param {string} employeeId - The employee ID
   * @param {string} date - The attendance date (YYYY-MM-DD)
   * @param {object} attendanceData - Updated attendance data
   * @returns {Promise<object>} Update response
   */
  static async updateAttendanceByEmployeeAndDate(employeeId, date, attendanceData) {
    try {
      console.log('AttendanceApiService: Updating attendance for employee:', employeeId, 'date:', date)
      const url = `${BASE_URL}/api/hr/attendance/attendance/${employeeId}/${date}`
      console.log('AttendanceApiService: Update URL:', url)
      console.log('AttendanceApiService: Update data:', attendanceData)
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(attendanceData)
      })
      
      console.log('AttendanceApiService: Update response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('AttendanceApiService: Update error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log('AttendanceApiService: Update success:', data)
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('AttendanceApiService: Error updating attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Delete an attendance record by employee ID and date
   * @param {string} employeeId - The employee ID
   * @param {string} date - The attendance date (YYYY-MM-DD)
   * @returns {Promise<object>} Delete response
   */
  static async deleteAttendanceByEmployeeAndDate(employeeId, date) {
    try {
      console.log('AttendanceApiService: Deleting attendance for employee:', employeeId, 'date:', date)
      const url = `${BASE_URL}/api/hr/attendance/attendance/${employeeId}/${date}`
      console.log('AttendanceApiService: Delete URL:', url)
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      console.log('AttendanceApiService: Delete response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('AttendanceApiService: Delete error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
      }
      
      // For DELETE requests, there might be no response body
      let data = { message: 'Attendance record deleted successfully' }
      try {
        const responseData = await response.json()
        data = responseData
      } catch (e) {
        // Ignore JSON parsing errors for DELETE responses
        console.log('AttendanceApiService: No JSON response body for DELETE request')
      }
      
      console.log('AttendanceApiService: Delete success')
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('AttendanceApiService: Error deleting attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Update an existing attendance record
   * @param {string} recordId - The attendance record ID
   * @param {object} attendanceData - Updated attendance data
   * @returns {Promise<object>} Update response
   */
  static async updateAttendanceRecord(recordId, attendanceData) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/${recordId}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(attendanceData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error updating attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Delete an attendance record
   * @param {string} recordId - The attendance record ID
   * @returns {Promise<object>} Delete response
   */
  static async deleteAttendanceRecord(recordId) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/${recordId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      return {
        success: true,
        data: { message: 'Attendance record deleted successfully' }
      }
    } catch (error) {
      console.error('Error deleting attendance record:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Clock in/out for an employee
   * @param {string} employeeId - The employee ID
   * @param {string} action - 'clock_in' or 'clock_out'
   * @returns {Promise<object>} Clock response
   */
  static async clockEmployee(employeeId, action) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/clock`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          employee_id: employeeId,
          action: action
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error clocking employee:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Get current attendance status for an employee
   * @param {string} employeeId - The employee ID
   * @returns {Promise<object>} Status response
   */
  static async getAttendanceStatus(employeeId) {
    try {
      const response = await fetch(`${BASE_URL}/api/hr/attendance/status/${employeeId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching attendance status:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  }

  /**
   * Get attendance summary for an employee
   * @param {string} employeeId - The employee ID
   * @param {object} filters - Optional filters (date range, etc.)
   * @returns {Promise<object>} Summary response
   */
  static async getAttendanceSummary(employeeId, filters = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (filters.start_date) queryParams.append('start_date', filters.start_date)
      if (filters.end_date) queryParams.append('end_date', filters.end_date)
      
      const response = await fetch(`${BASE_URL}/api/hr/attendance/summary/${employeeId}?${queryParams}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching attendance summary:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  }

  /**
   * Get attendance analytics
   * @param {object} filters - Optional filters (employee_id, department, date range, etc.)
   * @returns {Promise<object>} Analytics response
   */
  static async getAttendanceAnalytics(filters = {}) {
    try {
      const queryParams = new URLSearchParams()
      Object.keys(filters).forEach(key => {
        if (filters[key]) queryParams.append(key, filters[key])
      })
      
      const response = await fetch(`${BASE_URL}/api/hr/attendance/analytics/?${queryParams}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching attendance analytics:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  }
}

export default AttendanceApiService
