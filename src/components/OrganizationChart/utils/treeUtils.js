/**
 * Tree utilities for organization chart
 */

/**
 * Build hierarchical tree structure from flat data
 * @param {Array} companies - Array of company objects
 * @param {Array} profitCenters - Array of profit center objects
 * @param {Array} costCenters - Array of cost center objects
 * @returns {Array} Hierarchical tree structure
 */
export function buildCompanyTree(companies, profitCenters, costCenters) {
  if (!companies || !Array.isArray(companies)) {
    return []
  }

  return companies.map(company => {
    // Find profit centers for this company
    const companyProfitCenters = profitCenters
      ? profitCenters.filter(pc => pc.companyId === company.id || pc.company_id === company.id)
      : []

    // Build profit center nodes with their cost centers
    const profitCenterNodes = companyProfitCenters.map(profitCenter => {
      // Find cost centers for this profit center
      const profitCenterCostCenters = costCenters
        ? costCenters.filter(cc => 
            cc.profitCenterId === profitCenter.id || 
            cc.profit_center_id === profitCenter.id
          )
        : []

      // Build cost center nodes
      const costCenterNodes = profitCenterCostCenters.map(costCenter => ({
        id: `cost-center-${costCenter.id}`,
        type: 'cost-center',
        data: costCenter,
        name: costCenter.name || costCenter.title || `Cost Center ${costCenter.id}`,
        code: costCenter.code || '',
        description: costCenter.description || '',
        children: []
      }))

      return {
        id: `profit-center-${profitCenter.id}`,
        type: 'profit-center',
        data: profitCenter,
        name: profitCenter.name || profitCenter.title || `Profit Center ${profitCenter.id}`,
        code: profitCenter.code || '',
        description: profitCenter.description || '',
        children: costCenterNodes
      }
    })

    return {
      id: `company-${company.id}`,
      type: 'company',
      data: company,
      name: company.name || company.title || `Company ${company.id}`,
      code: company.code || '',
      description: company.description || '',
      children: profitCenterNodes
    }
  })
}

/**
 * Flatten tree structure back to arrays
 * @param {Array} tree - Hierarchical tree structure
 * @returns {object} Object with companies, profitCenters, and costCenters arrays
 */
export function flattenTree(tree) {
  const companies = []
  const profitCenters = []
  const costCenters = []

  tree.forEach(companyNode => {
    if (companyNode.type === 'company') {
      companies.push(companyNode.data)

      companyNode.children?.forEach(profitCenterNode => {
        if (profitCenterNode.type === 'profit-center') {
          profitCenters.push(profitCenterNode.data)

          profitCenterNode.children?.forEach(costCenterNode => {
            if (costCenterNode.type === 'cost-center') {
              costCenters.push(costCenterNode.data)
            }
          })
        }
      })
    }
  })

  return { companies, profitCenters, costCenters }
}

/**
 * Find node in tree by ID
 * @param {Array} tree - Tree structure to search
 * @param {string} nodeId - Node ID to find
 * @returns {object|null} Found node or null
 */
export function findNodeById(tree, nodeId) {
  for (const node of tree) {
    if (node.id === nodeId) {
      return node
    }

    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, nodeId)
      if (found) {
        return found
      }
    }
  }

  return null
}

/**
 * Find parent node of a given node
 * @param {Array} tree - Tree structure to search
 * @param {string} nodeId - Node ID to find parent for
 * @param {object} parent - Parent node (used in recursion)
 * @returns {object|null} Parent node or null
 */
export function findParentNode(tree, nodeId, parent = null) {
  for (const node of tree) {
    if (node.id === nodeId) {
      return parent
    }

    if (node.children && node.children.length > 0) {
      const found = findParentNode(node.children, nodeId, node)
      if (found) {
        return found
      }
    }
  }

  return null
}

/**
 * Update node in tree
 * @param {Array} tree - Tree structure to update
 * @param {string} nodeId - Node ID to update
 * @param {object} newData - New node data
 * @returns {Array} Updated tree
 */
export function updateNodeInTree(tree, nodeId, newData) {
  return tree.map(node => {
    if (node.id === nodeId) {
      return { ...node, ...newData }
    }

    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, newData)
      }
    }

    return node
  })
}

/**
 * Remove node from tree
 * @param {Array} tree - Tree structure to update
 * @param {string} nodeId - Node ID to remove
 * @returns {Array} Updated tree
 */
