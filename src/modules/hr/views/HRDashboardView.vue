<template>
  <div class="hr-dashboard">
    <div class="app-container">
      <!-- Sidebar -->
      <SidebarComponent 
        :collapsed="sidebarCollapsed" 
        @toggle="handleSidebarToggle" 
      />

      <div class="content-wrapper" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <!-- Navbar -->
        <NavbarComponent />

        <!-- Main Content -->
        <main class="main-content">
          <!-- Employee Statistics Section -->
          <section class="stats-section">
            <div class="stats-container">
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div class="stat-details">
                    <div class="stat-number">{{ employeeStats.total }}</div>
                    <div class="stat-label">Total Employees</div>
                  </div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon active">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="stat-details">
                    <div class="stat-number">{{ employeeStats.active }}</div>
                    <div class="stat-label">Active Employees</div>
                  </div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon inactive">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="stat-details">
                    <div class="stat-number">{{ employeeStats.inactive }}</div>
                    <div class="stat-label">Inactive Employees</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- HR Modules Grid (2 per row) -->
          <section class="modules-section">
            <div class="modules-grid">
              <!-- First Row -->
              <div class="module-card primary-module">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Employee Management</h3>
                    <p class="module-description">Manage employee records, profiles, and information</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">{{ employeeStats.total }}</span>
                      <span class="stat-text">Total</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <EmployeeList 
                    ref="employeeListRef"
                    @add-employee="handleAddEmployee"
                    @edit-employee="handleEditEmployee" 
                  />
                </div>
              </div>

              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Job Requisitions</h3>
                    <p class="module-description">Create and manage job openings and requirements</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">{{ jobRequisitionStats.total }}</span>
                      <span class="stat-text">Total</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <JobRequisitionList 
                    ref="jobRequisitionListRef"
                    @add-job-requisition="handleAddJobRequisition"
                    @edit-job-requisition="handleEditJobRequisition" 
                  />
                </div>
              </div>

              <!-- Second Row -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Candidates</h3>
                    <p class="module-description">Track and manage job applicants and candidates</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">{{ candidateStats.total }}</span>
                      <span class="stat-text">Total</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <CandidateList 
                    ref="candidateListRef"
                    @add-candidate="handleAddCandidate"
                    @edit-candidate="handleEditCandidate" 
                  />
                </div>
              </div>

              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Interviews</h3>
                    <p class="module-description">Schedule and manage interview processes</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">{{ interviewStats.total }}</span>
                      <span class="stat-text">Total</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <InterviewList 
                    ref="interviewListRef"
                    @add-interview="handleAddInterview"
                    @edit-interview="handleEditInterview" 
                  />
                </div>
              </div>

              <!-- Third Row -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Job Offers</h3>
                    <p class="module-description">Create and manage employment offers</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">{{ offerStats.total }}</span>
                      <span class="stat-text">Total</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <OfferList 
                    ref="offerListRef"
                    @add-offer="handleAddOffer"
                    @edit-offer="handleEditOffer" 
                  />
                </div>
              </div>

              <div class="module-card">
                <AttendanceWidget 
                  @add-attendance="handleAddAttendance"
                  @edit-attendance="handleEditAttendance"
                />
              </div>

              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Onboarding Checklist</h3>
                    <p class="module-description">Manage new employee onboarding process</p>
                  </div>
                  <div class="module-actions">
                    <button class="action-btn primary">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                      </svg>
                      New Checklist
                    </button>
                  </div>
                </div>
                <div class="module-content">
                  <div class="coming-soon-content">
                    <div class="coming-soon-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h5m0-6v6m0-6l7-7 7 7M9 11l7-7v6"></path>
                      </svg>
                    </div>
                    <h4>Coming Soon</h4>
                    <p>Onboarding checklist system coming in next update</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- Footer -->
        <FooterComponent />
      </div>
    </div>

    <!-- Add/Edit Employee Modal -->
    <AddEmployee 
      :is-visible="showModal"
      :employee="editingEmployee"
      @success="handleFormSuccess"
      @close="closeModal"
    />

    <!-- Add/Edit Candidate Modal -->
    <AddCandidate 
      :is-visible="showCandidateModal"
      :candidate="editingCandidate"
      @success="handleCandidateFormSuccess"
      @close="closeCandidateModal"
    />

    <!-- Add/Edit Interview Modal -->
    <AddInterview 
      :is-visible="showInterviewModal"
      :interview="editingInterview"
      @success="handleInterviewFormSuccess"
      @close="closeInterviewModal"
    />

    <!-- Add/Edit Offer Modal -->
    <AddOffer 
      :is-visible="showOfferModal"
      :offer="editingOffer"
      @success="handleOfferFormSuccess"
      @close="closeOfferModal"
    />

    <!-- Add/Edit Job Requisition Modal -->
    <AddJobRequisition 
      v-if="showJobRequisitionModal"
      :is-edit="isEditingJobRequisition"
      :job-requisition="editingJobRequisition"
      @saved="handleJobRequisitionFormSuccess"
      @close="closeJobRequisitionModal"
    />

    <!-- Add/Edit Attendance Modal -->
    <AddAttendance 
      :is-visible="showAttendanceModal"
      :attendance="editingAttendance"
      @success="handleAttendanceFormSuccess"
      @close="closeAttendanceModal"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import EmployeeList from '../components/Employee/EmployeeList.vue'
