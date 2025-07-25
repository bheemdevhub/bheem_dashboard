<template>
  <div class="candidate-content">
    <!-- Edit Button -->
    <div class="content-header">
      <button @click="handleEdit" class="edit-btn">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Edit Candidate
      </button>
    </div>

    <!-- Candidate Information Table -->
    <div class="candidate-table">
      <table class="info-table">
        <tbody>
          <tr>
            <td class="info-cell">
              <span class="info-label">Name</span>
              <div class="info-value name-value">
                <div class="candidate-avatar">{{ getInitials(candidate) }}</div>
                <span>{{ getFullName(candidate) }}</span>
              </div>
            </td>
            <td class="info-cell">
              <span class="info-label">Status</span>
              <div class="info-value">
                <span class="status-badge" :class="candidate.status?.toLowerCase()">
                  {{ candidate.status || 'N/A' }}
                </span>
              </div>
            </td>
            <td class="info-cell">
              <span class="info-label">Application Date</span>
              <div class="info-value">{{ formatDate(candidate.application_date) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Email</span>
              <div class="info-value">{{ getEmail(candidate) }}</div>
            </td>
          </tr>
          <tr>
            <td class="info-cell">
              <span class="info-label">Mobile</span>
              <div class="info-value">{{ getMobile(candidate) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Skills Match</span>
              <div class="info-value">{{ candidate.skills_matched || 0 }}%</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Notice Period</span>
              <div class="info-value">{{ candidate.notice_period || 'N/A' }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Interview Availability</span>
              <div class="info-value">{{ formatDate(candidate.interview_availability) }}</div>
            </td>
          </tr>
          <tr>
            <td class="info-cell">
              <span class="info-label">Personal Email</span>
              <div class="info-value">{{ getPersonalEmail(candidate) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Gender</span>
              <div class="info-value">{{ candidate.person?.gender || 'N/A' }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Date of Birth</span>
              <div class="info-value">{{ formatDate(candidate.person?.date_of_birth) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Blood Group</span>
              <div class="info-value">{{ getBloodGroup(candidate) }}</div>
            </td>
          </tr>
          <tr>
            <td class="info-cell">
              <span class="info-label">Address</span>
              <div class="info-value">{{ getAddress(candidate) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Emergency Contact</span>
              <div class="info-value">{{ getEmergencyContact(candidate) }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Nationality</span>
              <div class="info-value">{{ candidate.person?.nationality || 'N/A' }}</div>
            </td>
            <td class="info-cell">
              <span class="info-label">Marital Status</span>
              <div class="info-value">{{ candidate.person?.marital_status || 'N/A' }}</div>
            </td>
          </tr>
          <tr>
            <td class="info-cell">
              <span class="info-label">Offer Letter Signed</span>
              <div class="info-value">
                <span class="status-badge" :class="candidate.offer_letter_signed ? 'signed' : 'pending'">
                  {{ candidate.offer_letter_signed ? 'Yes' : 'No' }}
                </span>
              </div>
            </td>
            <td class="info-cell">
              <span class="info-label">ID Proof Submitted</span>
              <div class="info-value">
                <span class="status-badge" :class="candidate.id_proof_submitted ? 'submitted' : 'pending'">
                  {{ candidate.id_proof_submitted ? 'Yes' : 'No' }}
                </span>
              </div>
            </td>
            <td class="info-cell">
              <span class="info-label">Educational Documents</span>
              <div class="info-value">
                <span class="status-badge" :class="candidate.educational_documents ? 'submitted' : 'pending'">
                  {{ candidate.educational_documents ? 'Yes' : 'No' }}
                </span>
              </div>
            </td>
            <td class="info-cell">
              <span class="info-label">Resume</span>
              <div class="info-value">
                <a v-if="candidate.resume?.file_url" :href="candidate.resume.file_url" target="_blank" class="resume-link">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="resume-icon">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                  </svg>
                  View Resume
                </a>
                <span v-else>Not uploaded</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tabs for additional information -->
    <div class="tabs-container info-cell">
      <div class="tabs-header">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
        >
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path :d="tab.icon" />
          </svg>
          {{ tab.name }}
        </button>
      </div>
      
      <div class="tab-content">
        <!-- Interview Tab -->
        <div v-if="activeTab === 'interview'" class="tab-pane">
          <div class="interview-info">
            <div class="interview-item">
              <span class="interview-label">Availability</span>
              <span class="interview-value">{{ formatDate(candidate.interview_availability) }}</span>
            </div>
            <div class="interview-item">
              <span class="interview-label">Skills Matched</span>
              <span class="interview-value">{{ candidate.skills_matched || 0 }}%</span>
            </div>
            <div class="interview-item">
              <span class="interview-label">Recruiter Assigned</span>
              <span class="interview-value">{{ candidate.recruiter_assigned || 'Not assigned' }}</span>
            </div>
          </div>
        </div>

        <!-- Documents Tab -->
        <div v-if="activeTab === 'documents'" class="tab-pane">
          <div class="documents-info">
            <div class="document-section">
              <h5>Identity Documents</h5>
              <div v-if="candidate.person?.passports?.length">
                <div v-for="passport in candidate.person.passports" :key="passport.id" class="document-item">
                  <div class="document-field">
                    <span class="document-label">Passport Number:</span>
                    <span class="document-value">{{ passport.passport_number }}</span>
                  </div>
                  <div class="document-field">
                    <span class="document-label">Expiry Date:</span>
                    <span class="document-value">{{ formatDate(passport.expiry_date) }}</span>
                  </div>
                  <div class="document-field">
                    <span class="document-label">Country of Issue:</span>
                    <span class="document-value">{{ passport.country_of_issue }}</span>
                  </div>
                  <div class="document-field">
                    <span class="document-label">Primary:</span>
                    <span class="document-value">{{ passport.is_primary ? 'Yes' : 'No' }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="no-documents">No passport information available</div>
            </div>

            <div class="document-section">
              <h5>Resume & Educational Documents</h5>
              <div class="document-item">
                <div class="document-field">
                  <span class="document-label">Resume:</span>
                  <span class="document-value">
                    <a v-if="candidate.resume?.file_url" :href="candidate.resume.file_url" target="_blank" class="resume-link">
                      {{ candidate.resume.filename || 'View Resume' }}
                    </a>
                    <span v-else>Not uploaded</span>
                  </span>
                </div>
                <div class="document-field">
                  <span class="document-label">Educational Documents:</span>
                  <span class="document-value status-badge" :class="candidate.educational_documents ? 'submitted' : 'pending'">
                    {{ candidate.educational_documents ? 'Submitted' : 'Pending' }}
                  </span>
                </div>
                <div class="document-field">
                  <span class="document-label">ID Proof:</span>
                  <span class="document-value status-badge" :class="candidate.id_proof_submitted ? 'submitted' : 'pending'">
                    {{ candidate.id_proof_submitted ? 'Submitted' : 'Pending' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Profiles Tab -->
        <div v-if="activeTab === 'social'" class="tab-pane">
          <div v-if="candidate.person?.social_profiles?.length" class="social-info">
            <div v-for="profile in candidate.person.social_profiles" :key="profile.id" class="social-item">
              <div class="social-field" v-if="profile.linkedin_profile">
                <span class="social-label">LinkedIn:</span>
                <a :href="profile.linkedin_profile" target="_blank" class="social-link">
                  {{ profile.linkedin_profile }}
                </a>
              </div>
              <div class="social-field" v-if="profile.website">
                <span class="social-label">Website:</span>
                <a :href="profile.website" target="_blank" class="social-link">
                  {{ profile.website }}
                </a>
              </div>
              <div class="social-field" v-if="profile.profile_image_url">
                <span class="social-label">Profile Image:</span>
                <a :href="profile.profile_image_url" target="_blank" class="social-link">
                  View Image
                </a>
              </div>
            </div>
          </div>
          <div v-else class="coming-soon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            <h4>No Social Profiles</h4>
            <p>No social profile information available for this candidate.</p>
          </div>
        </div>

        <!-- History Tab -->
        <div v-if="activeTab === 'history'" class="tab-pane">
          <div class="coming-soon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <h4>Application History</h4>
            <p>Feature coming soon - Track candidate application timeline and interactions.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'CandidateContent',
  props: {
    candidate: {
      type: Object,
      required: true
    }
  },
  emits: ['refresh', 'edit'],
  setup(props, { emit }) {
    // Reactive data
    const activeTab = ref('interview')
    
    // Tab configuration
    const tabs = [
      {
        id: 'interview',
        name: 'Interview',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      {
        id: 'documents',
        name: 'Documents',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      },
      {
        id: 'social',
        name: 'Social Profiles',
        icon: 'M12.017 11.986a2.5 2.5 0 00-3.534 3.534l6.5 6.5a2.5 2.5 0 003.534-3.534l-6.5-6.5zM15.5 7.5a2.5 2.5 0 00-3.534 3.534l1.786 1.786a2.5 2.5 0 003.534-3.534L15.5 7.5z'
      },
      {
        id: 'history',
        name: 'History',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      }
    ]
    
    // Methods
    const getFullName = (candidate) => {
      if (!candidate?.person) return 'N/A'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'N/A'
    }
    
    const getInitials = (candidate) => {
      const name = getFullName(candidate)
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    
    const getEmail = (candidate) => {
      if (!candidate?.person) return 'N/A'
      if (Array.isArray(candidate.person.contacts) && candidate.person.contacts.length > 0) {
        return candidate.person.contacts[0].email_primary || 'N/A'
      }
      return 'N/A'
    }
    
    const getAddress = (candidate) => {
      if (!candidate?.person) return 'N/A'
      if (Array.isArray(candidate.person.addresses) && candidate.person.addresses.length > 0) {
        const addr = candidate.person.addresses[0]
        return `${addr.line1 || ''} ${addr.line2 || ''}`.trim() || 'N/A'
      }
      return 'N/A'
    }
    
    const getMobile = (candidate) => {
      if (!candidate?.person) return 'N/A'
      if (Array.isArray(candidate.person.contacts) && candidate.person.contacts.length > 0) {
        return candidate.person.contacts[0].phone_mobile || 'N/A'
      }
      return 'N/A'
    }
    
    const getPersonalEmail = (candidate) => {
      if (!candidate?.person) return 'N/A'
      if (Array.isArray(candidate.person.contacts) && candidate.person.contacts.length > 0) {
        return candidate.person.contacts[0].email_secondary || 'N/A'
      }
      return 'N/A'
    }
    
    const getBloodGroup = (candidate) => {
      return candidate?.person?.blood_group || 'N/A'
    }
    
    const getEmergencyContact = (candidate) => {
      if (Array.isArray(candidate?.person?.contacts) && candidate.person.contacts.length > 0) {
        const contact = candidate.person.contacts[0]
        if (contact.emergency_contact_name) {
          return `${contact.emergency_contact_name} (${contact.emergency_contact_phone || 'No phone'})`
        }
      }
      return 'N/A'
    }
    
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('en-GB')
    }
    
    const handleEdit = () => {
      emit('edit', props.candidate)
    }
    
    // Initialize
    onMounted(() => {
      // Any initialization logic
    })
    
    return {
      // Data
      activeTab,
      tabs,
      
      // Methods
      getFullName,
      getInitials,
      getEmail,
      getAddress,
      getMobile,
      getPersonalEmail,
      getBloodGroup,
      getEmergencyContact,
      formatDate,
      handleEdit
    }
  }
}
</script>

<style scoped>
.candidate-content {
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

.candidate-table {
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

.candidate-avatar {
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

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.applied {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.screening {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.interview {
  background: #e0e7ff;
  color: #5b21b6;
}

.status-badge.offer {
  background: #dcfce7;
  color: #166534;
}

.status-badge.hired {
  background: #dcfce7;
  color: #166534;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.signed,
.status-badge.submitted {
  background: #dcfce7;
  color: #166534;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.resume-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.resume-link:hover {
  color: #2563eb;
}

.resume-icon {
  width: 1rem;
  height: 1rem;
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

.interview-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.interview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.interview-label {
  font-weight: 600;
  color: #374151;
}

.interview-value {
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

.no-documents {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-style: italic;
}

.social-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.social-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.social-field:last-child {
  margin-bottom: 0;
}

.social-label {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.875rem;
}

.social-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.social-link:hover {
  color: #2563eb;
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
  
  .candidate-avatar {
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
  
  .interview-info {
    grid-template-columns: 1fr;
  }
  
  .document-field,
  .social-field {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
