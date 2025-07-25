<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="header-text">
            <h2>{{ isEdit ? 'Edit Candidate' : 'Add New Candidate' }}</h2>
            <p>{{ isEdit ? 'Update candidate information' : 'Create a new candidate record' }}</p>
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
        <form @submit.prevent="handleSubmit" class="candidate-form">
          <!-- Personal Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <h3>Personal Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Title</label>
                <select 
                  v-model="formData.title" 
                  class="form-input"
                >
                  <option value="">Select Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label required">First Name</label>
                <input 
                  v-model="formData.first_name" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.first_name }"
                  placeholder="Enter first name"
                  required 
                />
                <span v-if="errors.first_name" class="error-text">{{ errors.first_name }}</span>
              </div>
              
              <div class="form-group">
                <label class="form-label">Middle Name</label>
                <input 
                  v-model="formData.middle_name" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter middle name (optional)"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label required">Last Name</label>
                <input 
                  v-model="formData.last_name" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.last_name }"
                  placeholder="Enter last name"
                  required 
                />
                <span v-if="errors.last_name" class="error-text">{{ errors.last_name }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Suffix</label>
                <input 
                  v-model="formData.suffix" 
                  type="text" 
                  class="form-input"
                  placeholder="Jr., Sr., III, etc."
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Preferred Name</label>
                <input 
                  v-model="formData.preferred_name" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter preferred name"
                />
              </div>

              <div class="form-group">
                <label class="form-label required">Date of Birth</label>
                <input 
                  v-model="formData.date_of_birth" 
                  type="date" 
                  class="form-input"
                  :class="{ 'error': errors.date_of_birth }"
                  required 
                />
                <span v-if="errors.date_of_birth" class="error-text">{{ errors.date_of_birth }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Gender</label>
                <select 
                  v-model="formData.gender" 
                  class="form-input"
                  :class="{ 'error': errors.gender }"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                <span v-if="errors.gender" class="error-text">{{ errors.gender }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Marital Status</label>
                <select 
                  v-model="formData.marital_status" 
                  class="form-input"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Nationality</label>
                <input 
                  v-model="formData.nationality" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter nationality"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Blood Group</label>
                <select 
                  v-model="formData.blood_group" 
                  class="form-input"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <h3>Contact Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label required">Primary Email</label>
                <input 
                  v-model="contactData.email_primary" 
                  type="email" 
                  class="form-input"
                  :class="{ 'error': errors.email_primary }"
                  placeholder="Enter primary email"
                  required 
                />
                <span v-if="errors.email_primary" class="error-text">{{ errors.email_primary }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Secondary Email</label>
                <input 
                  v-model="contactData.email_secondary" 
                  type="email" 
                  class="form-input"
                  placeholder="Enter secondary email"
                />
              </div>

              <div class="form-group">
                <label class="form-label required">Mobile Phone</label>
                <input 
                  v-model="contactData.phone_mobile" 
                  type="tel" 
                  class="form-input"
                  :class="{ 'error': errors.phone_mobile }"
                  placeholder="Enter mobile number"
                  required 
                />
                <span v-if="errors.phone_mobile" class="error-text">{{ errors.phone_mobile }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Primary Phone</label>
                <input 
                  v-model="contactData.phone_primary" 
                  type="tel" 
                  class="form-input"
                  placeholder="Enter primary phone"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Secondary Phone</label>
                <input 
                  v-model="contactData.phone_secondary" 
                  type="tel" 
                  class="form-input"
                  placeholder="Enter secondary phone"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Work Phone</label>
                <input 
                  v-model="contactData.phone_work" 
                  type="tel" 
                  class="form-input"
                  placeholder="Enter work phone"
                />
              </div>

              <div class="form-group">
                <label class="form-label required">Emergency Contact Name</label>
                <input 
                  v-model="contactData.emergency_contact_name" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.emergency_contact_name }"
                  placeholder="Enter emergency contact name"
                  required 
                />
                <span v-if="errors.emergency_contact_name" class="error-text">{{ errors.emergency_contact_name }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Emergency Contact Phone</label>
                <input 
                  v-model="contactData.emergency_contact_phone" 
                  type="tel" 
                  class="form-input"
                  :class="{ 'error': errors.emergency_contact_phone }"
                  placeholder="Enter emergency contact phone"
                  required 
                />
                <span v-if="errors.emergency_contact_phone" class="error-text">{{ errors.emergency_contact_phone }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Emergency Contact Relationship</label>
                <input 
                  v-model="contactData.emergency_contact_relationship" 
                  type="text" 
                  class="form-input"
                  placeholder="e.g., Parent, Spouse, Sibling"
                />
              </div>
            </div>
          </div>

          <!-- Address Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <h3>Address Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group span-2">
                <label class="form-label required">Address Line 1</label>
                <input 
                  v-model="addressData.line1" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.line1 }"
                  placeholder="Enter street address"
                  required 
                />
                <span v-if="errors.line1" class="error-text">{{ errors.line1 }}</span>
              </div>

              <div class="form-group span-2">
                <label class="form-label">Address Line 2</label>
                <input 
                  v-model="addressData.line2" 
                  type="text" 
                  class="form-input"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div class="form-group">
                <label class="form-label required">City</label>
                <input 
                  v-model="addressData.city" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.city }"
                  placeholder="Enter city"
                  required 
                />
                <span v-if="errors.city" class="error-text">{{ errors.city }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">State</label>
                <input 
                  v-model="addressData.state" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.state }"
                  placeholder="Enter state"
                  required 
                />
                <span v-if="errors.state" class="error-text">{{ errors.state }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Postal Code</label>
                <input 
                  v-model="addressData.postal_code" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.postal_code }"
                  placeholder="Enter postal code"
                  required 
                />
                <span v-if="errors.postal_code" class="error-text">{{ errors.postal_code }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Country</label>
                <input 
                  v-model="addressData.country" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.country }"
                  placeholder="Enter country"
                  required 
                />
                <span v-if="errors.country" class="error-text">{{ errors.country }}</span>
              </div>
            </div>
          </div>

          <!-- Passport Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
              </svg>
              <h3>Passport Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Passport Number</label>
                <input 
                  v-model="passportData.passport_number" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter passport number"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Expiry Date</label>
                <input 
                  v-model="passportData.expiry_date" 
                  type="date" 
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Country of Issue</label>
                <input 
                  v-model="passportData.country_of_issue" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter issuing country"
                />
              </div>

              <div class="form-group">
                <label class="form-label">
                  <input 
                    v-model="passportData.is_primary" 
                    type="checkbox" 
                    class="form-checkbox"
                  />
                  Primary Passport
                </label>
              </div>
            </div>
          </div>

          <!-- Social Profiles Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
              </svg>
              <h3>Social Profiles</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">LinkedIn Profile</label>
                <input 
                  v-model="socialProfileData.linkedin_profile" 
                  type="url" 
                  class="form-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Website</label>
                <input 
                  v-model="socialProfileData.website" 
                  type="url" 
                  class="form-input"
                  placeholder="https://www.yourwebsite.com"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Profile Image URL</label>
                <input 
                  v-model="socialProfileData.profile_image_url" 
                  type="url" 
                  class="form-input"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
            </div>
          </div>

          <!-- Candidate Specific Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>Candidate Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label required">Application Date</label>
                <input 
                  v-model="candidateData.application_date" 
                  type="date" 
                  class="form-input"
                  :class="{ 'error': errors.application_date }"
                  required 
                />
                <span v-if="errors.application_date" class="error-text">{{ errors.application_date }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Notice Period</label>
                <input 
                  v-model="candidateData.notice_period" 
                  type="text" 
                  class="form-input"
                  placeholder="e.g., 30 days, 2 weeks"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Interview Availability</label>
                <input 
                  v-model="candidateData.interview_availability" 
                  type="date" 
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Skills Matched (%)</label>
                <input 
                  v-model.number="candidateData.skills_matched" 
                  type="number" 
                  class="form-input"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="0.0"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Recruiter Assigned</label>
                <input 
                  v-model="candidateData.recruiter_assigned" 
                  type="text" 
                  class="form-input"
                  placeholder="Recruiter ID/Name"
                />
              </div>

              <div class="form-group">
                <label class="form-label required">Status</label>
                <select 
                  v-model="candidateData.status" 
                  class="form-input"
                  :class="{ 'error': errors.status }"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Hired">Hired</option>
                </select>
                <span v-if="errors.status" class="error-text">{{ errors.status }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">
                  <input 
                    v-model="candidateData.offer_letter_signed" 
                    type="checkbox" 
                    class="form-checkbox"
                  />
                  Offer Letter Signed
                </label>
              </div>

              <div class="form-group">
                <label class="form-label">
                  <input 
                    v-model="candidateData.id_proof_submitted" 
                    type="checkbox" 
                    class="form-checkbox"
                  />
                  ID Proof Submitted
                </label>
              </div>

              <div class="form-group">
                <label class="form-label">
                  <input 
                    v-model="candidateData.educational_documents" 
                    type="checkbox" 
                    class="form-checkbox"
                  />
                  Educational Documents Submitted
                </label>
              </div>

              <div class="form-group">
                <label class="form-label required">Company</label>
                <select 
                  v-model="formData.company_id" 
                  class="form-input"
                  :class="{ 'error': errors.company_id }"
                  :disabled="isLoadingCompanies"
                  required
                >
                  <option value="">{{ isLoadingCompanies ? 'Loading companies...' : 'Select Company' }}</option>
                  <option v-for="company in companies" :key="company.id" :value="company.id">
                    {{ company.company_name }}
                  </option>
                </select>
                <span v-if="errors.company_id" class="error-text">{{ errors.company_id }}</span>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <svg v-if="loading" class="animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
                <polyline points="17,21 17,13 7,13 7,21"></polyline>
                <polyline points="7,3 7,8 15,8"></polyline>
              </svg>
              {{ loading ? 'Saving...' : (isEdit ? 'Update Candidate' : 'Add Candidate') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'AddCandidate',
  props: {
    isVisible: { type: Boolean, default: false },
    candidate: { type: Object, default: null }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    const loading = ref(false)
    const errors = ref({})
    const companies = ref([])
    const isLoadingCompanies = ref(false)

    // Form data for person information
    const formData = reactive({
      first_name: '',
      middle_name: '',
      last_name: '',
      preferred_name: '',
      title: '',
      suffix: '',
      date_of_birth: '',
      gender: '',
      marital_status: '',
      nationality: '',
      blood_group: '',
      is_active: true,
      company_id: '',
      person_type: 'candidate'
    })

    const contactData = reactive({
      email_primary: '',
      email_secondary: '',
      phone_primary: '',
      phone_secondary: '',
      phone_mobile: '',
      phone_work: '',
      is_active: true,
      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_relationship: ''
    })

    const addressData = reactive({
      address_type: 'PRIMARY',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      entity_type: 'candidate',
      is_active: true
    })

    const passportData = reactive({
      passport_number: '',
      expiry_date: '',
      country_of_issue: '',
      is_primary: false
    })

    const socialProfileData = reactive({
      linkedin_profile: '',
      website: '',
      profile_image_url: ''
    })

    // Candidate specific data
    const candidateData = reactive({
      applied_position_id: null,
      application_date: '',
      notice_period: '',
      interview_availability: '',
      skills_matched: 0.0,
      recruiter_assigned: '',
      offer_letter_signed: false,
      id_proof_submitted: false,
      educational_documents: false,
      status: 'Applied',
      resume: null
    })

    const isEdit = computed(() => !!props.candidate)

    // Watch for candidate data to populate form
    watch(() => props.candidate, (newCandidate) => {
      if (newCandidate) {
        // Populate person data
        if (newCandidate.person) {
          Object.keys(formData).forEach(key => {
            if (newCandidate.person[key] !== undefined) {
              formData[key] = newCandidate.person[key]
            }
          })

          // Populate contact data
          if (newCandidate.person.contacts && newCandidate.person.contacts.length > 0) {
            const contact = newCandidate.person.contacts[0]
            Object.keys(contactData).forEach(key => {
              if (contact[key] !== undefined) {
                contactData[key] = contact[key]
              }
            })
          }

          // Populate address data
          if (newCandidate.person.addresses && newCandidate.person.addresses.length > 0) {
            const address = newCandidate.person.addresses[0]
            Object.keys(addressData).forEach(key => {
              if (address[key] !== undefined) {
                addressData[key] = address[key]
              }
            })
          }

          // Populate passport data
          if (newCandidate.person.passports && newCandidate.person.passports.length > 0) {
            const passport = newCandidate.person.passports[0]
            Object.keys(passportData).forEach(key => {
              if (passport[key] !== undefined) {
                passportData[key] = passport[key]
              }
            })
          }

          // Populate social profile data
          if (newCandidate.person.social_profiles && newCandidate.person.social_profiles.length > 0) {
            const profile = newCandidate.person.social_profiles[0]
            Object.keys(socialProfileData).forEach(key => {
              if (profile[key] !== undefined) {
                socialProfileData[key] = profile[key]
              }
            })
          }
        }

        // Populate candidate specific data
        Object.keys(candidateData).forEach(key => {
          if (newCandidate[key] !== undefined) {
            candidateData[key] = newCandidate[key]
          }
        })
      }
    }, { immediate: true })

    // Methods
    const loadCompanies = async () => {
      isLoadingCompanies.value = true
      try {
        const companiesResponse = await HRApiService.getCompanies()
        if (companiesResponse.success) {
          companies.value = companiesResponse.data.filter(company => company.is_active)
        } else {
          console.warn('Failed to load companies:', companiesResponse.error)
          toast.warning('Failed to load company list. Please check your connection and try again.', {
            timeout: 3000,
            icon: '⚠️'
          })
        }
      } catch (error) {
        console.error('Error loading companies:', error)
        toast.error('Error loading companies. Please try again.', {
          timeout: 3000,
          icon: '❌'
        })
      } finally {
        isLoadingCompanies.value = false
      }
    }

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      // Validate required person fields
      const requiredPersonFields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'company_id']
      requiredPersonFields.forEach(field => {
        if (!formData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Validate required contact fields
      const requiredContactFields = [
        'email_primary', 'phone_mobile', 'emergency_contact_name', 'emergency_contact_phone'
      ]
      requiredContactFields.forEach(field => {
        if (!contactData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Validate required address fields
      const requiredAddressFields = ['line1', 'city', 'state', 'postal_code', 'country']
      requiredAddressFields.forEach(field => {
        if (!addressData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Validate required candidate fields
      const requiredCandidateFields = ['application_date', 'status']
      requiredCandidateFields.forEach(field => {
        if (!candidateData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (contactData.email_primary && !emailRegex.test(contactData.email_primary)) {
        errors.value.email_primary = 'Please enter a valid email address'
        isValid = false
      }

      // Validate phone format
      const phoneRegex = /^[0-9+\-\s()]+$/
      if (contactData.phone_mobile && !phoneRegex.test(contactData.phone_mobile)) {
        errors.value.phone_mobile = 'Please enter a valid phone number'
        isValid = false
      }

      return isValid
    }

    const prepareSubmissionData = () => {
      // Prepare contacts array
      const contacts = [{
        ...contactData,
        is_active: true
      }]

      // Prepare addresses array
      const addresses = [{
        ...addressData,
        entity_type: 'candidate'
      }]

      // Prepare passports array - include even if empty to match API structure
      const passports = []
      if (passportData.passport_number && passportData.expiry_date && passportData.country_of_issue) {
        passports.push({
          passport_number: passportData.passport_number || '',
          expiry_date: passportData.expiry_date || '',
          country_of_issue: passportData.country_of_issue || '',
          is_primary: passportData.is_primary !== undefined ? passportData.is_primary : false
        })
      }

      // Prepare social profiles array
      const social_profiles = []
      if (socialProfileData.linkedin_profile || socialProfileData.website || socialProfileData.profile_image_url) {
        social_profiles.push({
          linkedin_profile: socialProfileData.linkedin_profile || '',
          website: socialProfileData.website || '',
          profile_image_url: socialProfileData.profile_image_url || ''
        })
      }

      // Prepare person data
      const personData = {
        ...formData,
        contacts,
        addresses,
        bank_accounts: [], // Empty for candidates
        passports,
        social_profiles
      }

      // Prepare final candidate data structure
      const data = {
        person: personData,
        ...candidateData
      }

      // Clean up empty string values that should be null
      Object.keys(data.person).forEach(key => {
        if (data.person[key] === '' && ['middle_name', 'preferred_name', 'title', 'suffix', 'blood_group'].includes(key)) {
          data.person[key] = data.person[key] || null
        }
      })

      return data
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        // Show specific errors
        const errorFields = Object.keys(errors.value)
        if (errorFields.length > 0) {
          const firstError = errors.value[errorFields[0]]
          toast.warning(`Please fix the following: ${firstError}`, {
            timeout: 4000,
            icon: '⚠️'
          })
        } else {
          toast.warning('Please fill in all required fields', {
            timeout: 3000,
            icon: '⚠️'
          })
        }
        return
      }

      loading.value = true

      try {
        const data = prepareSubmissionData()
        console.log('Prepared data for submission:', data)
        
        let result

        if (isEdit.value) {
          console.log('Editing candidate with ID:', props.candidate.id)
          console.log('Update payload:', JSON.stringify(data, null, 2))
          result = await HRApiService.updateCandidate(props.candidate.id, data)
        } else {
          console.log('Creating new candidate')
          console.log('Create payload:', JSON.stringify(data, null, 2))
          result = await HRApiService.createCandidate(data)
        }

        console.log('API result:', result)

        if (result.success) {
          const candidateName = `${formData.first_name} ${formData.last_name}`
          const actionText = isEdit.value ? 'updated' : 'created'
          
          toast.success(`Candidate "${candidateName}" has been ${actionText} successfully!`, {
            timeout: 4000,
            icon: '✅'
          })

          // Emit success with candidate data for real-time updates
          emit('success', result.data)
          closeModal()
        } else {
          // Handle API service error response
          const actionText = isEdit.value ? 'update' : 'create'
          let errorMessage = 'Unknown error occurred'
          
          if (result.error && typeof result.error === 'string') {
            errorMessage = result.error
          } else if (result.error && typeof result.error === 'object') {
            errorMessage = JSON.stringify(result.error)
          }

          // Improve error messages for common issues
          if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
            errorMessage = 'A candidate with this information already exists'
          } else if (errorMessage.includes('required')) {
            errorMessage = 'Please fill in all required fields'
          } else if (errorMessage.includes('invalid')) {
            errorMessage = 'Please check the information and try again'
          } else if (errorMessage.includes('HTTP 400')) {
            errorMessage = 'Invalid data provided. Please check all fields and try again'
          } else if (errorMessage.includes('HTTP 500')) {
            errorMessage = 'Server error. Please try again later'
          }
          
          toast.error(`Failed to ${actionText} candidate: ${errorMessage}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving candidate:', error)
        const actionText = isEdit.value ? 'update' : 'create'
        
        // Parse error message for better user feedback
        let errorMessage = 'Unknown error occurred'
        
        if (error && typeof error.message === 'string') {
          errorMessage = error.message
        } else if (error && typeof error === 'string') {
          errorMessage = error
        } else if (error && typeof error === 'object') {
          if (error.message && typeof error.message === 'string') {
            errorMessage = error.message
          } else if (error.error && typeof error.error === 'string') {
            errorMessage = error.error
          } else {
            // Convert object to readable string
            try {
              errorMessage = JSON.stringify(error)
            } catch (e) {
              errorMessage = 'Complex error occurred'
            }
          }
        }
        
        // Improve error messages for common issues
        if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
          errorMessage = 'A candidate with this information already exists'
        } else if (errorMessage.includes('required')) {
          errorMessage = 'Please fill in all required fields'
        } else if (errorMessage.includes('invalid')) {
          errorMessage = 'Please check the information and try again'
        } else if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again'
        } else if (errorMessage.includes('500')) {
          errorMessage = 'Server error. Please try again later'
        } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
          errorMessage = 'Authentication error. Please log in again'
        }
        
        toast.error(`Failed to ${actionText} candidate: ${errorMessage}`, {
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
        if (typeof formData[key] === 'string') {
          formData[key] = key === 'person_type' ? 'candidate' : ''
        } else if (typeof formData[key] === 'boolean') {
          formData[key] = key === 'is_active'
        } else {
          formData[key] = ''
        }
      })

      Object.keys(contactData).forEach(key => {
        contactData[key] = ''
      })

      Object.keys(addressData).forEach(key => {
        addressData[key] = key === 'address_type' ? 'PRIMARY' : key === 'entity_type' ? 'candidate' : key === 'is_active' ? true : ''
      })

      Object.keys(passportData).forEach(key => {
        passportData[key] = key === 'is_primary' ? false : ''
      })

      Object.keys(socialProfileData).forEach(key => {
        socialProfileData[key] = ''
      })

      Object.keys(candidateData).forEach(key => {
        if (typeof candidateData[key] === 'string') {
          candidateData[key] = key === 'status' ? 'Applied' : ''
        } else if (typeof candidateData[key] === 'boolean') {
          candidateData[key] = false
        } else if (typeof candidateData[key] === 'number') {
          candidateData[key] = 0
        } else {
          candidateData[key] = null
        }
      })

      errors.value = {}
      emit('close')
    }

    // Initialize
    onMounted(() => {
      loadCompanies()
    })

    return {
      loading,
      errors,
      formData,
      contactData,
      addressData,
      passportData,
      socialProfileData,
      candidateData,
      companies,
      isLoadingCompanies,
      isEdit,
      handleSubmit,
      closeModal
    }
  }
}
</script>

<style scoped>
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
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
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
}

.header-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.header-text h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-text p {
  margin: 0.25rem 0 0 0;
  opacity: 0.9;
  font-size: 0.875rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
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

.candidate-form {
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
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #4f46e5;
}

.section-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.span-2 {
  grid-column: span 2;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-label.required::after {
  content: '*';
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-input.error,
.form-select.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-checkbox {
  margin-right: 0.5rem;
  scale: 1.1;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: white;
  border-top: 1px solid #e5e7eb;
  margin: 0 -2rem -2rem -2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn svg {
  width: 1rem;
  height: 1rem;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
  transform: translateY(-1px);
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

@media (max-width: 768px) {
  .modal-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .form-group.span-2 {
    grid-column: span 1;
  }
  
  .modal-header {
    padding: 1.5rem;
  }
  
  .candidate-form {
    padding: 1.5rem;
  }
  
  .form-actions {
    padding: 1rem 1.5rem;
    margin: 0 -1.5rem -1.5rem -1.5rem;
  }
}
</style>
