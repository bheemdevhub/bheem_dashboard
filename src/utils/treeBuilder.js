// Helper to build the hierarchical tree: Parent Company > Sub Companies > [Profit Centers, Cost Centers]
export function buildCompanyTree(companies, profitCenters, costCenters) {
  // Find all parent companies (no parent_company_id)
  const parentCompanies = companies.filter(company => company.parent_company_id === null)

  // Helper to build sub company nodes recursively
  function buildSubCompanyNode(company) {
    // Find direct sub companies
    const subCompanies = companies.filter(c => c.parent_company_id === company.id)
    
    // Group node for profit centers
    const profitChildren = profitCenters.filter(pc => pc.company_id === company.id && !pc.parent_profit_center_id)
    const profitNode = {
      id: `${company.id}-profit-centers`,
      name: 'Profit Centers',
      title: '',
      isProfitCentersGroup: true,
      companyId: company.id,
      parent: company,
      children: profitChildren.map(pc => ({
        ...pc,
        isProfitCenter: true,
        companyId: company.id,
        parent: company,
        children: profitCenters.filter(child => child.parent_profit_center_id === pc.id).map(child => ({
          ...child,
          isProfitCenter: true,
          companyId: company.id,
          parent: pc
        })),
        costCenters: costCenters.filter(cc => cc.profit_center_id === pc.id).map(cc => ({
          ...cc,
          isCostCenter: true,
          companyId: company.id,
          parent: pc
        }))
      }))
    }
    
    // Group node for cost centers (not attached to a profit center)
    const costChildren = costCenters.filter(cc => cc.company_id === company.id && !cc.profit_center_id)
    const costNode = {
      id: `${company.id}-cost-centers`,
      name: 'Cost Centers',
      title: '',
      isCostCentersGroup: true,
      companyId: company.id,
      parent: company,
      children: costChildren.map(cc => ({
        ...cc,
        isCostCenter: true,
        companyId: company.id,
        parent: company,
        children: costCenters.filter(child => child.parent_cost_center_id === cc.id).map(child => ({
          ...child,
          isCostCenter: true,
          companyId: company.id,
          parent: cc
        }))
      }))
    }
    
    // Children: sub companies, then profit/cost center groups
    let children = []
    if (subCompanies.length > 0) {
      // If there are sub companies, bind them under this company, then profit/cost center groups under each sub company
      children = subCompanies.map(sub => {
        // For each sub company, build its node and attach its profit/cost center groups
        const subNode = buildSubCompanyNode(sub)
        // Attach profit/cost center groups to sub company
        return {
          ...subNode,
          children: [
            ...(subNode.children || []),
            {
              ...profitNode,
              companyId: sub.id,
              children: profitCenters.filter(pc => pc.company_id === sub.id && !pc.parent_profit_center_id).map(pc => ({
                ...pc,
                isProfitCenter: true,
                children: profitCenters.filter(child => child.parent_profit_center_id === pc.id),
                costCenters: costCenters.filter(cc => cc.profit_center_id === pc.id)
              }))
            },
            {
              ...costNode,
              companyId: sub.id,
              children: costCenters.filter(cc => cc.company_id === sub.id && !cc.profit_center_id).map(cc => ({
                ...cc,
                isCostCenter: true,
                children: costCenters.filter(child => child.parent_cost_center_id === cc.id)
              }))
            }
          ]
        }
      })
    } else {
      // If no sub companies, attach profit/cost center groups to this company
      children = [profitNode, costNode]
    }
    
    return {
      ...company,
      id: company.id,
      name: company.company_name || company.name,
      title: company.company_type,
      isCompany: true,
      children
    }
  }

  // Build the tree for each parent company
  return parentCompanies.map(parent => {
    // For each parent, build its node and attach sub companies (with their own profit/cost centers)
    const parentNode = buildSubCompanyNode(parent)
    return {
      ...parentNode,
      isCompany: true,
      // Attach profit/cost center groups to parent company itself (if it has no sub companies)
      children: parentNode.children.length > 0 ? parentNode.children : [
        {
          id: `${parent.id}-profit-centers`,
          name: 'Profit Centers',
          title: '',
          isProfitCentersGroup: true,
          companyId: parent.id,
          children: profitCenters.filter(pc => pc.company_id === parent.id && !pc.parent_profit_center_id).map(pc => ({
            ...pc,
            isProfitCenter: true,
            children: profitCenters.filter(child => child.parent_profit_center_id === pc.id),
            costCenters: costCenters.filter(cc => cc.profit_center_id === pc.id)
          }))
        },
        {
          id: `${parent.id}-cost-centers`,
          name: 'Cost Centers',
          title: '',
          isCostCentersGroup: true,
          companyId: parent.id,
          children: costCenters.filter(cc => cc.company_id === parent.id && !cc.profit_center_id).map(cc => ({
            ...cc,
            isCostCenter: true,
            children: costCenters.filter(child => child.parent_cost_center_id === cc.id)
          }))
        }
      ]
    }
  })
}
