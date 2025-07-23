<template>
  <div class="org-node">
    <!-- Company Node -->
    <div 
      v-if="node.isCompany" 
      class="company-node"
      :class="{ expanded: isExpanded }"
    >
      <div class="node-content company-content" @click="toggleExpanded">
        <div class="node-icon company-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L2 12h3v8h14v-8h3L12 3zm-2 5h4v2h-4V8zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2z"/>
          </svg>
        </div>
        <div class="node-info">
          <div class="node-title">{{ node.name || node.company_name }}</div>
          <div class="node-subtitle">{{ node.company_code }}</div>
        </div>
        <div class="node-actions">
          <button 
            class="action-btn add-btn" 
            @click.stop="$emit('add-profit-center', node)"
            title="Add Profit Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="action-btn edit-btn" 
            @click.stop="$emit('edit-node', node)"
            title="Edit Company"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            v-if="node.children && node.children.length > 0"
            class="action-btn expand-btn" 
            @click.stop="toggleExpanded"
            :title="isExpanded ? 'Collapse' : 'Expand'"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" :class="{ rotated: isExpanded }">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Profit Center Node -->
    <div 
      v-else-if="node.isProfitCenter" 
      class="profit-center-node"
      :class="{ expanded: isExpanded }"
    >
      <div class="node-content profit-center-content" @click="toggleExpanded">
        <div class="node-icon profit-center-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div class="node-info">
          <div class="node-title">{{ node.profit_center_name || node.name }}</div>
          <div class="node-subtitle">{{ node.profit_center_code }}</div>
          <div class="node-type">{{ node.center_type }}</div>
        </div>
        <div class="node-actions">
          <button 
            class="action-btn add-btn" 
            @click.stop="$emit('add-profit-center', node)"
            title="Add Sub Profit Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="action-btn add-cost-btn" 
            @click.stop="$emit('add-cost-center', node)"
            title="Add Cost Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="action-btn edit-btn" 
            @click.stop="$emit('edit-node', node)"
            title="Edit Profit Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            class="action-btn delete-btn" 
            @click.stop="$emit('delete-node', node)"
            title="Delete Profit Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 10-2 0v6a1 1 0 102 0V7zm3 0a1 1 0 10-2 0v6a1 1 0 102 0V7zm3 0a1 1 0 10-2 0v6a1 1 0 102 0V7z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            v-if="node.children && node.children.length > 0"
            class="action-btn expand-btn" 
            @click.stop="toggleExpanded"
            :title="isExpanded ? 'Collapse' : 'Expand'"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" :class="{ rotated: isExpanded }">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Profit Centers Group Header -->
    <div 
      v-else-if="node.isProfitCentersGroup" 
      class="group-header profit-centers-group"
      @click="toggleExpanded"
    >
      <div class="group-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
        </svg>
      </div>
      <span class="group-title">{{ node.name }}</span>
      <span class="group-count">({{ node.children?.length || 0 }})</span>
      <div class="group-actions">
        <button 
          class="action-btn add-btn" 
          @click.stop="$emit('add-profit-center', node.parent)"
          title="Add Profit Center"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="action-btn expand-btn" 
          @click.stop="toggleExpanded"
          :title="isExpanded ? 'Collapse' : 'Expand'"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" :class="{ rotated: isExpanded }">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Cost Centers Group Header -->
    <div 
      v-else-if="node.isCostCentersGroup" 
      class="group-header cost-centers-group"
      @click="toggleExpanded"
    >
      <div class="group-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <span class="group-title">{{ node.name }}</span>
      <span class="group-count">({{ node.children?.length || 0 }})</span>
      <div class="group-actions">
        <button 
          class="action-btn add-cost-btn" 
          @click.stop="$emit('add-cost-center', node.parent)"
          title="Add Cost Center"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="action-btn expand-btn" 
          @click.stop="toggleExpanded"
          :title="isExpanded ? 'Collapse' : 'Expand'"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" :class="{ rotated: isExpanded }">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Cost Center Node -->
    <div 
      v-else-if="node.isCostCenter" 
      class="cost-center-node"
    >
      <div class="node-content cost-center-content">
        <div class="node-icon cost-center-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="node-info">
          <div class="node-title">{{ node.cost_center_name || node.name }}</div>
          <div class="node-subtitle">{{ node.cost_center_code }}</div>
          <div class="node-type">{{ node.center_type }}</div>
        </div>
        <div class="node-actions">
          <button 
            class="action-btn add-cost-btn" 
            @click.stop="$emit('add-cost-center', node)"
            title="Add Sub Cost Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="action-btn edit-btn" 
            @click.stop="$emit('edit-cost-center', node, node.parent)"
            title="Edit Cost Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            class="action-btn delete-btn" 
            @click.stop="$emit('delete-cost-center', node)"
            title="Delete Cost Center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 10-2 0v6a1 1 0 102 0V7zm3 0a1 1 0 10-2 0v6a1 1 0 102 0V7zm3 0a1 1 0 10-2 0v6a1 1 0 102 0V7z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Children -->
    <div v-if="isExpanded && hasChildren" class="node-children">
      <div class="children-container">
        <!-- Render regular children (sub-profit centers, groups) -->
        <OrgNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :expanded-nodes="expandedNodes"
          @toggle-node="$emit('toggle-node', $event)"
          @add-profit-center="$emit('add-profit-center', $event)"
          @edit-node="$emit('edit-node', $event)"
          @delete-node="$emit('delete-node', $event)"
          @add-cost-center="$emit('add-cost-center', $event)"
          @edit-cost-center="$emit('edit-cost-center', $event, $event.parent)"
          @delete-cost-center="$emit('delete-cost-center', $event)"
        />
        
        <!-- Render cost centers for profit center -->
        <div v-if="node.isProfitCenter && node.costCenters && node.costCenters.length > 0" class="cost-centers-section">
          <div class="cost-centers-header">
            <div class="group-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span class="group-title">Cost Centers</span>
            <span class="group-count">({{ node.costCenters.length }})</span>
          </div>
          <div class="cost-centers-list">
            <div 
              v-for="costCenter in node.costCenters" 
              :key="costCenter.id"
              class="cost-center-item"
            >
              <div class="node-content cost-center-content">
                <div class="node-icon cost-center-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div class="node-info">
                  <div class="node-title">{{ costCenter.cost_center_name || costCenter.name }}</div>
                  <div class="node-subtitle">{{ costCenter.cost_center_code }}</div>
                  <div class="node-type">{{ costCenter.center_type }}</div>
                </div>
                <div class="node-actions">
                  <button 
                    class="action-btn add-cost-btn" 
                    @click.stop="$emit('add-cost-center', costCenter)"
                    title="Add Sub Cost Center"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    class="action-btn edit-btn" 
                    @click.stop="$emit('edit-cost-center', costCenter, node)"
                    title="Edit Cost Center"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    @click.stop="$emit('delete-cost-center', costCenter)"
                    title="Delete Cost Center"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 10-2 0v6a1 1 0 102 0V7zm3 0a1 1 0 10-2 0v6a1 1 0 102 0V7zm3 0a1 1 0 10-2 0v6a1 1 0 102 0V7z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'OrgNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    expandedNodes: {
      type: Set,
      required: true
    }
  },
  emits: [
    'toggle-node',
    'add-profit-center',
    'edit-node',
    'delete-node',
    'add-cost-center',
    'edit-cost-center',
    'delete-cost-center'
  ],
  setup(props, { emit }) {
    const isExpanded = computed(() => {
      return props.expandedNodes.has(props.node.id)
    })
    
    const hasChildren = computed(() => {
      return (props.node.children && props.node.children.length > 0) ||
             (props.node.isProfitCenter && props.node.costCenters && props.node.costCenters.length > 0)
    })
    
    const toggleExpanded = () => {
      emit('toggle-node', props.node.id)
    }
    
    return {
      isExpanded,
      hasChildren,
      toggleExpanded
    }
  }
}
</script>

