<template>
  <div class="orgchart-content">
    <div class="orgchart-header">
      <div class="header-content">
        <div class="header-text">
          <h2 class="orgchart-title">Organization Chart</h2>
          <p class="orgchart-subtitle">Manage your company structure, profit centers, and cost centers</p>
        </div>
        <div class="header-actions">
          <button 
            @click="refreshChart" 
            class="refresh-btn" 
            :disabled="loading"
            title="Refresh Organization Chart"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" :class="{ 'rotating': loading }">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            <span>Refresh</span>
          </button>
          <button 
            @click="expandAll" 
            class="expand-all-btn"
            title="Expand All Nodes"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <span>Expand All</span>
          </button>
          <button 
            @click="collapseAll" 
            class="collapse-all-btn"
            title="Collapse All Nodes"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <span>Collapse All</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Loading Spinner -->
    <div v-if="loading" class="orgchart-loading">
      <div class="spinner"></div>
      <p>Loading organization chart...</p>
    </div>
    
    <!-- Organization Tree with Vertical Scroll -->
    <div v-else-if="treeData.length > 0" class="orgchart-container">
      <div class="orgchart-scroll-wrapper">
        <div class="orgchart-tree">
          <OrgNode
            v-for="node in treeData"
            :key="node.id"
            :node="node"
            :expanded-nodes="expandedNodes"
            @toggle-node="toggleNode"
            @add-profit-center="handleAddProfitCenter"
            @edit-node="handleEditNode"
            @delete-node="handleDeleteNode"
            @add-cost-center="handleAddCostCenter"
            @edit-cost-center="handleEditCostCenter"
            @delete-cost-center="handleDeleteCostCenter"
          />
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="orgchart-empty">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      </div>
      <h3>No Organization Data</h3>
      <p>There are no companies or organizational units to display.</p>
      <button @click="fetchOrgChart" class="retry-btn">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
        Retry Loading
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { OrganizationService } from '@/services/organizationService'
import { buildCompanyTree } from '@/utils/treeBuilder'
import OrgNode from './OrgNode.vue'
import Swal from 'sweetalert2'

