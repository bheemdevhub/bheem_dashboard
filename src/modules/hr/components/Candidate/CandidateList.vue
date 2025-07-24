<template>
  <div class="candidate-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h3 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
            <path d="M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/>
            <circle cx="9" cy="7" r="4"/>
          </svg>
          Candidates
        </h3>
        <span class="item-count">({{ totalCount }} items)</span>
      </div>
      <div class="widget-actions">
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            v-model="searchText" 
            type="text" 
            placeholder="Search candidates..."
            class="search-input"
          />
        </div>
        <button @click="showModal = true" class="add-btn" title="Add Candidate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Widget Content -->
    <div class="widget-content">
      <div class="coming-soon-container">
        <svg class="coming-soon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
          <path d="M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/>
          <circle cx="9" cy="7" r="4"/>
        </svg>
        <h4>Candidate Management</h4>
        <p>Track and manage job candidates</p>
        <span class="coming-soon-badge">Coming Soon</span>
      </div>
    </div>

    <!-- Modal placeholder -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2>Add Candidate</h2>
          <button @click="closeModal" class="modal-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p>Candidate form will be implemented soon.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CandidateList',
  setup() {
    const searchText = ref('')
    const totalCount = ref(0)
    const showModal = ref(false)

    const closeModal = () => {
      showModal.value = false
    }

    return {
      searchText,
      totalCount,
      showModal,
      closeModal
    }
  }
}
</script>

<style scoped>
.candidate-widget {
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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
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
  color: #10b981;
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
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  pointer-events: none;
}

.add-btn {
  padding: 0.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.add-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.widget-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.coming-soon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  color: #6b7280;
  text-align: center;
  flex: 1;
}

.coming-soon-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  stroke-width: 1;
}

.coming-soon-container h4 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 1.5rem;
  font-weight: 600;
}

.coming-soon-container p {
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.coming-soon-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #d1fae5;
  color: #065f46;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
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

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.modal-close {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  color: #6b7280;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 768px) {
  .widget-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .widget-actions {
    justify-content: space-between;
  }
  
  .search-input {
    min-width: auto;
    flex: 1;
  }
}
</style>