import AddEmployee from '../components/Employee/AddEmployee.vue'
import CandidateList from '../components/Candidate/CandidateList.vue'
import AddCandidate from '../components/Candidate/AddCandidate.vue'
import InterviewList from '../components/Interview/InterviewList.vue'
import AddInterview from '../components/Interview/AddInterview.vue'
import OfferList from '../components/Offer/OfferList.vue'
import AddOffer from '../components/Offer/AddOffer.vue'
import JobRequisitionList from '../components/JobRequisition/JobRequisitionList.vue'
import AddJobRequisition from '../components/JobRequisition/AddJobRequisition.vue'
import AttendanceWidget from '../components/Attendance/AttendanceWidget.vue'
import AddAttendance from '../components/Attendance/AddAttendance.vue'
import { HRApiService } from '../services/hrApiService'

export default {
  name: 'HRDashboardView',
  components: {
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    EmployeeList,
    AddEmployee,
    CandidateList,
    AddCandidate,
    InterviewList,
    AddInterview,
    // eslint-disable-next-line vue/no-unused-components
    OfferList,
    AddOffer,
    JobRequisitionList,
    AddJobRequisition,
    AttendanceWidget,
    AddAttendance
  },
  setup() {
    // Reactive data
    const sidebarCollapsed = ref(false)
    const employeeStats = ref({
      total: 0,
      active: 0,
      inactive: 0
    })
    const jobRequisitionStats = ref({
      total: 0,
      active: 0,
      inactive: 0
    })
    const candidateStats = ref({
      total: 0,
      active: 0,
      inactive: 0
    })

    const interviewStats = ref({
      total: 0,
      scheduled: 0,
      completed: 0
    })

    const offerStats = ref({
      total: 0,
      accepted: 0,
      pending: 0
    })
    
    // Modal state
    const showModal = ref(false)
    const editingEmployee = ref(null)
    const showCandidateModal = ref(false)
    const editingCandidate = ref(null)

    const showInterviewModal = ref(false)
    const editingInterview = ref(null)
    const showOfferModal = ref(false)
    const editingOffer = ref(null)
    const showJobRequisitionModal = ref(false)
    const editingJobRequisition = ref(null)
    const showAttendanceModal = ref(false)
    const editingAttendance = ref(null)
    
    // Component refs
    const employeeListRef = ref(null)
    const candidateListRef = ref(null)
    const interviewListRef = ref(null)
    const offerListRef = ref(null)
    const jobRequisitionListRef = ref(null)

    // Methods
    const handleSidebarToggle = (collapsed) => {
      sidebarCollapsed.value = collapsed
    }

    const fetchEmployeeStats = async () => {
      try {
        const result = await HRApiService.getEmployees()
        if (result.success) {
          const employees = result.data.items || result.data.results || result.data || []
          employeeStats.value = {
            total: employees.length,
            active: employees.filter(emp => emp.is_active).length,
            inactive: employees.filter(emp => !emp.is_active).length
          }
        }
      } catch (error) {
        console.error('Error fetching employee stats:', error)
      }
    }

    const fetchJobRequisitionStats = async () => {
      try {
        const result = await HRApiService.getJobRequisitions()
        if (result.success) {
          const jobRequisitions = result.data || []
          jobRequisitionStats.value = {
            total: jobRequisitions.length,
            active: jobRequisitions.filter(jr => jr.is_active).length,
            inactive: jobRequisitions.filter(jr => !jr.is_active).length
          }
        }
      } catch (error) {
        console.error('Error fetching job requisition stats:', error)
      }
    }

    const fetchCandidateStats = async () => {
      try {
        const result = await HRApiService.getCandidates()
        if (result.success) {
          const candidates = result.data.items || result.data.results || result.data || []
          candidateStats.value = {
            total: candidates.length,
            active: candidates.filter(c => c.status && c.status.toLowerCase() !== 'rejected').length,
            inactive: candidates.filter(c => c.status && c.status.toLowerCase() === 'rejected').length
          }
        }
      } catch (error) {
        console.error('Error fetching candidate stats:', error)
      }
    }

    const fetchInterviewStats = async () => {
      try {
        const result = await HRApiService.getInterviews()
        if (result.success) {
          const interviews = result.data.items || result.data.results || result.data || []
          interviewStats.value = {
            total: interviews.length,
            scheduled: interviews.filter(i => i.status?.toLowerCase() === 'scheduled').length || 0,
            completed: interviews.filter(i => i.status?.toLowerCase() === 'completed').length || 0
          }
        }
      } catch (error) {
        console.error('Error fetching interview stats:', error)
      }
    }

    const fetchOfferStats = async () => {
      try {
        const result = await HRApiService.getOffers()
        if (result.success) {
          const offers = result.data || []
          offerStats.value = {
            total: offers.length,
            accepted: offers.filter(o => o.offer_status?.toLowerCase() === 'accepted').length || 0,
            pending: offers.filter(o => o.offer_status?.toLowerCase() === 'offered').length || 0
          }
        }
      } catch (error) {
        console.error('Error fetching offer stats:', error)
      }
    }

    // Employee modal handlers
    const handleAddEmployee = () => {
      editingEmployee.value = null
      showModal.value = true
    }

    const handleEditEmployee = (employee) => {
      editingEmployee.value = employee
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      editingEmployee.value = null
    }

    const handleFormSuccess = () => {
      closeModal()
      // Refresh stats after adding/editing employee
      fetchEmployeeStats()
      // Refresh employee list to show new employee without page refresh
      if (employeeListRef.value && employeeListRef.value.fetchEmployees) {
        employeeListRef.value.fetchEmployees()
      }
    }

    // Candidate modal handlers
    const handleAddCandidate = () => {
      editingCandidate.value = null
      showCandidateModal.value = true
    }

    const handleEditCandidate = (candidate) => {
      editingCandidate.value = candidate
      showCandidateModal.value = true
    }

    const closeCandidateModal = () => {
      showCandidateModal.value = false
      editingCandidate.value = null
    }

    const handleCandidateFormSuccess = () => {
      closeCandidateModal()
      // Refresh stats after adding/editing candidate
      fetchCandidateStats()
      // Refresh candidate list to show new candidate without page refresh
      if (candidateListRef.value && candidateListRef.value.fetchCandidates) {
        candidateListRef.value.fetchCandidates()
      }
    }

    // Interview modal handlers
    const handleAddInterview = () => {
      editingInterview.value = null
      showInterviewModal.value = true
    }

    const handleEditInterview = (interview) => {
      editingInterview.value = interview
      showInterviewModal.value = true
    }

    const closeInterviewModal = () => {
      showInterviewModal.value = false
      editingInterview.value = null
    }

    const handleInterviewFormSuccess = () => {
      closeInterviewModal()
      // Refresh stats after adding/editing interview
      fetchInterviewStats()
      // Refresh interview list to show new interview without page refresh
      if (interviewListRef.value && interviewListRef.value.fetchInterviews) {
        interviewListRef.value.fetchInterviews()
      }
    }

    // Offer modal handlers
    const handleAddOffer = () => {
      editingOffer.value = null
      showOfferModal.value = true
    }

    const handleEditOffer = (offer) => {
      editingOffer.value = offer
      showOfferModal.value = true
    }

    const closeOfferModal = () => {
      showOfferModal.value = false
      editingOffer.value = null
    }

    const handleOfferFormSuccess = () => {
      closeOfferModal()
      // Refresh stats after adding/editing offer
      fetchOfferStats()
      // Refresh offer list to show new offer without page refresh
      if (offerListRef.value && offerListRef.value.fetchOffers) {
        offerListRef.value.fetchOffers()
      }
    }

    // Job Requisition modal handlers
    const handleAddJobRequisition = () => {
      editingJobRequisition.value = null
      showJobRequisitionModal.value = true
    }

    const handleEditJobRequisition = (jobRequisition) => {
      editingJobRequisition.value = jobRequisition
      showJobRequisitionModal.value = true
    }

    const closeJobRequisitionModal = () => {
      showJobRequisitionModal.value = false
      editingJobRequisition.value = null
    }

    const handleJobRequisitionFormSuccess = () => {
      closeJobRequisitionModal()
      // Refresh stats after adding/editing job requisition
      fetchJobRequisitionStats()
      // Refresh job requisition list to show new job requisition without page refresh
      if (jobRequisitionListRef.value && jobRequisitionListRef.value.fetchJobRequisitions) {
        jobRequisitionListRef.value.fetchJobRequisitions()
      }
    }

    // Attendance modal handlers
    const handleAddAttendance = () => {
      editingAttendance.value = null
      showAttendanceModal.value = true
    }

    const handleEditAttendance = (attendance) => {
      editingAttendance.value = attendance
      showAttendanceModal.value = true
    }

    const closeAttendanceModal = () => {
      showAttendanceModal.value = false
      editingAttendance.value = null
    }

    const handleAttendanceFormSuccess = () => {
      closeAttendanceModal()
      // Optionally refresh attendance data in the widget
    }

    // Initialize
    onMounted(() => {
      fetchEmployeeStats()
      fetchJobRequisitionStats()
      fetchCandidateStats()
      fetchInterviewStats()
      fetchOfferStats()
    })

    // Computed properties
    const isEditingJobRequisition = computed(() => editingJobRequisition.value !== null);

    return {
      sidebarCollapsed,
      employeeStats,
      jobRequisitionStats,
      candidateStats,
      interviewStats,
      offerStats,
      showModal,
      editingEmployee,
      showCandidateModal,
      editingCandidate,
      showInterviewModal,
      editingInterview,
      showOfferModal,
      editingOffer,
      showJobRequisitionModal,
      editingJobRequisition,
      isEditingJobRequisition,
      showAttendanceModal,
      editingAttendance,
      employeeListRef,
      candidateListRef,
      interviewListRef,
      offerListRef,
      jobRequisitionListRef,
      handleSidebarToggle,
      fetchEmployeeStats,
      fetchJobRequisitionStats,
      fetchCandidateStats,
      fetchInterviewStats,
      fetchOfferStats,
      handleAddEmployee,
      handleEditEmployee,
      closeModal,
      handleFormSuccess,
      handleAddCandidate,
      handleEditCandidate,
      closeCandidateModal,
      handleCandidateFormSuccess,
      handleAddInterview,
      handleEditInterview,
      closeInterviewModal,
      handleInterviewFormSuccess,
      handleAddOffer,
      handleEditOffer,
      closeOfferModal,
      handleOfferFormSuccess,
      handleAddJobRequisition,
      handleEditJobRequisition,
      closeJobRequisitionModal,
      handleJobRequisitionFormSuccess,
      handleAddAttendance,
      handleEditAttendance,
      closeAttendanceModal,
      handleAttendanceFormSuccess
    }
  }
}
</script>

