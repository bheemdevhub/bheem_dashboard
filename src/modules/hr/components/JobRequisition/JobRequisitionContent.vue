<template>
  <div class="job-requisition-content" :class="{ 'expanded-view': isExpanded }">
    <!-- Header Section -->
    <div class="content-header">
      <div class="job-info">
        <div class="job-avatar">
          {{ getJobInitials() }}
        </div>
        <div class="job-details">
          <h2 class="job-title">{{ jobRequisition.job_title }}</h2>
          <div class="job-meta">
            <span class="department">{{ getDepartmentName() }}</span>
            <span class="separator">•</span>
            <span class="location">{{ jobRequisition.location || 'N/A' }}</span>
            <span class="separator">•</span>
            <span class="job-type">{{ getJobTypeName() }}</span>
          </div>
        </div>
      </div>
      
      <div class="header-actions">
        <button 
          @click="handleEdit"
          class="edit-btn"
          title="Edit job requisition"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          Edit
        </button>
      </div>
    </div>

    <!-- Status Section -->
    <div class="status-section">
      <div class="status-item">
        <span class="status-label">Status:</span>
        <span class="status-badge" :class="jobRequisition.is_active ? 'active' : 'inactive'">
          {{ jobRequisition.is_active ? 'Active' : 'Inactive' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Openings:</span>
        <span class="openings-count">{{ jobRequisition.number_of_openings }}</span>
      </div>
      <div class="status-item">
        <span class="status-label">Requisition Date:</span>
        <span class="requisition-date">{{ formatDate(jobRequisition.requisition_date) }}</span>
      </div>
    </div>

    <!-- Details Grid -->
    <div class="details-grid">
      <!-- Basic Information -->
      <div class="detail-section">
        <h3 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          Basic Information
        </h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Job ID:</span>
            <span class="detail-value">{{ jobRequisition.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Employment Type:</span>
            <span class="detail-value">{{ getEmploymentTypeName() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Experience Required:</span>
            <span class="detail-value">{{ jobRequisition.experience_required || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Salary Range:</span>
            <span class="detail-value">{{ getSalaryRange() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Company:</span>
            <span class="detail-value">{{ getCompanyName() }}</span>
          </div>
        </div>
      </div>

      <!-- Hiring Manager -->
      <div class="detail-section">
        <h3 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          Hiring Manager
        </h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Hiring Manager:</span>
            <span class="detail-value">{{ getHiringManagerName() }}</span>
          </div>
        </div>
      </div>

      <!-- Dates & Timeline -->
      <div class="detail-section">
        <h3 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          Timeline
        </h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Requisition Date:</span>
            <span class="detail-value">{{ formatDate(jobRequisition.requisition_date) }}</span>
          </div>
        </div>
      </div>

      <!-- Job Description -->
      <div class="detail-section full-width">
        <h3 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
          </svg>
          Job Description
        </h3>
        <div class="description-content">
          <p>{{ jobRequisition.job_description || 'No description provided.' }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div class="detail-section full-width" v-if="jobRequisition.skills && jobRequisition.skills.length">
        <h3 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          Required Skills
        </h3>
        <div class="skills-container">
          <span 
            v-for="skill in jobRequisition.skills" 
            :key="skill.id || skill"
            class="skill-tag"
          >
            {{ typeof skill === 'string' ? skill : (skill.name || skill.id) }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'JobRequisitionContent',
  props: {
    jobRequisition: {
      type: Object,
      required: true
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['refresh', 'edit'],
  setup(props, { emit }) {

    const handleEdit = () => {
      emit('edit', props.jobRequisition)
    }

    const getJobInitials = () => {
      if (!props.jobRequisition?.job_title) return 'JR'
      return props.jobRequisition.job_title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const getDepartmentName = () => {
      // This would normally come from a lookup table
      return props.jobRequisition.department_name || 'N/A'
    }

    const getJobTypeName = () => {
      // This would normally come from a lookup table
      return props.jobRequisition.job_type_name || 'N/A'
    }

    const getEmploymentTypeName = () => {
      // This would normally come from a lookup table
      return props.jobRequisition.employment_type_name || 'N/A'
    }

    const getHiringManagerName = () => {
      return props.jobRequisition.hiring_manager_name || 'N/A'
    }

    const getSalaryRange = () => {
      const min = props.jobRequisition.salary_min
      const max = props.jobRequisition.salary_max
      
      if (min && max && min > 0 && max > 0) {
        return `$${Number(min).toLocaleString()} - $${Number(max).toLocaleString()}`
      } else if (min && min > 0) {
        return `$${Number(min).toLocaleString()}+`
      } else if (max && max > 0) {
        return `Up to $${Number(max).toLocaleString()}`
      }
      return 'Not specified'
    }

    const getCompanyName = () => {
      return props.jobRequisition.company_name || 'N/A'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('en-GB') // DD/MM/YYYY format
    }



    return {
      getJobInitials,
      getDepartmentName,
      getJobTypeName,
      getEmploymentTypeName,
      getHiringManagerName,
      getSalaryRange,
      getCompanyName,
      formatDate,
      handleEdit
    }
  }
}
</script>

<style scoped>
.job-requisition-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.job-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.job-avatar {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
}

.job-details h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.separator {
  color: #d1d5db;
}

.content-actions {
  display: flex;
  gap: 0.5rem;
}

.status-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.status-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.openings-count {
  font-size: 1.125rem;
  font-weight: 700;
  color: #3b82f6;
}

.requisition-date {
  font-size: 0.875rem;
  color: #374151;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-section {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.section-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.detail-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 0.5rem;
  align-items: center;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.detail-value {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.description-content {
  color: #374151;
  line-height: 1.6;
}

.description-content p {
  margin: 0;
  white-space: pre-wrap;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.375rem 0.75rem;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .job-requisition-content {
    margin: 0.5rem;
    padding: 1rem;
  }

  .content-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .job-info {
    justify-content: center;
    text-align: center;
  }

  .content-actions {
    justify-content: center;
  }

  .status-section {
    flex-direction: column;
    gap: 1rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .detail-item {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .detail-label {
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .job-details h2 {
    font-size: 1.25rem;
  }

  .job-meta {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .separator {
    display: none;
  }
}

/* Expanded View Styles */
.job-requisition-content.expanded-view {
  padding: 0;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
}

.job-requisition-content.expanded-view .content-header {
  padding: 16px 20px 12px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  border-radius: 8px 8px 0 0;
}

.job-requisition-content.expanded-view .status-section {
  padding: 12px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.job-requisition-content.expanded-view .details-grid {
  padding: 20px;
}

/* Mobile responsive for expanded view */
@media (max-width: 768px) {
  .job-requisition-content.expanded-view .content-header,
  .job-requisition-content.expanded-view .status-section,
  .job-requisition-content.expanded-view .details-grid {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