<style scoped>
.org-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 280px;
  margin-bottom: 1rem;
}

/* Node Content Base Styles */
.node-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 280px;
  max-width: 400px;
}

.node-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Company Node */
.company-content {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.company-content:hover {
  border-color: #2563eb;
}

.company-icon {
  color: #3b82f6;
}

/* Profit Center Node */
.profit-center-content {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

.profit-center-content:hover {
  border-color: #059669;
}

.profit-center-icon {
  color: #10b981;
}

/* Cost Center Node */
.cost-center-content {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.cost-center-content:hover {
  border-color: #d97706;
}

.cost-center-icon {
  color: #f59e0b;
}

/* Node Icon */
.node-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  flex-shrink: 0;
}

.node-icon svg {
  width: 100%;
  height: 100%;
}

/* Node Info */
.node-info {
  flex: 1;
  min-width: 0;
}

.node-title {
  font-weight: 600;
  font-size: 14px;
  color: #111827;
  margin-bottom: 2px;
  word-break: break-word;
}

.node-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 2px;
}

.node-type {
  font-size: 10px;
  color: #9ca3af;
  text-transform: uppercase;
  font-weight: 500;
}

/* Node Actions */
.node-actions {
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

.action-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.add-btn {
  color: #10b981;
}

.add-btn:hover {
  background: #10b981;
  color: white;
}

.add-cost-btn {
  color: #f59e0b;
}

.add-cost-btn:hover {
  background: #f59e0b;
  color: white;
}

.edit-btn {
  color: #6b7280;
}

.edit-btn:hover {
  background: #6b7280;
  color: white;
}

.delete-btn {
  color: #ef4444;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
}

.expand-btn {
  color: #6b7280;
}

.expand-btn:hover {
  background: #6b7280;
  color: white;
}

.expand-btn svg {
  transition: transform 0.2s ease;
}

.expand-btn svg.rotated {
  transform: rotate(180deg);
}

/* Group Headers */
.group-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 8px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 280px;
  max-width: 400px;
}

.profit-centers-group {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #bbf7d0;
}

.profit-centers-group:hover {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}

.cost-centers-group {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
}

.cost-centers-group:hover {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.group-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: #6b7280;
}

.group-title {
  font-weight: 600;
  font-size: 13px;
  color: #374151;
  flex: 1;
}

.group-count {
  font-size: 11px;
  color: #9ca3af;
  margin-right: 8px;
}

.group-actions {
  display: flex;
  gap: 4px;
}

/* Children Container */
.node-children {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  position: relative;
}

.children-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  position: relative;
  padding: 10px;
}

