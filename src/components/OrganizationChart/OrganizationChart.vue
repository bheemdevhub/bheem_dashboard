<template>
  <div class="organization-chart">
    <!-- Header Section -->
    <div class="chart-header">
      <h1 class="chart-title">
        <i class="fas fa-sitemap"></i>
        Organization Chart
      </h1>
      <div class="chart-controls">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search companies, profit centers, cost centers..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        <button
          @click="refreshData"
          class="action-btn refresh"
          :disabled="loading"
          title="Refresh Data"
        >
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Refresh
        </button>
        <button
          @click="openAddCompanyModal"
          class="action-btn add"
          title="Add New Company"
        >
          <i class="fas fa-plus"></i>
          Add Company
        </button>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="chart-stats" v-if="!loading && !error">
      <div class="stat-card companies-stat">
        <div class="stat-number">{{ stats.companies }}</div>
        <div class="stat-label">Companies</div>
      </div>
      <div class="stat-card profit-centers-stat">
        <div class="stat-number">{{ stats.profitCenters }}</div>
        <div class="stat-label">Profit Centers</div>
      </div>
      <div class="stat-card cost-centers-stat">
        <div class="stat-number">{{ stats.costCenters }}</div>
        <div class="stat-label">Cost Centers</div>
      </div>
    </div>

    <!-- Main Chart Container -->
    <div class="chart-container">
      <div class="chart-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading organization chart...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <i class="fas fa-exclamation-triangle error-icon"></i>
          <div class="error-message">{{ error }}</div>
          <button @click="refreshData" class="retry-btn">
            <i class="fas fa-retry"></i>
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredTree.length === 0" class="empty-state">
          <i class="fas fa-building empty-icon"></i>
          <div class="empty-message">No companies found</div>
          <div class="empty-submessage">
            {{ searchTerm ? 'No results match your search criteria.' : 'Start by adding your first company to build the organization chart.' }}
          </div>
          <button v-if="!searchTerm" @click="openAddCompanyModal" class="add-company-btn">
            <i class="fas fa-plus"></i>
            Add First Company
          </button>
        </div>

        <!-- Organization Tree -->
        <div v-else class="tree-container">
          <div
            v-for="company in filteredTree"
            :key="company.id"
            class="tree-node company-node"
          >
            <!-- Company Node -->
            <div
              class="node-card company"
              :class="{ highlighted: isHighlighted(company) }"
              @click="selectNode(company)"
            >
              <i class="fas fa-building node-icon"></i>
              <div class="node-title">{{ company.name }}</div>
              <div class="node-code" v-if="company.code">{{ company.code }}</div>
              <div class="node-description" v-if="company.description">
                {{ company.description }}
              </div>
              
              <div class="node-actions">
                <button
                  @click.stop="editNode(company)"
                  class="action-btn edit"
                  title="Edit Company"
                >
                  <i class="fas fa-edit"></i>
                  Edit
                </button>
                <button
                  @click.stop="deleteNode(company)"
                  class="action-btn delete"
                  title="Delete Company"
                >
                  <i class="fas fa-trash"></i>
                  Delete
                </button>
                <button
                  @click.stop="addProfitCenter(company)"
                  class="action-btn add"
                  title="Add Profit Center"
                >
                  <i class="fas fa-plus"></i>
                  Add PC
                </button>
              </div>

              <!-- Expand/Collapse Toggle -->
              <button
                v-if="company.children && company.children.length > 0"
                @click.stop="toggleExpand(company.id)"
                class="expand-toggle"
                :title="expandedNodes.has(company.id) ? 'Collapse' : 'Expand'"
              >
                <i class="fas" :class="expandedNodes.has(company.id) ? 'fa-minus' : 'fa-plus'"></i>
              </button>
            </div>

            <!-- Profit Centers -->
            <div
              v-if="company.children && company.children.length > 0 && expandedNodes.has(company.id)"
              class="node-children"
            >
              <div class="tree-level">
                <div
                  v-for="profitCenter in company.children"
                  :key="profitCenter.id"
                  class="tree-node profit-center-node"
                >
                  <!-- Profit Center Node -->
                  <div
                    class="node-card profit-center"
                    :class="{ highlighted: isHighlighted(profitCenter) }"
                    @click="selectNode(profitCenter)"
                  >
                    <i class="fas fa-chart-pie node-icon"></i>
                    <div class="node-title">{{ profitCenter.name }}</div>
                    <div class="node-code" v-if="profitCenter.code">{{ profitCenter.code }}</div>
                    <div class="node-description" v-if="profitCenter.description">
                      {{ profitCenter.description }}
                    </div>
                    
                    <div class="node-actions">
                      <button
                        @click.stop="editNode(profitCenter)"
                        class="action-btn edit"
                        title="Edit Profit Center"
                      >
                        <i class="fas fa-edit"></i>
                        Edit
                      </button>
                      <button
                        @click.stop="deleteNode(profitCenter)"
                        class="action-btn delete"
                        title="Delete Profit Center"
                      >
                        <i class="fas fa-trash"></i>
                        Delete
                      </button>
                      <button
                        @click.stop="addCostCenter(profitCenter)"
                        class="action-btn add"
                        title="Add Cost Center"
                      >
                        <i class="fas fa-plus"></i>
                        Add CC
                      </button>
                    </div>

                    <!-- Expand/Collapse Toggle -->
                    <button
                      v-if="profitCenter.children && profitCenter.children.length > 0"
                      @click.stop="toggleExpand(profitCenter.id)"
                      class="expand-toggle"
                      :title="expandedNodes.has(profitCenter.id) ? 'Collapse' : 'Expand'"
                    >
                      <i class="fas" :class="expandedNodes.has(profitCenter.id) ? 'fa-minus' : 'fa-plus'"></i>
                    </button>
                  </div>

                  <!-- Cost Centers -->
                  <div
                    v-if="profitCenter.children && profitCenter.children.length > 0 && expandedNodes.has(profitCenter.id)"
                    class="node-children"
                  >
                    <div class="tree-level">
                      <div
                        v-for="costCenter in profitCenter.children"
                        :key="costCenter.id"
                        class="tree-node cost-center-node"
                      >
                        <!-- Cost Center Node -->
                        <div
                          class="node-card cost-center"
                          :class="{ highlighted: isHighlighted(costCenter) }"
                          @click="selectNode(costCenter)"
                        >
                          <i class="fas fa-coins node-icon"></i>
                          <div class="node-title">{{ costCenter.name }}</div>
                          <div class="node-code" v-if="costCenter.code">{{ costCenter.code }}</div>
                          <div class="node-description" v-if="costCenter.description">
                            {{ costCenter.description }}
                          </div>
                          
                          <div class="node-actions">
                            <button
                              @click.stop="editNode(costCenter)"
                              class="action-btn edit"
                              title="Edit Cost Center"
                            >
                              <i class="fas fa-edit"></i>
                              Edit
                            </button>
                            <button
                              @click.stop="deleteNode(costCenter)"
                              class="action-btn delete"
                              title="Delete Cost Center"
                            >
                              <i class="fas fa-trash"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals will be added here -->
    <!-- Add/Edit Company Modal -->
    <!-- Add/Edit Profit Center Modal -->
    <!-- Add/Edit Cost Center Modal -->
    <!-- Delete Confirmation Modal -->
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import { organizationChartService } from './services/organizationChartService.js'
import { buildCompanyTree, searchNodes, getNodeCounts } from './utils/treeUtils.js'
import './styles/OrganizationChart.css'

