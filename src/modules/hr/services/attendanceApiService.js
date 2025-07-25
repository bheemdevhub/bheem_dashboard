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
      const response = await fetch(`${BASE_URL}/api/hr/attendance/attendance/by-employee/${employeeId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return {
        success: true,
        data: data || []
      }
    } catch (error) {
      console.error('Error fetching employee attendance:', error)
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
