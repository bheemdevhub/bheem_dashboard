<template>
  <div class="interview-content">
    <!-- Header -->
    <div class="interview-header">
      <button @click="$emit('back')" class="back-btn">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        Back to List
      </button>
      
      <div class="interview-title-section">
        <h2 class="interview-title">Onboarding Details</h2>
        <p class="interview-subtitle">{{ getCandidateName() }} - {{ getCompanyName() }}</p>
      </div>
      
      <button @click="$emit('edit', onboarding)" class="edit-btn">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z"/>
        </svg>
        Edit
      </button>
    </div>

    <!-- Content -->
    <div class="interview-body">
      <div class="interview-section">
        <!-- Candidate Information -->
        <div class="interview-info-card">
          <div class="interview-info-header">
            <div class="interview-avatar">
              {{ getCandidateInitials() }}
            </div>
            <div class="interview-info">
              <h3 class="candidate-name">{{ getCandidateName() }}</h3>
              <p class="candidate-email">{{ getCandidateEmail() }}</p>
            </div>
            <div class="overall-progress-large">
              <div class="progress-circle" :class="getProgressClass()">
                <svg class="progress-ring-large" width="60" height="60">
                  <circle
                    class="progress-ring-circle-large"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="transparent"
                    r="26"
                    cx="30"
                    cy="30"
                    :stroke-dasharray="163.4"
                    :stroke-dashoffset="163.4 - (163.4 * getOverallProgress()) / 100"
                  />
                </svg>
                <span class="progress-percentage">{{ getOverallProgress() }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Offer Information -->
        <div class="interview-details-card">
          <div class="card-header">
            <h4 class="card-title">
              <svg class="card-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Offer Information
            </h4>
          </div>
          <div class="card-content">
            <div class="detail-row">
              <span class="detail-label">Company:</span>
              <span class="detail-value">{{ getCompanyName() }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Offer Status:</span>
              <span class="status-badge" :class="getOfferStatusClass()">{{ getOfferStatus() }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Offer ID:</span>
              <span class="detail-value">{{ onboarding.offer_id || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- Document Checklist -->
        <div class="interview-details-card">
          <div class="card-header">
            <h4 class="card-title">
              <svg class="card-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
              </svg>
              Document Collection ({{ getDocumentProgress() }}%)
            </h4>
            <div class="progress-bar-header">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDocumentProgress() + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="checklist">
              <div class="checklist-item" :class="{ completed: onboarding.offer_letter_signed }">
                <div class="checkbox">
                  <svg v-if="onboarding.offer_letter_signed" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Offer Letter Signed</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.id_proof_submitted }">
                <div class="checkbox">
                  <svg v-if="onboarding.id_proof_submitted" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">ID Proof Submitted</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.educational_documents }">
                <div class="checkbox">
                  <svg v-if="onboarding.educational_documents" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Educational Documents</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.background_verification }">
                <div class="checkbox">
                  <svg v-if="onboarding.background_verification" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Background Verification</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.bank_account_details }">
                <div class="checkbox">
                  <svg v-if="onboarding.bank_account_details" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Bank Account Details</span>
              </div>
            </div>
          </div>
        </div>

        <!-- System Setup -->
        <div class="interview-details-card">
          <div class="card-header">
            <h4 class="card-title">
              <svg class="card-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm5 3a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
              </svg>
              System Setup ({{ getSystemProgress() }}%)
            </h4>
            <div class="progress-bar-header">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getSystemProgress() + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="checklist">
              <div class="checklist-item" :class="{ completed: onboarding.work_email_created }">
                <div class="checkbox">
                  <svg v-if="onboarding.work_email_created" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Work Email Created</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.system_allocation }">
                <div class="checkbox">
                  <svg v-if="onboarding.system_allocation" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">System Allocation</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.software_access_setup }">
                <div class="checkbox">
                  <svg v-if="onboarding.software_access_setup" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Software Access Setup</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.employee_id_created }">
                <div class="checkbox">
                  <svg v-if="onboarding.employee_id_created" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Employee ID Created</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Orientation & Training -->
        <div class="interview-details-card">
          <div class="card-header">
            <h4 class="card-title">
              <svg class="card-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              Orientation & Training ({{ getOrientationProgress() }}%)
            </h4>
            <div class="progress-bar-header">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getOrientationProgress() + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="checklist">
              <div class="checklist-item" :class="{ completed: onboarding.welcome_kit_given }">
                <div class="checkbox">
                  <svg v-if="onboarding.welcome_kit_given" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Welcome Kit Given</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.assigned_buddy }">
                <div class="checkbox">
                  <svg v-if="onboarding.assigned_buddy" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Assigned Buddy</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.first_day_orientation }">
                <div class="checkbox">
                  <svg v-if="onboarding.first_day_orientation" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">First Day Orientation</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.department_introduction }">
                <div class="checkbox">
                  <svg v-if="onboarding.department_introduction" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Department Introduction</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.hr_policy_acknowledgement }">
                <div class="checkbox">
                  <svg v-if="onboarding.hr_policy_acknowledgement" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">HR Policy Acknowledgement</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.training_plan_shared }">
                <div class="checkbox">
                  <svg v-if="onboarding.training_plan_shared" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Training Plan Shared</span>
              </div>
              <div class="checklist-item" :class="{ completed: onboarding.probation_period_set }">
                <div class="checkbox">
                  <svg v-if="onboarding.probation_period_set" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="checklist-label">Probation Period Set</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'OnboardingContent',
  props: {
    onboarding: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'edit', 'refresh'],
  setup(props) {
    // Access candidates, offers, and companies from parent via provide/inject pattern
    // For now, we'll create mock data - in real implementation you'd get this from parent
    const candidates = inject('candidates', [])
    const offers = inject('offers', [])
    const companies = inject('companies', [])

    const getCandidateName = () => {
      const candidate = candidates.find(c => c.id === props.onboarding.candidate_id)
      if (!candidate?.person) return 'Unknown Candidate'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'Unknown Candidate'
    }

    const getCandidateInitials = () => {
      const name = getCandidateName()
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const getCandidateEmail = () => {
      const candidate = candidates.find(c => c.id === props.onboarding.candidate_id)
      if (candidate?.person?.contacts && candidate.person.contacts.length > 0) {
        return candidate.person.contacts[0].email_primary || 'N/A'
      }
      return 'N/A'
    }

    const getCompanyName = () => {
      const company = companies.find(c => c.id === props.onboarding.company_id)
      if (company) {
        return `${company.company_name} (${company.company_code})`
      }
      return 'N/A'
    }

    const getOfferStatus = () => {
      const offer = offers.find(o => o.id === props.onboarding.offer_id)
      return offer?.offer_status || 'Unknown'
    }

    const getOfferStatusClass = () => {
      const status = getOfferStatus().toLowerCase()
      return status === 'accepted' ? 'accepted' : status === 'offered' ? 'offered' : 'unknown'
    }

    const getDocumentProgress = () => {
      const documentFields = [
        'offer_letter_signed',
        'id_proof_submitted',
        'educational_documents',
        'background_verification',
        'bank_account_details'
      ]
      const completed = documentFields.filter(field => props.onboarding[field]).length
      return Math.round((completed / documentFields.length) * 100)
    }

    const getSystemProgress = () => {
      const systemFields = [
        'work_email_created',
        'system_allocation',
        'software_access_setup',
        'employee_id_created'
      ]
      const completed = systemFields.filter(field => props.onboarding[field]).length
      return Math.round((completed / systemFields.length) * 100)
    }

    const getOrientationProgress = () => {
      const orientationFields = [
        'welcome_kit_given',
        'assigned_buddy',
        'first_day_orientation',
        'department_introduction',
        'hr_policy_acknowledgement',
        'training_plan_shared',
        'probation_period_set'
      ]
      const completed = orientationFields.filter(field => props.onboarding[field]).length
      return Math.round((completed / orientationFields.length) * 100)
    }

    const getOverallProgress = () => {
      const allFields = [
        'offer_letter_signed',
        'id_proof_submitted',
        'educational_documents',
        'background_verification',
        'bank_account_details',
        'work_email_created',
        'system_allocation',
        'software_access_setup',
        'welcome_kit_given',
        'assigned_buddy',
        'first_day_orientation',
        'department_introduction',
        'hr_policy_acknowledgement',
        'training_plan_shared',
        'probation_period_set',
        'employee_id_created'
      ]
      const completed = allFields.filter(field => props.onboarding[field]).length
      return Math.round((completed / allFields.length) * 100)
    }

    const getProgressClass = () => {
      const progress = getOverallProgress()
      if (progress === 100) return 'complete'
      if (progress >= 75) return 'high'
      if (progress >= 50) return 'medium'
      if (progress >= 25) return 'low'
      return 'start'
    }

    return {
      getCandidateName,
      getCandidateInitials,
      getCandidateEmail,
      getCompanyName,
      getOfferStatus,
      getOfferStatusClass,
      getDocumentProgress,
      getSystemProgress,
      getOrientationProgress,
      getOverallProgress,
      getProgressClass
    }
  }
}
</script>