export default {
  name: 'OrganizationChart',
  setup() {
    // Reactive state
    const loading = ref(false)
    const error = ref(null)
    const searchTerm = ref('')
    const selectedNode = ref(null)
    const expandedNodes = ref(new Set())

    // Data state
    const organizationData = reactive({
      companies: [],
      profitCenters: [],
      costCenters: []
    })

    // Computed properties
    const organizationTree = computed(() => {
      return buildCompanyTree(
        organizationData.companies,
        organizationData.profitCenters,
        organizationData.costCenters
      )
    })

    const filteredTree = computed(() => {
      if (!searchTerm.value.trim()) {
        return organizationTree.value
      }

      return searchNodes(organizationTree.value, searchTerm.value.trim())
        .reduce((acc, node) => {
          // Find the root company for this node
          let rootCompany = node
          while (rootCompany.type !== 'company') {
            // This is a simplified approach; in a real implementation,
            // you'd need to traverse up the tree to find the parent company
            break
          }

          // Add unique companies to the result
          if (rootCompany.type === 'company' && !acc.find(c => c.id === rootCompany.id)) {
            acc.push(rootCompany)
          }

          return acc
        }, [])
    })

    const stats = computed(() => {
      return getNodeCounts(organizationTree.value)
    })

    // Methods
    const loadOrganizationData = async () => {
      loading.value = true
      error.value = null

      try {
        const data = await organizationChartService.getOrganizationData()
        
        organizationData.companies = data.companies || []
        organizationData.profitCenters = data.profitCenters || []
        organizationData.costCenters = data.costCenters || []

        // Auto-expand all nodes initially
        expandAllNodes()
      } catch (err) {
        console.error('Error loading organization data:', err)
        error.value = err.message || 'Failed to load organization data'
      } finally {
        loading.value = false
      }
    }

    const refreshData = () => {
      loadOrganizationData()
    }

    const expandAllNodes = () => {
      const allNodes = []
      
      const collectNodes = (nodes) => {
        nodes.forEach(node => {
          allNodes.push(node.id)
          if (node.children && node.children.length > 0) {
            collectNodes(node.children)
          }
        })
      }

      collectNodes(organizationTree.value)
      expandedNodes.value = new Set(allNodes)
    }

    const toggleExpand = (nodeId) => {
      if (expandedNodes.value.has(nodeId)) {
        expandedNodes.value.delete(nodeId)
      } else {
        expandedNodes.value.add(nodeId)
      }
      // Trigger reactivity
      expandedNodes.value = new Set(expandedNodes.value)
    }

    const selectNode = (node) => {
      selectedNode.value = node
      console.log('Selected node:', node)
    }

    const isHighlighted = (node) => {
      if (!searchTerm.value.trim()) return false
      
      const term = searchTerm.value.toLowerCase()
      const name = (node.name || '').toLowerCase()
      const code = (node.code || '').toLowerCase()
      const description = (node.description || '').toLowerCase()

      return name.includes(term) || code.includes(term) || description.includes(term)
    }

    const handleSearch = () => {
      // Search is handled by computed property
      // Optionally expand nodes that contain search results
      if (searchTerm.value.trim()) {
        const searchResults = searchNodes(organizationTree.value, searchTerm.value.trim())
        const nodeIds = searchResults.map(node => node.id)
        expandedNodes.value = new Set([...expandedNodes.value, ...nodeIds])
      }
    }

    // CRUD Operations
    const openAddCompanyModal = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Add New Company',
        html: `
          <div style="text-align: left;">
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 600;">Company Name *</label>
              <input id="company-name" class="swal2-input" placeholder="Enter company name" style="margin: 0; width: 100%;">
            </div>
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 600;">Company Code</label>
              <input id="company-code" class="swal2-input" placeholder="Enter company code" style="margin: 0; width: 100%;">
            </div>
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description</label>
              <textarea id="company-description" class="swal2-textarea" placeholder="Enter description" style="margin: 0; width: 100%; min-height: 80px;"></textarea>
            </div>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Add Company',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const name = document.getElementById('company-name').value
          const code = document.getElementById('company-code').value
          const description = document.getElementById('company-description').value

          if (!name.trim()) {
            Swal.showValidationMessage('Company name is required')
            return false
          }

          return { name: name.trim(), code: code.trim(), description: description.trim() }
        }
      })

      if (formValues) {
        await createCompany(formValues)
      }
    }

    const createCompany = async (companyData) => {
      try {
        loading.value = true
        const newCompany = await organizationChartService.createCompany(companyData)
        organizationData.companies.push(newCompany)
        
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Company created successfully',
          timer: 2000,
          showConfirmButton: false
        })
      } catch (err) {
        console.error('Error creating company:', err)
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message || 'Failed to create company'
        })
      } finally {
        loading.value = false
      }
    }

    const editNode = async (node) => {
      console.log('Edit node:', node)
      // TODO: Implement edit functionality based on node type
    }

    const deleteNode = async (node) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `This will permanently delete "${node.name}" and all its children.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#95a5a6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      })

      if (result.isConfirmed) {
        try {
          loading.value = true
          
          if (node.type === 'company') {
            await organizationChartService.deleteCompany(node.data.id)
            organizationData.companies = organizationData.companies.filter(c => c.id !== node.data.id)
          } else if (node.type === 'profit-center') {
            await organizationChartService.deleteProfitCenter(node.data.id)
            organizationData.profitCenters = organizationData.profitCenters.filter(pc => pc.id !== node.data.id)
          } else if (node.type === 'cost-center') {
            await organizationChartService.deleteCostCenter(node.data.id)
            organizationData.costCenters = organizationData.costCenters.filter(cc => cc.id !== node.data.id)
          }

          await Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${node.name} has been deleted.`,
            timer: 2000,
            showConfirmButton: false
          })
        } catch (err) {
          console.error('Error deleting node:', err)
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message || 'Failed to delete item'
          })
        } finally {
          loading.value = false
        }
      }
    }

    const addProfitCenter = async (company) => {
      console.log('Add profit center to company:', company)
      // TODO: Implement add profit center functionality
    }

    const addCostCenter = async (profitCenter) => {
      console.log('Add cost center to profit center:', profitCenter)
      // TODO: Implement add cost center functionality
    }

    // Lifecycle
    onMounted(() => {
      loadOrganizationData()
    })

    // Watch for search term changes
    watch(searchTerm, (newTerm) => {
      if (newTerm.trim()) {
        handleSearch()
      }
    })

    return {
      // State
      loading,
      error,
      searchTerm,
      selectedNode,
      expandedNodes,
      organizationData,

      // Computed
      organizationTree,
      filteredTree,
      stats,

      // Methods
      loadOrganizationData,
      refreshData,
      toggleExpand,
      selectNode,
      isHighlighted,
      handleSearch,
      openAddCompanyModal,
      editNode,
      deleteNode,
      addProfitCenter,
      addCostCenter
    }
  }
}
</script>