<style scoped>
.hr-dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.content-wrapper.sidebar-collapsed {
  margin-left: 70px;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
}

/* Statistics Section */
.stats-section {
  margin-bottom: 2rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  color: white;
}

.stat-icon.active {
  background: #10b981;
}

.stat-icon.inactive {
  background: #ef4444;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-details {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Modules Section - 2 Tables Per Row */
.modules-section {
  margin-bottom: 2rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.module-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.module-card.primary-module {
  border: 2px solid #667eea;
}

.module-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
}

.module-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  color: white;
  flex-shrink: 0;
}

.module-icon svg {
  width: 24px;
  height: 24px;
}

.module-info {
  flex: 1;
}

.module-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.module-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.module-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  line-height: 1;
}

.stat-text {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

.module-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.module-content {
  padding: 1.5rem;
  background: white;
  min-height: 300px;
}

/* Coming Soon Content */
.coming-soon-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
  color: #6b7280;
}

.coming-soon-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  opacity: 0.4;
  color: #9ca3af;
}

.coming-soon-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #4b5563;
}

.coming-soon-content p {
  font-size: 0.875rem;
  margin: 0;
  max-width: 250px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .content-wrapper,
  .content-wrapper.sidebar-collapsed {
    margin-left: 0;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .module-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .module-actions {
    align-self: stretch;
  }
  
  .action-btn {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .stat-content {
    justify-content: center;
  }
  
  .module-content {
    padding: 1rem;
  }
  
  .coming-soon-content {
    min-height: 150px;
  }
  
  .coming-soon-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