<style scoped>
/* Import the interview content styles */
.interview-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 20;
  display: flex;
  flex-direction: column;
}

.interview-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f8f9fa;
  gap: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #4b5563;
}

.back-btn svg {
  width: 1rem;
  height: 1rem;
}

.interview-title-section {
  flex: 1;
}

.interview-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.interview-subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: #2563eb;
}

.edit-btn svg {
  width: 1rem;
  height: 1rem;
}

.interview-body {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.interview-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 4xl;
  margin: 0 auto;
}

.interview-info-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}

.interview-info-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  gap: 1rem;
}

.interview-avatar {
  width: 4rem;
  height: 4rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.interview-info {
  flex: 1;
  min-width: 0;
}

.candidate-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.candidate-email {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

.overall-progress-large {
  position: relative;
}

.progress-circle {
  position: relative;
  display: inline-block;
}

.progress-ring-large {
  transform: rotate(-90deg);
}

.progress-ring-circle-large {
  transition: stroke-dashoffset 0.5s ease;
}

.progress-circle.complete .progress-ring-circle-large {
  stroke: #10b981;
}

.progress-circle.high .progress-ring-circle-large {
  stroke: #06b6d4;
}

.progress-circle.medium .progress-ring-circle-large {
  stroke: #f59e0b;
}

.progress-circle.low .progress-ring-circle-large {
  stroke: #ef4444;
}

.progress-circle.start .progress-ring-circle-large {
  stroke: #9ca3af;
}

.progress-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.interview-details-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.card-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.progress-bar-header {
  display: flex;
  align-items: center;
  min-width: 100px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1e40af);
  transition: width 0.3s ease;
}

.card-content {
  padding: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 500;
  color: #6b7280;
}

.detail-value {
  color: #1f2937;
  font-weight: 500;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.accepted {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.offered {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.unknown {
  background: #f3f4f6;
  color: #6b7280;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.checklist-item.completed {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.checkbox {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.checklist-item.completed .checkbox {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.checkbox svg {
  width: 1rem;
  height: 1rem;
}

.checklist-label {
  color: #374151;
  font-weight: 500;
}

.checklist-item.completed .checklist-label {
  color: #065f46;
}

/* Responsive Design */
@media (max-width: 768px) {
  .interview-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .interview-info-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }
}
</style>
