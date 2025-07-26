<template>
  <div class="company-content">
    <!-- Content Header -->
    <div class="content-header">
      <div class="company-info">
        <div class="company-avatar">
          {{ getCompanyInitials(company.company_name) }}
        </div>
        <div class="company-details">
          <h2>{{ company.company_name }}</h2>
          <div class="company-meta">
            <span>{{ company.company_code }}</span>
            <span class="separator">•</span>
            <span>{{ formatCompanyType(company.company_type) }}</span>
          </div>
        </div>
      </div>
      
      <div class="content-actions">
        <button @click="$emit('back')" class="back-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back
        </button>
        <div class="header-actions">
          <button @click="$emit('edit', company)" class="edit-btn">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Status Section -->
    <div class="status-section">
      <div class="status-item">
        <span class="status-label">Status:</span>
        <span class="status-badge" :class="{ 'active': company.is_active, 'inactive': !company.is_active }">
          {{ company.is_active ? 'Active' : 'Inactive' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Created:</span>
        <span class="company-date">{{ formatDate(company.created_at) }}</span>
      </div>
    </div>

    <!-- Details Grid -->
    <div class="details-grid">
      <!-- Basic Information -->
      <div class="detail-section">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
          </svg>
          Basic Information
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Company Code:</span>
            <span class="detail-value">{{ company.company_code || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Company Name:</span>
            <span class="detail-value">{{ company.company_name || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Legal Name:</span>
            <span class="detail-value">{{ company.legal_name || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Company Type:</span>
            <span class="detail-value">
              <span class="type-badge" :class="company.company_type?.toLowerCase()">
                {{ formatCompanyType(company.company_type) }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="detail-section">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
          </svg>
          Financial Information
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Functional Currency:</span>
            <span class="detail-value">{{ company.functional_currency_id || 'Not Set' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Reporting Currency:</span>
            <span class="detail-value">{{ company.reporting_currency_id || 'Not Set' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Consolidation Method:</span>
            <span class="detail-value">{{ company.consolidation_method || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Parent Company:</span>
            <span class="detail-value">{{ company.parent_company_id ? 'Has Parent' : 'Root Company' }}</span>
          </div>
        </div>
      </div>

      <!-- Registration Details -->
      <div class="detail-section full-width">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Registration Details
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Tax ID:</span>
            <span class="detail-value">{{ company.tax_id || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Registration Number:</span>
            <span class="detail-value">{{ company.registration_number || 'N/A' }}</span>
          </div>
        </div>
      </div>

      <!-- Address Information -->
      <div class="detail-section full-width">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.94L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.94C18.78,16.56 20,17.71 20,19Z"/>
          </svg>
          Address Information
        </div>
        <div class="address-content">
          <p>{{ company.address || 'No address provided' }}</p>
        </div>
      </div>

      <!-- Metadata -->
      <div class="detail-section full-width">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
          </svg>
          System Information
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Company ID:</span>
            <span class="detail-value">{{ company.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Created At:</span>
            <span class="detail-value">{{ formatDateTime(company.created_at) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Updated At:</span>
            <span class="detail-value">{{ formatDateTime(company.updated_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyContent',
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  emits: ['refresh', 'edit', 'back'],
  setup() {
    const getCompanyInitials = (name) => {
      if (!name) return 'C'
      const words = name.split(' ')
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    }

    const formatCompanyType = (type) => {
      if (!type) return 'N/A'
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const formatDateTime = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    return {
      getCompanyInitials,
      formatCompanyType,
      formatDate,
      formatDateTime
    }
  }
}
</script>

<style scoped>
.company-content {
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

.company-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-avatar {
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

.company-details h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.company-meta {
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
  align-items: center;
}

.back-btn,
.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn {
  background: #6b7280;
  color: white;
}

.back-btn:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.edit-btn {
  background: #3b82f6;
  color: white;
}

.edit-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.back-btn svg,
.edit-btn svg {
  width: 1rem;
  height: 1rem;
}

.status-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.company-date {
  font-size: 0.875rem;
  color: #4b5563;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.detail-section {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.section-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.type-badge.holding {
  background: #fef3c7;
  color: #d97706;
}

.type-badge.subsidiary {
  background: #dbeafe;
  color: #2563eb;
}

.address-content {
  margin-top: 0.5rem;
}

.address-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .status-section {
    flex-direction: column;
    gap: 1rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .company-content {
    padding: 1rem;
    margin: 0.5rem;
  }

  .company-info {
    flex-direction: column;
    text-align: center;
  }

  .content-actions {
    flex-direction: column;
    width: 100%;
  }

  .back-btn,
  .edit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