/* Connection Lines for Horizontal Layout */
.node-children::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: #d1d5db;
}

/* Horizontal connector line */
.children-container::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #d1d5db;
  z-index: 1;
}

/* Vertical lines connecting to each child */
.children-container > .org-node::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: #d1d5db;
  z-index: 2;
}

/* Cost Centers Section */
.cost-centers-section {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cost-centers-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 6px;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
}

.cost-centers-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  position: relative;
}

.cost-center-item {
  position: relative;
}

/* Connection lines for cost centers */
.cost-centers-list::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: #fde68a;
  z-index: 1;
}

.cost-center-item::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: #fde68a;
  z-index: 2;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .children-container {
    gap: 40px;
  }
  
  .cost-centers-list {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .node-content,
  .group-header {
    min-width: 240px;
    max-width: 320px;
    padding: 10px 12px;
  }
  
  .node-title {
    font-size: 13px;
  }
  
  .node-subtitle {
    font-size: 11px;
  }
  
  .action-btn {
    width: 20px;
    height: 20px;
  }
  
  .action-btn svg {
    width: 12px;
    height: 12px;
  }
  
  /* Stack children vertically on mobile */
  .children-container {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .cost-centers-list {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  /* Adjust connection lines for mobile */
  .children-container::before,
  .cost-centers-list::before {
    display: none;
  }
  
  .children-container > .org-node::before,
  .cost-center-item::before {
    height: 15px;
    top: -15px;
  }
}
</style>