export function removeNodeFromTree(tree, nodeId) {
  return tree
    .filter(node => node.id !== nodeId)
    .map(node => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: removeNodeFromTree(node.children, nodeId)
        }
      }
      return node
    })
}

/**
 * Add node to tree
 * @param {Array} tree - Tree structure to update
 * @param {string} parentId - Parent node ID (null for root level)
 * @param {object} newNode - New node to add
 * @returns {Array} Updated tree
 */
export function addNodeToTree(tree, parentId, newNode) {
  if (!parentId) {
    // Add to root level
    return [...tree, newNode]
  }

  return tree.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode]
      }
    }

    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode)
      }
    }

    return node
  })
}

/**
 * Get all nodes of a specific type
 * @param {Array} tree - Tree structure to search
 * @param {string} nodeType - Type of nodes to find
 * @returns {Array} Array of nodes of the specified type
 */
export function getNodesByType(tree, nodeType) {
  const nodes = []

  function traverse(nodes_to_traverse) {
    nodes_to_traverse.forEach(node => {
      if (node.type === nodeType) {
        nodes.push(node)
      }

      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }

  traverse(tree)
  return nodes
}

/**
 * Count nodes by type
 * @param {Array} tree - Tree structure to analyze
 * @returns {object} Object with counts for each node type
 */
export function getNodeCounts(tree) {
  const counts = {
    companies: 0,
    'profit-centers': 0,
    'cost-centers': 0
  }

  function traverse(nodes) {
    nodes.forEach(node => {
      if (node.type === 'company') {
        counts.companies++
      } else if (node.type === 'profit-center') {
        counts['profit-centers']++
      } else if (node.type === 'cost-center') {
        counts['cost-centers']++
      }

      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }

  traverse(tree)
  return counts
}

/**
 * Search nodes by name or code
 * @param {Array} tree - Tree structure to search
 * @param {string} searchTerm - Search term
 * @returns {Array} Array of matching nodes
 */
export function searchNodes(tree, searchTerm) {
  const results = []
  const term = searchTerm.toLowerCase()

  function traverse(nodes) {
    nodes.forEach(node => {
      const name = (node.name || '').toLowerCase()
      const code = (node.code || '').toLowerCase()
      const description = (node.description || '').toLowerCase()

      if (name.includes(term) || code.includes(term) || description.includes(term)) {
        results.push(node)
      }

      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }

  traverse(tree)
  return results
}

/**
 * Get node path (breadcrumb) from root to specific node
 * @param {Array} tree - Tree structure to search
 * @param {string} nodeId - Node ID to find path for
 * @returns {Array} Array of node names forming the path
 */
export function getNodePath(tree, nodeId) {
  function findPath(nodes, targetId, currentPath = []) {
    for (const node of nodes) {
      const newPath = [...currentPath, node.name]

      if (node.id === targetId) {
        return newPath
      }

      if (node.children && node.children.length > 0) {
        const found = findPath(node.children, targetId, newPath)
        if (found) {
          return found
        }
      }
    }

    return null
  }

  return findPath(tree, nodeId) || []
}

/**
 * Validate tree structure
 * @param {Array} tree - Tree structure to validate
 * @returns {object} Validation result with isValid boolean and errors array
 */
export function validateTree(tree) {
  const errors = []
  const seenIds = new Set()

  function validate(nodes, level = 0) {
    nodes.forEach((node, index) => {
      // Check required properties
      if (!node.id) {
        errors.push(`Node at level ${level}, index ${index} is missing 'id' property`)
      } else if (seenIds.has(node.id)) {
        errors.push(`Duplicate node ID found: ${node.id}`)
      } else {
        seenIds.add(node.id)
      }

      if (!node.type) {
        errors.push(`Node ${node.id} is missing 'type' property`)
      }

      if (!node.name) {
        errors.push(`Node ${node.id} is missing 'name' property`)
      }

      // Validate type-specific rules
      if (node.type === 'company' && level !== 0) {
        errors.push(`Company node ${node.id} should be at root level`)
      }

      if (node.type === 'profit-center' && level !== 1) {
        errors.push(`Profit center node ${node.id} should be at level 1`)
      }

      if (node.type === 'cost-center' && level !== 2) {
        errors.push(`Cost center node ${node.id} should be at level 2`)
      }

      // Validate children
      if (node.children) {
        if (!Array.isArray(node.children)) {
          errors.push(`Node ${node.id} children property should be an array`)
        } else {
          validate(node.children, level + 1)
        }
      }
    })
  }

  validate(tree)

  return {
    isValid: errors.length === 0,
    errors
  }
}