export default {
  name: 'OrganizationChart',
  components: {
    OrgNode
  },
  setup() {
    const loading = ref(true)
    const treeData = ref([])
    const expandedNodes = reactive(new Set())
    
    // Fetch organization chart data
    const fetchOrgChart = async () => {
      try {
        loading.value = true
        
        // Fetch all companies
        const companies = await OrganizationService.getCompanies()
        
        // Fetch profit and cost centers for all companies in parallel
        const profitPromises = companies.map(c => 
          OrganizationService.getProfitCenters(c.id).catch(() => [])
        )
        const costPromises = companies.map(c => 
          OrganizationService.getCostCenters(c.id).catch(() => [])
        )
        
        const profitResults = await Promise.all(profitPromises)
        const costResults = await Promise.all(costPromises)
        
        // Flatten and annotate with company_id
        const profitCenters = profitResults.flat().map((pc, idx) => ({ 
          ...pc, 
          company_id: pc.company_id || companies[Math.floor(idx / profitResults.length)]?.id 
        }))
        
        const costCenters = costResults.flat().map((cc, idx) => ({ 
          ...cc, 
          company_id: cc.company_id || companies[Math.floor(idx / costResults.length)]?.id 
        }))
        
        // Build the tree from all companies
        const tree = buildCompanyTree(companies, profitCenters, costCenters)
        treeData.value = tree
        
      } catch (error) {
        console.error('Error fetching organization chart:', error)
        await Swal.fire({
          title: 'Error',
          text: 'Failed to fetch organization chart data.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      } finally {
        loading.value = false
      }
    }
    
    // Toggle node expansion
    const toggleNode = (nodeId) => {
      if (expandedNodes.has(nodeId)) {
        expandedNodes.delete(nodeId)
      } else {
        expandedNodes.add(nodeId)
      }
    }
    
    // Add profit center
    const handleAddProfitCenter = async (parentNode) => {
      let companyId = parentNode.companyId || parentNode.company_id || parentNode.id
      let parentProfitCenterId = null
      
      // If adding under a profit center, set parent_profit_center_id
      if (parentNode.isProfitCenter) {
        parentProfitCenterId = parentNode.id
        companyId = parentNode.company_id || parentNode.companyId
      }
      
      const { value: formValues } = await Swal.fire({
        title: 'Add Profit Center',
        html: `
          <input id="swal-profit-code" class="swal2-input" placeholder="Profit Center Code">
          <input id="swal-profit-name" class="swal2-input" placeholder="Profit Center Name">
          <input id="swal-center-type" class="swal2-input" placeholder="Center Type (e.g. DIVISION)">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const profit_center_code = document.getElementById('swal-profit-code').value
          const profit_center_name = document.getElementById('swal-profit-name').value
          const center_type = document.getElementById('swal-center-type').value
          
          if (!profit_center_code || !profit_center_name || !center_type) {
            Swal.showValidationMessage('All fields are required')
            return
          }
          
          return { profit_center_code, profit_center_name, center_type }
        }
      })
      
      if (!formValues) return
      
      try {
        await OrganizationService.createProfitCenter(companyId, {
          company_id: companyId,
          profit_center_code: formValues.profit_center_code,
          profit_center_name: formValues.profit_center_name,
          name: formValues.profit_center_name,
          parent_profit_center_id: parentProfitCenterId,
          is_active: true,
          center_type: formValues.center_type
        })
        
        await Swal.fire('Success', 'Profit center added successfully.', 'success')
        await fetchOrgChart()
        expandedNodes.add(parentNode.id)
        
      } catch (error) {
        console.error('Error adding profit center:', error)
        await Swal.fire('Error', 'Failed to add profit center.', 'error')
      }
    }
    
    // Edit node (company or profit center)
    const handleEditNode = async (node) => {
      const isProfitCenter = node?.isProfitCenter === true || 
        (!!node?.profit_center_code && !!node?.profit_center_name)
      
      const isCompany = !isProfitCenter && 
        !node.isCostCenter && 
        !node.isProfitCentersGroup && 
        !node.isCostCentersGroup && 
        !node.parent_profit_center_id && 
        !node.parent_cost_center_id
      
      // Edit Profit Center
      if (isProfitCenter) {
        const companyId = node.companyId || node.company_id
        
        const { value: formValues } = await Swal.fire({
          title: 'Edit Profit Center',
          html: `
            <input id="swal-profit-code" class="swal2-input" placeholder="Profit Center Code" value="${node.profit_center_code || ''}">
            <input id="swal-profit-name" class="swal2-input" placeholder="Profit Center Name" value="${node.profit_center_name || node.name || ''}">
            <input id="swal-center-type" class="swal2-input" placeholder="Center Type (e.g. DIVISION)" value="${node.center_type || ''}">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Update',
          cancelButtonText: 'Cancel',
          preConfirm: () => {
            const profit_center_code = document.getElementById('swal-profit-code').value
            const profit_center_name = document.getElementById('swal-profit-name').value
            const center_type = document.getElementById('swal-center-type').value
            
            if (!profit_center_code || !profit_center_name || !center_type) {
              Swal.showValidationMessage('All fields are required')
              return
            }
            
            return { profit_center_code, profit_center_name, center_type }
          }
        })
        
        if (!formValues) return
        
        try {
          await OrganizationService.updateProfitCenter(node.id, {
            company_id: companyId,
            profit_center_code: formValues.profit_center_code,
            profit_center_name: formValues.profit_center_name,
            name: formValues.profit_center_name,
            parent_profit_center_id: node.parent_profit_center_id,
            is_active: node.is_active,
            center_type: formValues.center_type
          })
          
          await Swal.fire('Success', 'Profit center updated successfully.', 'success')
          await fetchOrgChart()
          
        } catch (error) {
          console.error('Error updating profit center:', error)
          await Swal.fire('Error', 'Failed to update profit center.', 'error')
        }
        return
      }
      
      // Edit Company
      if (isCompany) {
        const { value: formValues } = await Swal.fire({
          title: 'Edit Company',
          html: `
            <input id="swal-company-code" class="swal2-input" placeholder="Company Code" value="${node.company_code || ''}">
            <input id="swal-company-name" class="swal2-input" placeholder="Company Name" value="${node.name || ''}">
            <input id="swal-legal-name" class="swal2-input" placeholder="Legal Name" value="${node.legal_name || ''}">
            <input id="swal-company-type" class="swal2-input" placeholder="Company Type (e.g. HOLDING)" value="${node.company_type || ''}">
            <input id="swal-parent-company-id" class="swal2-input" placeholder="Parent Company ID (optional)" value="${node.parent_company_id || ''}">
            <input id="swal-functional-currency-id" class="swal2-input" placeholder="Functional Currency ID (optional)" value="${node.functional_currency_id || ''}">
            <input id="swal-reporting-currency-id" class="swal2-input" placeholder="Reporting Currency ID (optional)" value="${node.reporting_currency_id || ''}">
            <input id="swal-consolidation-method" class="swal2-input" placeholder="Consolidation Method (e.g. FULL)" value="${node.consolidation_method || ''}">
            <input id="swal-address" class="swal2-input" placeholder="Address" value="${node.address || ''}">
            <input id="swal-tax-id" class="swal2-input" placeholder="Tax ID" value="${node.tax_id || ''}">
            <input id="swal-registration-number" class="swal2-input" placeholder="Registration Number" value="${node.registration_number || ''}">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Update',
          cancelButtonText: 'Cancel',
          preConfirm: () => {
            return {
              company_code: document.getElementById('swal-company-code').value,
              company_name: document.getElementById('swal-company-name').value,
              legal_name: document.getElementById('swal-legal-name').value,
              company_type: document.getElementById('swal-company-type').value,
              parent_company_id: document.getElementById('swal-parent-company-id').value || null,
              functional_currency_id: document.getElementById('swal-functional-currency-id').value || null,
              reporting_currency_id: document.getElementById('swal-reporting-currency-id').value || null,
              consolidation_method: document.getElementById('swal-consolidation-method').value,
              address: document.getElementById('swal-address').value,
              tax_id: document.getElementById('swal-tax-id').value,
              registration_number: document.getElementById('swal-registration-number').value,
            }
          }
        })
        
        if (!formValues) return
        
        try {
          const payload = Object.fromEntries(
            Object.entries(formValues).filter(([, v]) => v !== null && v !== undefined && v !== '')
          )
          
          await OrganizationService.updateCompany(node.id, payload)
          await Swal.fire('Success', 'Company updated successfully!', 'success')
          await fetchOrgChart()
          
        } catch (error) {
          console.error('Error updating company:', error)
          await Swal.fire('Error', error?.response?.data?.message || 'Failed to update company.', 'error')
        }
      }
    }
    
    // Delete node (profit center)
    const handleDeleteNode = async (node) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the profit center and all its children. Continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
      
      if (!result.isConfirmed) return
      
      try {
        await OrganizationService.deleteProfitCenter(node.id)
        await Swal.fire('Deleted!', 'Profit center deleted successfully.', 'success')
        await fetchOrgChart()
        
      } catch (error) {
        console.error('Error deleting profit center:', error)
        await Swal.fire('Error', 'Failed to delete profit center.', 'error')
      }
    }
    
    // Add cost center
    const handleAddCostCenter = async (parentNode) => {
      // Determine companyId based on node type
      let companyId = parentNode.companyId || parentNode.company_id || parentNode.id
      let parent_cost_center_id = null
      let profit_center_id = null
      
      // If adding under a profit center node
      if (parentNode.isProfitCenter) {
        profit_center_id = parentNode.id
      } else if (parentNode.isCostCenter) {
        parent_cost_center_id = parentNode.id
      }
      
      const { value: formValues } = await Swal.fire({
        title: 'Add Cost Center',
        html: `
          <input id="swal-cost-code" class="swal2-input" placeholder="Cost Center Code">
          <input id="swal-cost-name" class="swal2-input" placeholder="Cost Center Name">
          <input id="swal-name" class="swal2-input" placeholder="Name">
          <input id="swal-center-type" class="swal2-input" placeholder="Center Type (e.g. PROFIT)">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const cost_center_code = document.getElementById('swal-cost-code').value
          const cost_center_name = document.getElementById('swal-cost-name').value
          const name = document.getElementById('swal-name').value
          const center_type = document.getElementById('swal-center-type').value
          
          if (!cost_center_code || !cost_center_name || !name || !center_type) {
            Swal.showValidationMessage('All fields are required')
            return
          }
          
          return { cost_center_code, cost_center_name, name, center_type }
        }
      })
      
      if (!formValues) return
      
      try {
        await OrganizationService.createCostCenter(companyId, {
          company_id: companyId,
          cost_center_code: formValues.cost_center_code,
          cost_center_name: formValues.cost_center_name,
          name: formValues.name,
          center_type: formValues.center_type,
          parent_cost_center_id,
          profit_center_id,
          is_active: true
        })
        
        await Swal.fire('Success', 'Cost center added successfully.', 'success')
        await fetchOrgChart()
        expandedNodes.add(parentNode.id)
        
      } catch (error) {
        console.error('Error adding cost center:', error)
        await Swal.fire('Error', 'Failed to add cost center.', 'error')
      }
    }
    
    // Edit cost center
    const handleEditCostCenter = async (costNode, parentNode) => {
      const companyId = costNode.companyId || costNode.company_id || parentNode.companyId || parentNode.company_id
      
      const { value: formValues } = await Swal.fire({
        title: 'Edit Cost Center',
        html: `
          <input id="swal-cost-code" class="swal2-input" placeholder="Cost Center Code" value="${costNode.cost_center_code || ''}">
          <input id="swal-cost-name" class="swal2-input" placeholder="Cost Center Name" value="${costNode.cost_center_name || costNode.name || ''}">
          <input id="swal-name" class="swal2-input" placeholder="Name" value="${costNode.name || ''}">
          <input id="swal-center-type" class="swal2-input" placeholder="Center Type (e.g. PROFIT)" value="${costNode.center_type || 'PROFIT'}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const cost_center_code = document.getElementById('swal-cost-code').value
          const cost_center_name = document.getElementById('swal-cost-name').value
          const name = document.getElementById('swal-name').value
          const center_type = document.getElementById('swal-center-type').value
          
          if (!cost_center_code || !cost_center_name || !name || !center_type) {
            Swal.showValidationMessage('All fields are required')
            return
          }
          
          return { cost_center_code, cost_center_name, name, center_type }
        }
      })
      
      if (!formValues) return
      
      try {
        await OrganizationService.updateCostCenter(costNode.id, {
          company_id: companyId,
          cost_center_code: formValues.cost_center_code,
          cost_center_name: formValues.cost_center_name,
          name: formValues.name,
          center_type: formValues.center_type,
          parent_cost_center_id: costNode.parent_cost_center_id,
          profit_center_id: parentNode.isProfitCenter ? parentNode.id : null,
          is_active: costNode.is_active
        })
        
        await Swal.fire('Success', 'Cost center updated successfully.', 'success')
        await fetchOrgChart()
        
      } catch (error) {
        console.error('Error updating cost center:', error)
        await Swal.fire('Error', 'Failed to update cost center.', 'error')
      }
    }
    
    // Delete cost center
    const handleDeleteCostCenter = async (costNode) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the cost center. Continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
      
      if (!result.isConfirmed) return
      
      try {
        await OrganizationService.deleteCostCenter(costNode.id)
        await Swal.fire('Deleted!', 'Cost center deleted successfully.', 'success')
        await fetchOrgChart()
        
      } catch (error) {
        console.error('Error deleting cost center:', error)
        await Swal.fire('Error', 'Failed to delete cost center.', 'error')
      }
    }
    
    // Refresh chart data
    const refreshChart = async () => {
      await fetchOrgChart()
      await Swal.fire({
        title: 'Refreshed',
        text: 'Organization chart data has been refreshed successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
    }
    
    // Collect all node IDs recursively
    const collectNodeIds = (nodes) => {
      const ids = []
      for (const node of nodes) {
        ids.push(node.id)
        if (node.children && node.children.length > 0) {
          ids.push(...collectNodeIds(node.children))
        }
        if (node.costCenters && node.costCenters.length > 0) {
          ids.push(...collectNodeIds(node.costCenters))
        }
      }
      return ids
    }
    
    // Expand all nodes
    const expandAll = () => {
      const allNodeIds = collectNodeIds(treeData.value)
      expandedNodes.clear()
      allNodeIds.forEach(id => expandedNodes.add(id))
    }
    
    // Collapse all nodes
    const collapseAll = () => {
      expandedNodes.clear()
    }
    
    // Initialize component
    onMounted(() => {
      fetchOrgChart()
    })
    
    return {
      loading,
      treeData,
      expandedNodes,
      fetchOrgChart,
      refreshChart,
      expandAll,
      collapseAll,
      toggleNode,
      handleAddProfitCenter,
      handleEditNode,
      handleDeleteNode,
      handleAddCostCenter,
      handleEditCostCenter,
      handleDeleteCostCenter
    }
  }
}
</script>

<style scoped>
.orgchart-content {
  padding: 2rem;
  background: #ffffff;
  min-height: calc(100vh - 140px);
  border-radius: 8px;
  margin: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
}

.orgchart-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-text {
  text-align: left;
}

.orgchart-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.orgchart-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.refresh-btn,
.expand-all-btn,
.collapse-all-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover,
.expand-all-btn:hover,
.collapse-all-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.refresh-btn svg,
.expand-all-btn svg,
.collapse-all-btn svg {
  width: 1rem;
  height: 1rem;
}

.refresh-btn svg.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.orgchart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.orgchart-scroll-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fafafa;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.orgchart-scroll-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.orgchart-scroll-wrapper::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.orgchart-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.orgchart-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.orgchart-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  min-width: max-content;
}

.orgchart-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.orgchart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #6b7280;
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.orgchart-empty h3 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 1.5rem;
}

.orgchart-empty p {
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.retry-btn svg {
  width: 16px;
  height: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .orgchart-content {
    margin: 0.5rem;
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-text {
    text-align: center;
  }
  
  .orgchart-title {
    font-size: 2rem;
  }
  
  .orgchart-subtitle {
    font-size: 1rem;
  }
  
  .header-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .refresh-btn,
  .expand-all-btn,
  .collapse-all-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .orgchart-tree {
    padding: 1rem;
    gap: 1.5rem;
  }
}
</style>
