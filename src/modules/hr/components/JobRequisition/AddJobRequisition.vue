<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>{{ isEdit ? 'Edit Job Requisition' : 'Add New Job Requisition' }}</h2>
        <button type="button" class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      
      <div class="modal-body">
        <!-- Step Navigation -->
        <div class="step-navigation">
          <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <span class="step-number">1</span>
            <span class="step-title">Basic Info</span>
          </div>
          <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <span class="step-number">2</span>
            <span class="step-title">Details</span>
          </div>
          <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
            <span class="step-number">3</span>
            <span class="step-title">Requirements</span>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Step 1: Basic Information -->
          <div v-if="currentStep === 1" class="form-step">
            <div class="form-row">
              <div class="form-group">
                <label for="job_title">Job Title <span class="required">*</span></label>
                <input
                  id="job_title"
                  v-model="formData.job_title"
                  type="text"
                  placeholder="Enter job title"
                  :class="{ 'error': errors.job_title }"
                />
                <span v-if="errors.job_title" class="error-message">{{ errors.job_title }}</span>
              </div>

              <div class="form-group">
                <label for="department_id">Department <span class="required">*</span></label>
                <select
                  id="department_id"
                  v-model="formData.department_id"
                  :class="{ 'error': errors.department_id }"
                >
                  <option value="">Select Department</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }}
                  </option>
                </select>
                <span v-if="errors.department_id" class="error-message">{{ errors.department_id }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="job_type_id">Job Type <span class="required">*</span></label>
                <select
                  id="job_type_id"
                  v-model="formData.job_type_id"
                  :class="{ 'error': errors.job_type_id }"
                >
                  <option value="">Select Job Type</option>
                  <option v-for="type in jobTypes" :key="type.id" :value="type.id">
                    {{ type.name }}
                  </option>
                </select>
                <span v-if="errors.job_type_id" class="error-message">{{ errors.job_type_id }}</span>
              </div>

              <div class="form-group">
                <label for="location">Location <span class="required">*</span></label>
                <input
                  id="location"
                  v-model="formData.location"
                  type="text"
                  placeholder="Enter location"
                  :class="{ 'error': errors.location }"
                />
                <span v-if="errors.location" class="error-message">{{ errors.location }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="hiring_manager_id">Hiring Manager</label>
                <select
                  id="hiring_manager_id"
                  v-model="formData.hiring_manager_id"
                >
                  <option value="">Select Hiring Manager</option>
                  <option v-for="manager in hiringManagers" :key="manager.id" :value="manager.id">
                    {{ manager.first_name }} {{ manager.last_name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="number_of_openings">Number of Openings <span class="required">*</span></label>
                <input
                  id="number_of_openings"
                  v-model.number="formData.number_of_openings"
                  type="number"
                  min="1"
                  placeholder="1"
                  :class="{ 'error': errors.number_of_openings }"
                />
                <span v-if="errors.number_of_openings" class="error-message">{{ errors.number_of_openings }}</span>
              </div>
            </div>
          </div>

          <!-- Step 2: Details -->
          <div v-if="currentStep === 2" class="form-step">
            <div class="form-row">
              <div class="form-group">
                <label for="salary_min">Minimum Salary</label>
                <input
                  id="salary_min"
                  v-model.number="formData.salary_min"
                  type="number"
                  placeholder="Enter minimum salary"
                />
              </div>

              <div class="form-group">
                <label for="salary_max">Maximum Salary</label>
                <input
                  id="salary_max"
                  v-model.number="formData.salary_max"
                  type="number"
                  placeholder="Enter maximum salary"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="requisition_date">Requisition Date</label>
                <input
                  id="requisition_date"
                  v-model="formData.requisition_date"
                  type="date"
                />
              </div>

              <div class="form-group">
                <label for="company_id">Company ID</label>
                <input
                  id="company_id"
                  v-model="formData.company_id"
                  type="text"
                  placeholder="Enter company ID"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label>
                  <input
                    v-model="formData.is_active"
                    type="checkbox"
                  />
                  Active Position
                </label>
              </div>
            </div>
          </div>

          <!-- Step 3: Requirements -->
          <div v-if="currentStep === 3" class="form-step">
            <div class="form-group full-width">
              <label for="job_description">Job Description <span class="required">*</span></label>
              <textarea
                id="job_description"
                v-model="formData.job_description"
                rows="6"
                placeholder="Enter detailed job description"
                :class="{ 'error': errors.job_description }"
              ></textarea>
              <span v-if="errors.job_description" class="error-message">{{ errors.job_description }}</span>
            </div>

            <div class="form-group full-width">
              <label for="experience_required">Experience Required</label>
              <textarea
                id="experience_required"
                v-model="formData.experience_required"
                rows="3"
                placeholder="Describe required experience"
              ></textarea>
            </div>

            <div class="form-group full-width">
              <label for="skills">Skills</label>
              <div class="skills-input">
                <input
                  v-model="skillInput"
                  type="text"
                  placeholder="Add a skill and press Enter"
                  @keyup.enter="addSkill"
                />
                <button type="button" @click="addSkill" class="add-skill-btn">Add</button>
              </div>
              <div v-if="formData.skills.length > 0" class="skills-list">
                <span
                  v-for="(skill, index) in formData.skills"
                  :key="index"
                  class="skill-tag"
                >
                  {{ skill }}
                  <button type="button" @click="removeSkill(index)" class="remove-skill">&times;</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Form Navigation -->
          <div class="form-navigation">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="previousStep"
              class="btn btn-secondary"
            >
              Previous
            </button>
            
            <div class="nav-spacer"></div>
            
            <button
              v-if="currentStep < 3"
              type="button"
              @click="nextStep"
              class="btn btn-primary"
              :disabled="!canProceedToNextStep"
            >
              Next
            </button>
            
            <button
              v-if="currentStep === 3"
              type="submit"
              class="btn btn-success"
              :disabled="!isFormValid || loading"
            >
              {{ loading ? 'Saving...' : (isEdit ? 'Update' : 'Create') }} Job Requisition
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { HRApiService } from '../../services/hrApiService';

export default {
  name: 'AddJobRequisition',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    jobRequisition: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'saved'],
  setup(props, { emit }) {
    const currentStep = ref(1);
    const loading = ref(false);
    const skillInput = ref('');

    // Form data with correct payload structure
    const formData = reactive({
      job_title: '',
      department_id: '',
      hiring_manager_id: '',
      company_id: '',
      number_of_openings: 1,
      job_type_id: '',
      location: '',
      salary_min: null,
      salary_max: null,
      requisition_date: '',
      job_description: '',
      experience_required: '',
      is_active: true,
      skills: []
    });

    // Validation errors
    const errors = reactive({});

    // Dropdown options
    const departments = ref([
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'Sales' },
      { id: 4, name: 'Human Resources' },
      { id: 5, name: 'Finance' }
    ]);

    const jobTypes = ref([
      { id: 1, name: 'Software Engineer' },
      { id: 2, name: 'Product Manager' },
      { id: 3, name: 'Designer' },
      { id: 4, name: 'Data Scientist' },
      { id: 5, name: 'Marketing Manager' }
    ]);

    const hiringManagers = ref([
      { id: 1, first_name: 'John', last_name: 'Doe' },
      { id: 2, first_name: 'Jane', last_name: 'Smith' },
      { id: 3, first_name: 'Mike', last_name: 'Johnson' }
    ]);

    // Form validation
    const validateStep = (step) => {
      const stepErrors = {};

      if (step === 1) {
        if (!formData.job_title) stepErrors.job_title = 'Job title is required';
        if (!formData.department_id) stepErrors.department_id = 'Department is required';
        if (!formData.job_type_id) stepErrors.job_type_id = 'Job type is required';
        if (!formData.location) stepErrors.location = 'Location is required';
        if (!formData.number_of_openings || formData.number_of_openings < 1) {
          stepErrors.number_of_openings = 'Number of openings must be at least 1';
        }
      }

      if (step === 3) {
        if (!formData.job_description) stepErrors.job_description = 'Job description is required';
      }

      Object.assign(errors, stepErrors);
      return Object.keys(stepErrors).length === 0;
    };

    const canProceedToNextStep = computed(() => {
      return validateStep(currentStep.value);
    });

    const isFormValid = computed(() => {
      return validateStep(1) && validateStep(3);
    });

    // Step navigation
    const nextStep = () => {
      if (validateStep(currentStep.value) && currentStep.value < 3) {
        currentStep.value++;
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    // Skills management
    const addSkill = () => {
      const skill = skillInput.value.trim();
      if (skill && !formData.skills.includes(skill)) {
        formData.skills.push(skill);
        skillInput.value = '';
      }
    };

    const removeSkill = (index) => {
      formData.skills.splice(index, 1);
    };

    // Form submission
    const handleSubmit = async () => {
      if (!isFormValid.value) {
        return;
      }

      loading.value = true;

      try {
        const submitData = { ...formData };

        // Convert skills array to comma-separated string if needed
        if (submitData.skills && Array.isArray(submitData.skills)) {
          submitData.skills = submitData.skills.join(', ');
        }

        let result;
        if (props.isEdit && props.jobRequisition?.id) {
          result = await HRApiService.updateJobRequisition(props.jobRequisition.id, submitData);
        } else {
          result = await HRApiService.createJobRequisition(submitData);
        }

        emit('saved', result);
        emit('close');
      } catch (error) {
        console.error('Error saving job requisition:', error);
      } finally {
        loading.value = false;
      }
    };

    // Modal close handling
    const handleOverlayClick = () => {
      emit('close');
    };

    // Initialize form data if editing
    const initializeFormData = () => {
      if (props.isEdit && props.jobRequisition) {
        Object.keys(formData).forEach(key => {
          if (props.jobRequisition[key] !== undefined) {
            if (key === 'skills' && typeof props.jobRequisition[key] === 'string') {
              formData[key] = props.jobRequisition[key].split(', ').filter(skill => skill.trim());
            } else {
              formData[key] = props.jobRequisition[key];
            }
          }
        });
      }
    };

    // Watch for prop changes
    watch(() => props.jobRequisition, () => {
      if (props.isEdit) {
        initializeFormData();
      }
    }, { immediate: true });

    onMounted(() => {
      initializeFormData();
    });

    return {
      currentStep,
      loading,
      skillInput,
      formData,
      errors,
      departments,
      jobTypes,
      hiringManagers,
      canProceedToNextStep,
      isFormValid,
      nextStep,
      previousStep,
      addSkill,
      removeSkill,
      handleSubmit,
      handleOverlayClick
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.step-navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  position: relative;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 100%;
  width: 60px;
  height: 2px;
  background-color: #e5e5e5;
  z-index: 1;
}

.step.completed:not(:last-child)::after {
  background-color: #007bff;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e5e5e5;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 5px;
  position: relative;
  z-index: 2;
}

.step.active .step-number {
  background-color: #007bff;
  color: white;
}

.step.completed .step-number {
  background-color: #28a745;
  color: white;
}

.step-title {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.step.active .step-title {
  color: #007bff;
  font-weight: bold;
}

.form-step {
  min-height: 300px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group.full-width {
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #dc3545;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.skills-input {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.skills-input input {
  flex: 1;
}

.add-skill-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.add-skill-btn:hover {
  background-color: #0056b3;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.remove-skill {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.remove-skill:hover {
  background-color: #dc3545;
  color: white;
}

.form-navigation {
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e5e5;
}

.nav-spacer {
  flex: 1;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  margin-left: 10px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #1e7e34;
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    margin: 20px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
  
  .step {
    margin: 0 15px;
  }
  
  .step:not(:last-child)::after {
    width: 30px;
  }
}
</style>