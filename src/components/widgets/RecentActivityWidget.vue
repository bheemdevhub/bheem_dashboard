<template>
  <div class="recent-activity-widget">
    <div class="widget-header">
      <h3 class="widget-title">Recent Activity</h3>
      <div class="widget-actions">
        <button class="action-btn" @click="refreshActivity">
          <svg class="refresh-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
        <button class="action-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="activity-list">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="activity-item"
        :class="{ 'activity-new': activity.isNew }"
      >
        <div class="activity-avatar" :class="activity.type">
          <div v-if="activity.avatar" class="avatar-image">
            {{ activity.avatar }}
          </div>
          <div v-else class="avatar-icon">
            <svg v-if="activity.type === 'user'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <svg v-else-if="activity.type === 'system'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <svg v-else-if="activity.type === 'task'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <div class="activity-content">
          <div class="activity-header">
            <span class="activity-user">{{ activity.user }}</span>
            <span class="activity-action">{{ activity.action }}</span>
            <span v-if="activity.target" class="activity-target">{{ activity.target }}</span>
          </div>
          <div class="activity-description" v-if="activity.description">
            {{ activity.description }}
          </div>
          <div class="activity-meta">
            <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
            <span v-if="activity.location" class="activity-location">{{ activity.location }}</span>
          </div>
        </div>

        <div class="activity-status" :class="activity.status">
          <div class="status-indicator"></div>
        </div>
      </div>
    </div>

    <div class="widget-footer">
      <button class="view-all-btn" @click="viewAllActivities">
        View All Activities
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'RecentActivityWidget',
  setup() {
    const isLoading = ref(false)
    
    const activities = reactive([
      {
        id: 1,
        user: 'John Doe',
        action: 'created a new project',
        target: 'E-commerce Dashboard',
        description: 'Initial setup with modern design components',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'user',
        avatar: 'JD',
        status: 'success',
        isNew: true,
        location: 'New York'
      },
      {
        id: 2,
        user: 'Sarah Miller',
        action: 'updated the design system',
        target: 'Components Library',
        description: 'Added new color schemes and typography updates',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        type: 'user',
        avatar: 'SM',
        status: 'success',
        isNew: false,
        location: 'San Francisco'
      },
      {
        id: 3,
        user: 'System',
        action: 'deployed new version',
        target: 'v2.1.4',
        description: 'Automatic deployment completed successfully',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        type: 'system',
        status: 'success',
        isNew: false
      },
      {
        id: 4,
        user: 'Mike Johnson',
        action: 'completed task',
        target: 'API Integration',
        description: 'REST API endpoints configured and tested',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        type: 'task',
        avatar: 'MJ',
        status: 'success',
        isNew: false,
        location: 'London'
      },
      {
        id: 5,
        user: 'Lisa Wilson',
        action: 'added new comments',
        target: 'Code Review #245',
        description: 'Suggested improvements for performance optimization',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        type: 'user',
        avatar: 'LW',
        status: 'pending',
        isNew: false,
        location: 'Berlin'
      }
    ])

    const formatTime = (timestamp) => {
      const now = new Date()
      const diff = now - timestamp
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      if (minutes < 60) {
        return `${minutes} minutes ago`
      } else if (hours < 24) {
        return `${hours} hours ago`
      } else {
        return `${days} days ago`
      }
    }

    const refreshActivity = () => {
      isLoading.value = true
      // Simulate API call
      setTimeout(() => {
        // Add a new activity at the beginning
        activities.unshift({
          id: Date.now(),
          user: 'Alex Thompson',
          action: 'uploaded new files',
          target: 'Asset Library',
          description: 'Added 15 new icons and illustrations',
          timestamp: new Date(),
          type: 'user',
          avatar: 'AT',
          status: 'success',
          isNew: true,
          location: 'Toronto'
        })
        isLoading.value = false
      }, 1000)
    }

    const viewAllActivities = () => {
      // Navigate to full activity page
      console.log('Navigating to all activities')
    }

    onMounted(() => {
      // Mark new activities as read after 5 seconds
      setTimeout(() => {
        activities.forEach(activity => {
          activity.isNew = false
        })
      }, 5000)
    })

    return {
      activities,
      isLoading,
      formatTime,
      refreshActivity,
      viewAllActivities
    }
  }
}
</script>

<style scoped>
.recent-activity-widget {
  background: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.widget-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.widget-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  background: var(--bg-primary);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--border-color);
  color: var(--text-primary);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.refresh-icon {
  transition: transform 0.3s ease;
}

.action-btn:hover .refresh-icon {
  transform: rotate(180deg);
}

.activity-list {
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
  position: relative;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item:hover {
  background: var(--bg-primary);
}

.activity-item.activity-new {
  background: rgba(99, 102, 241, 0.05);
  border-left: 3px solid var(--primary-color);
}

.activity-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.activity-avatar.user {
  background: var(--primary-gradient);
}

.activity-avatar.system {
  background: linear-gradient(135deg, #6b7280, #374151);
}

.activity-avatar.task {
  background: linear-gradient(135deg, #10b981, #059669);
}

.avatar-image {
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.avatar-icon {
  color: white;
}

.avatar-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-header {
  margin-bottom: 0.25rem;
}

.activity-user {
  font-weight: 600;
  color: var(--text-primary);
  margin-right: 0.5rem;
}

.activity-action {
  color: var(--text-secondary);
  margin-right: 0.5rem;
}

.activity-target {
  font-weight: 500;
  color: var(--primary-color);
}

.activity-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.activity-time {
  display: flex;
  align-items: center;
}

.activity-location {
  display: flex;
  align-items: center;
}

.activity-location::before {
  content: '📍';
  margin-right: 0.25rem;
}

.activity-status {
  margin-left: 1rem;
  flex-shrink: 0;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.activity-status.success .status-indicator {
  background: #10b981;
}

.activity-status.pending .status-indicator {
  background: #f59e0b;
}

.activity-status.error .status-indicator {
  background: #ef4444;
}

.widget-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-primary);
}

.view-all-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  background: transparent;
  color: var(--primary-color);
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.view-all-btn:hover {
  background: var(--primary-color);
  color: white;
}

.view-all-btn svg {
  width: 16px;
  height: 16px;
}

/* Scrollbar styling */
.activity-list::-webkit-scrollbar {
  width: 4px;
}

.activity-list::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

.activity-list::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.activity-list::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

@media (max-width: 768px) {
  .widget-header {
    padding: 1rem;
  }
  
  .activity-item {
    padding: 0.75rem 1rem;
  }
  
  .activity-avatar {
    width: 2rem;
    height: 2rem;
  }
  
  .avatar-icon svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>
