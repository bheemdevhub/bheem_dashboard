<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="header-text">
            <h2>{{ isEdit ? 'Edit Employee' : 'Add New Employee' }}</h2>
            <p>{{ isEdit ? 'Update employee information' : 'Create a new employee record' }}</p>
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
        <form @submit.prevent="handleSubmit" class="employee-form">
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <span v-if="errors.gender" class="error-text">{{ errors.gender }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Marital Status</label>
                <select 
                  v-model="formData.marital_status" 
                  class="form-input"
                  :class="{ 'error': errors.marital_status }"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                <span v-if="errors.marital_status" class="error-text">{{ errors.marital_status }}</span>
              </div>
              
              <div class="form-group">
                <label class="form-label">Blood Group</label>
                <input 
                  v-model="formData.blood_group" 
                  type="text" 
                  class="form-input"
                  placeholder="e.g., A+, B-, O+"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label required">Nationality</label>
                <input 
                  v-model="formData.nationality" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.nationality }"
                  placeholder="Enter nationality"
                  required 
                />
                <span v-if="errors.nationality" class="error-text">{{ errors.nationality }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">National ID</label>
                <input 
                  v-model="formData.national_id" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter national ID/SSN/Aadhar"
                />
              </div>
            </div>
          </div>

          <!-- Employment Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <h3>Employment Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label required">Employee Code</label>
                <input 
                  v-model="formData.employee_code" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.employee_code }"
                  placeholder="Enter employee code"
                  required 
                />
                <span v-if="errors.employee_code" class="error-text">{{ errors.employee_code }}</span>
              </div>
              
              <div class="form-group">
                <label class="form-label required">Hire Date</label>
                <input 
                  v-model="formData.hire_date" 
                  type="date" 
                  class="form-input"
                  :class="{ 'error': errors.hire_date }"
                  required 
                />
                <span v-if="errors.hire_date" class="error-text">{{ errors.hire_date }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Termination Date</label>
                <input 
                  v-model="formData.termination_date" 
                  type="date" 
                  class="form-input"
                  placeholder="Leave empty if active"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Probation End Date</label>
                <input 
                  v-model="formData.probation_end_date" 
                  type="date" 
                  class="form-input"
                  placeholder="End of probation period"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label required">Department</label>
                <select 
                  v-model="formData.department_id" 
                  class="form-input"
                  :class="{ 'error': errors.department_id }"
                  required
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
                <span v-if="errors.department_id" class="error-text">{{ errors.department_id }}</span>
              </div>
              
              <div class="form-group">
                <label class="form-label required">Position</label>
                <select 
                  v-model="formData.position_id" 
                  class="form-input"
                  :class="{ 'error': errors.position_id }"
                  required
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
                <span v-if="errors.position_id" class="error-text">{{ errors.position_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Manager</label>
                <select 
                  v-model="formData.manager_id" 
                  class="form-input"
                >
                  <option value="">Select Manager</option>
                  <option 
                    v-for="manager in managers" 
                    :key="manager.id" 
                    :value="manager.id"
                  >
                    {{ manager.first_name }} {{ manager.last_name }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label required">Employment Type</label>
                <select 
                  v-model="formData.employment_type" 
                  class="form-input"
                  :class="{ 'error': errors.employment_type }"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
                <span v-if="errors.employment_type" class="error-text">{{ errors.employment_type }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Employment Status</label>
                <select 
                  v-model="formData.employment_status" 
                  class="form-input"
                  :class="{ 'error': errors.employment_status }"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Terminated">Terminated</option>
                  <option value="On Leave">On Leave</option>
                </select>
                <span v-if="errors.employment_status" class="error-text">{{ errors.employment_status }}</span>
              </div>
              
              <div class="form-group">
                <label class="form-label required">Work Location</label>
                <input 
                  v-model="formData.work_location" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.work_location }"
                  placeholder="Enter work location"
                  required 
                />
                <span v-if="errors.work_location" class="error-text">{{ errors.work_location }}</span>
              </div>
              
              <div class="form-group">
                <label class="form-label required">Base Salary</label>
                <div class="input-group">
                  <input 
                    v-model="formData.base_salary" 
                    type="number" 
                    step="0.01"
                    class="form-input"
                    :class="{ 'error': errors.base_salary }"
                    placeholder="Enter base salary"
                    required 
                  />
                  <select v-model="formData.currency" class="currency-select">
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <span v-if="errors.base_salary" class="error-text">{{ errors.base_salary }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Hourly Rate</label>
                <div class="input-group">
                  <input 
                    v-model="formData.hourly_rate" 
                    type="number" 
                    step="0.01"
                    class="form-input"
                    placeholder="Enter hourly rate (if applicable)"
                  />
                  <span class="currency-label">{{ formData.currency }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label required">Pay Frequency</label>
                <select 
                  v-model="formData.pay_frequency" 
                  class="form-input"
                  required
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                </select>
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
                  <option value="" v-if="isLoadingCompanies">Loading companies...</option>
                  <option value="" v-else>Select Company</option>
                  <option 
                    v-for="company in companies" 
                    :key="company.id" 
                    :value="company.id"
                  >
                    {{ company.company_name }}
                  </option>
                </select>
                <span v-if="errors.company_id" class="error-text">{{ errors.company_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Role</label>
                <select 
                  v-model="formData.role_id" 
                  class="form-input"
                  :class="{ 'error': errors.role_id }"
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
                <span v-if="errors.role_id" class="error-text">{{ errors.role_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">Password</label>
                <input 
                  v-model="formData.password" 
                  type="password" 
                  class="form-input"
                  placeholder="Enter temporary password for employee login"
                />
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input 
                    v-model="formData.is_active" 
                    type="checkbox" 
                    class="checkbox-input"
                  />
                  <span class="checkbox-text">Employee is Active</span>
                </label>
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input 
                    v-model="formData.is_superadmin" 
                    type="checkbox" 
                    class="checkbox-input"
                  />
                  <span class="checkbox-text">Super Administrator</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
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
                  placeholder="Enter secondary email (optional)"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Primary Phone</label>
                <input 
                  v-model="contactData.phone_primary" 
                  type="tel" 
                  class="form-input"
                  placeholder="Enter primary phone number"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Secondary Phone</label>
                <input 
                  v-model="contactData.phone_secondary" 
                  type="tel" 
                  class="form-input"
                  placeholder="Enter secondary phone number"
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
                <label class="form-label">Work Phone</label>
                <input 
                  v-model="contactData.phone_work" 
                  type="tel" 
                  class="form-input"
                  placeholder="Enter work phone number"
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
                <select 
                  v-model="contactData.emergency_contact_relationship" 
                  class="form-input"
                >
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Husband">Husband</option>
                  <option value="Wife">Wife</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Address Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <h3>Address Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group full-width">
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
                <label class="form-label required">State/Province</label>
                <input 
                  v-model="addressData.state" 
                  type="text" 
                  class="form-input"
                  :class="{ 'error': errors.state }"
                  placeholder="Enter state/province"
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

              <div class="form-group">
                <label class="form-label">Address Line 2</label>
                <input 
                  v-model="addressData.line2" 
                  type="text" 
                  class="form-input"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>
            </div>
          </div>

          <!-- Bank Account Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 10h20l-2 12H4l-2-12zM2 10l2-6h16l2 6M7 14h10M7 17h6"/>
              </svg>
              <h3>Bank Account Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Account Name</label>
                <input 
                  v-model="bankAccountData.account_name" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter account holder name"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Account Number</label>
                <input 
                  v-model="bankAccountData.account_number" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter account number"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Bank Name</label>
                <input 
                  v-model="bankAccountData.bank_name" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter bank name"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Routing Number</label>
                <input 
                  v-model="bankAccountData.routing_number" 
                  type="text" 
                  class="form-input"
                  placeholder="Enter routing/IFSC number"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Account Type</label>
                <select 
                  v-model="bankAccountData.account_type" 
                  class="form-input"
                >
                  <option value="SAVINGS">Savings</option>
                  <option value="CHECKING">Checking</option>
                  <option value="CURRENT">Current</option>
                </select>
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input 
                    v-model="bankAccountData.is_primary" 
                    type="checkbox" 
                    class="checkbox-input"
                  />
                  <span class="checkbox-text">Primary Account</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Passport Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
                <label class="form-label">Issue Date</label>
                <input 
                  v-model="passportData.issue_date" 
                  type="date" 
                  class="form-input"
                  placeholder="Select issue date"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">Expiry Date</label>
                <input 
                  v-model="passportData.expiry_date" 
                  type="date" 
                  class="form-input"
                  placeholder="Select expiry date"
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

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input 
                    v-model="passportData.is_primary" 
                    type="checkbox" 
                    class="checkbox-input"
                  />
                  <span class="checkbox-text">Primary Passport</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" @click="closeModal" class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Cancel
        </button>
        <button type="submit" @click="handleSubmit" class="btn btn-primary" :disabled="loading">
          <svg v-if="loading" class="animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
            <polyline points="17,21 17,13 7,13 7,21"></polyline>
            <polyline points="7,3 7,8 15,8"></polyline>
          </svg>
          {{ loading ? 'Saving...' : (isEdit ? 'Update Employee' : 'Add Employee') }}
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
  name: 'AddEmployee',
  props: {
    isVisible: { type: Boolean, default: false },
    employee: { type: Object, default: null }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    const loading = ref(false)
    const errors = ref({})
    const departments = ref([])
    const positions = ref([])
    const managers = ref([])
    const companies = ref([])
    const roles = ref([])
    const isLoadingCompanies = ref(false)

    // Form data
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
      employee_code: '',
      hire_date: '',
      termination_date: null,
      probation_end_date: '',
      department_id: '',
      position_id: '',
      manager_id: '',
      employment_type: '',
      employment_status: 'Active',
      work_location: '',
      base_salary: '',
      hourly_rate: '',
      currency: 'USD',
      pay_frequency: 'Bi-Weekly',
      national_id: '',
      role_id: '',
      is_active: true,
      is_superadmin: false,
      password: '',
      company_id: ''
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
      emergency_contact_relationship: 'Family'
    })

    const addressData = reactive({
      address_type: 'PRIMARY',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    })

    const bankAccountData = reactive({
      account_name: '',
      account_number: '',
      bank_name: '',
      routing_number: '',
      account_type: 'SAVINGS',
      is_primary: true
    })

    const passportData = reactive({
      passport_number: '',
      expiry_date: '',
      issue_date: '',
      country_of_issue: '',
      is_primary: true
    })

    const isEdit = computed(() => !!props.employee)

    // Watch for employee data to populate form
    watch(() => props.employee, (newEmployee) => {
      if (newEmployee) {
        // Populate main form data
        Object.keys(formData).forEach(key => {
          if (newEmployee[key] !== undefined) {
            formData[key] = newEmployee[key]
          }
        })

        // Populate contact data
        if (newEmployee.contacts && newEmployee.contacts.length > 0) {
          const contact = newEmployee.contacts[0]
          Object.keys(contactData).forEach(key => {
            if (contact[key] !== undefined) {
              contactData[key] = contact[key]
            }
          })
        }

        // Populate address data
        if (newEmployee.addresses && newEmployee.addresses.length > 0) {
          const address = newEmployee.addresses[0]
          Object.keys(addressData).forEach(key => {
            if (address[key] !== undefined) {
              addressData[key] = address[key]
            }
          })
        }

        // Populate bank account data
        if (newEmployee.bank_accounts && newEmployee.bank_accounts.length > 0) {
          const bankAccount = newEmployee.bank_accounts[0]
          Object.keys(bankAccountData).forEach(key => {
            if (bankAccount[key] !== undefined) {
              bankAccountData[key] = bankAccount[key]
            }
          })
        }

        // Populate passport data
        if (newEmployee.passports && newEmployee.passports.length > 0) {
          const passport = newEmployee.passports[0]
          Object.keys(passportData).forEach(key => {
            if (passport[key] !== undefined) {
              passportData[key] = passport[key]
            }
          })
        }
      }
    }, { immediate: true })

    // Methods
    const loadLookups = async () => {
      try {
        // Load HR lookups (departments, positions, roles)
        const response = await HRApiService.getLookups()
        if (response.success) {
          const lookups = response.data
          departments.value = lookups.filter(item => item.type === 'department' && item.is_active)
          positions.value = lookups.filter(item => item.type === 'position' && item.is_active)
          roles.value = lookups.filter(item => item.type === 'role' && item.is_active)
        } else {
          console.warn('Failed to load HR lookups:', response.error)
          toast.warning('Failed to load lookup data. Some form fields may be limited.', {
            timeout: 3000,
            icon: '⚠️'
          })
        }

        // Load companies
        isLoadingCompanies.value = true
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
        isLoadingCompanies.value = false

        // Load managers (employees who can be managers)
        const employeesResponse = await HRApiService.getEmployees()
        if (employeesResponse.success) {
          managers.value = employeesResponse.data.filter(emp => emp.is_active)
        } else {
          console.warn('Failed to load managers:', employeesResponse.error)
          toast.warning('Failed to load manager list. Some form fields may be limited.', {
            timeout: 3000,
            icon: '⚠️'
          })
        }
      } catch (error) {
        console.error('Error loading lookups:', error)
        toast.error('Failed to load form data. Please refresh and try again.', {
          timeout: 5000,
          icon: '❌'
        })
      }
    }

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      // Validate required fields
      const requiredFields = [
        'first_name', 'last_name', 'date_of_birth', 'gender', 'marital_status', 'nationality',
        'employee_code', 'hire_date', 'probation_end_date', 'department_id', 'position_id', 'role_id',
        'employment_type', 'work_location', 'base_salary', 'company_id'
      ]

      requiredFields.forEach(field => {
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
      const data = { ...formData }

      // Convert salary values to strings to match API expectations
      data.base_salary = String(data.base_salary || '')
      data.hourly_rate = data.hourly_rate ? String(data.hourly_rate) : null

      // Prepare contacts array
      const contacts = [{
        ...contactData,
        is_active: true
      }]

      // Prepare addresses array
      const addresses = [{
        ...addressData
      }]

      // Prepare bank accounts array - include even if empty to match API structure
      const bank_accounts = []
      if (bankAccountData.account_number && bankAccountData.bank_name && bankAccountData.account_name) {
        bank_accounts.push({
          account_name: bankAccountData.account_name || '',
          account_number: bankAccountData.account_number || '',
          bank_name: bankAccountData.bank_name || '',
          routing_number: bankAccountData.routing_number || '',
          account_type: bankAccountData.account_type || 'SAVINGS',
          is_primary: bankAccountData.is_primary !== undefined ? bankAccountData.is_primary : true
        })
      }

      // Prepare passports array - include even if empty to match API structure
      const passports = []
      if (passportData.passport_number && passportData.expiry_date && passportData.country_of_issue) {
        passports.push({
          passport_number: passportData.passport_number || '',
          expiry_date: passportData.expiry_date || '',
          issue_date: passportData.issue_date || '',
          country_of_issue: passportData.country_of_issue || '',
          is_primary: passportData.is_primary !== undefined ? passportData.is_primary : true
        })
      }

      // Add nested data
      data.contacts = contacts
      data.addresses = addresses
      data.bank_accounts = bank_accounts
      data.passports = passports
      data.social_profiles = []

      // Additional validation to prevent sending invalid data
      if (isEdit.value) {
        // For edits, ensure we have the employee ID
        if (!props.employee || !props.employee.id) {
          throw new Error('Employee ID is required for updates')
        }
      }

      // Set default values
      data.is_superadmin = formData.is_superadmin || false
      
      // Handle password appropriately for create vs edit
      if (!isEdit.value && !data.password) {
        // Generate password for new employees if not provided
        data.password = 'TempPassword123!'
      } else if (isEdit.value) {
        // For editing, only include password if it was actually provided (changed)
        if (!data.password || data.password.trim() === '') {
          delete data.password
        }
      }

      // Ensure required fields are properly handled
      if (!data.termination_date) {
        data.termination_date = null
      }
      
      if (!data.manager_id) {
        data.manager_id = null
      }

      // Ensure proper string formatting for monetary values
      if (data.base_salary === '' || data.base_salary === null || data.base_salary === undefined) {
        data.base_salary = '0.00'
      }

      // Clean up empty string values that should be null
      Object.keys(data).forEach(key => {
        if (data[key] === '' && ['middle_name', 'preferred_name', 'title', 'suffix', 'blood_group'].includes(key)) {
          data[key] = data[key] || null
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
        
        // Additional validation check
        if (!data.company_id || !data.role_id || !data.department_id || !data.position_id) {
          throw new Error('Missing required lookup values. Please refresh the page and try again.')
        }
        
        let result

        if (isEdit.value) {
          console.log('Editing employee with ID:', props.employee.id)
          console.log('Update payload:', JSON.stringify(data, null, 2))
          result = await HRApiService.updateEmployee(props.employee.id, data)
        } else {
          console.log('Creating new employee')
          console.log('Create payload:', JSON.stringify(data, null, 2))
          result = await HRApiService.createEmployee(data)
        }

        console.log('API result:', result)

        if (result.success) {
          const employeeName = `${formData.first_name} ${formData.last_name}`
          const actionText = isEdit.value ? 'updated' : 'created'
          
          toast.success(`Employee "${employeeName}" has been ${actionText} successfully!`, {
            timeout: 4000,
            icon: '✅'
          })

          // Emit success with employee data for real-time updates
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
            errorMessage = 'An employee with this information already exists'
          } else if (errorMessage.includes('required')) {
            errorMessage = 'Please fill in all required fields'
          } else if (errorMessage.includes('invalid')) {
            errorMessage = 'Please check the information and try again'
          } else if (errorMessage.includes('HTTP 400')) {
            errorMessage = 'Invalid data provided. Please check all fields and try again'
          } else if (errorMessage.includes('HTTP 500')) {
            errorMessage = 'Server error. Please try again later'
          }
          
          toast.error(`Failed to ${actionText} employee: ${errorMessage}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving employee:', error)
        const actionText = isEdit.value ? 'update' : 'create'
        
        // Parse error message for better user feedback
        let errorMessage = 'Unknown error occurred'
        
        if (error && typeof error === 'object') {
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
        } else if (typeof error === 'string') {
          errorMessage = error
        }
        
        // Improve error messages for common issues
        if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
          errorMessage = 'An employee with this information already exists'
        } else if (errorMessage.includes('required')) {
          errorMessage = 'Please fill in all required fields'
        } else if (errorMessage.includes('invalid')) {
          errorMessage = 'Please check the information and try again'
        } else if (errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again'
        }
        
        toast.error(`Failed to ${actionText} employee: ${errorMessage}`, {
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
          formData[key] = key === 'currency' ? 'USD' : key === 'pay_frequency' ? 'MONTHLY' : key === 'employment_status' ? 'Active' : ''
        } else if (typeof formData[key] === 'boolean') {
          formData[key] = key === 'is_active'
        } else {
          formData[key] = ''
        }
      })

      Object.keys(contactData).forEach(key => {
        contactData[key] = key === 'emergency_contact_relationship' ? 'Family' : ''
      })

      Object.keys(addressData).forEach(key => {
        addressData[key] = key === 'address_type' ? 'PRIMARY' : ''
      })

      errors.value = {}
      emit('close')
    }

    // Initialize
    onMounted(() => {
      loadLookups()
    })

    return {
      loading,
      errors,
      formData,
      contactData,
      addressData,
      bankAccountData,
      passportData,
      departments,
      positions,
      managers,
      companies,
      roles,
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
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 900px;
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

.employee-form {
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

.input-group {
  display: flex;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.input-group:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-group .form-input {
  border: none;
  border-radius: 0;
  flex: 1;
}

.input-group .form-input:focus {
  box-shadow: none;
  transform: none;
}

.currency-select {
  padding: 0.75rem;
  border: none;
  background: #f9fafb;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 80px;
  cursor: pointer;
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
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
    border-radius: 12px 12px 0 0;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .header-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .employee-form {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .section-header {
    padding: 1rem 1.5rem;
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
  
  .header-text h2 {
    font-size: 1.25rem;
  }
  
  .form-grid {
    padding: 1rem;
  }
  
  .section-header {
    padding: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .modal-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .form-section {
    background: #374151;
    border-color: #4b5563;
  }
  
  .section-header {
    background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
    border-color: #4b5563;
  }
  
  .form-input {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .form-input:focus {
    border-color: #3b82f6;
    background: #374151;
  }
  
  .currency-select {
    background: #4b5563;
    color: #f9fafb;
  }
  
  .modal-footer {
    background: #374151;
    border-color: #4b5563;
  }
}

/* Checkbox Styles */
.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
}

.checkbox-input {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-input:checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-text {
  color: #374151;
  font-size: 0.875rem;
}

/* Input Group Styles */
.input-group {
  display: flex;
  align-items: center;
}

.input-group .form-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  flex: 1;
}

.currency-select {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  min-width: 80px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.currency-label {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-left: none;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Custom Toast Styles */
.success-toast {
  border-left: 4px solid #059669 !important;
}

.error-toast {
  border-left: 4px solid #DC2626 !important;
}
</style>
