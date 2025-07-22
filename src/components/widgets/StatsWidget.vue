<template>
  <div class="stats-widget">
    <div class="stats-grid">
      <div class="stat-card revenue">
        <div class="stat-content">
          <div class="stat-info">
            <h3 class="stat-title">Total Revenue</h3>
            <p class="stat-value">$124,593</p>
            <div class="stat-change positive">
              <svg class="trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"></path>
              </svg>
              <span>+12.5%</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
        <div class="stat-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: '75%' }"></div>
          </div>
          <span class="progress-text">75% of goal</span>
        </div>
      </div>

      <div class="stat-card users">
        <div class="stat-content">
          <div class="stat-info">
            <h3 class="stat-title">Active Users</h3>
            <p class="stat-value">8,426</p>
            <div class="stat-change positive">
              <svg class="trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"></path>
              </svg>
              <span>+8.1%</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
        <div class="stat-chart">
          <svg class="mini-chart" viewBox="0 0 100 20">
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              points="0,15 20,10 40,12 60,5 80,8 100,3"
            />
          </svg>
        </div>
      </div>

      <div class="stat-card orders">
        <div class="stat-content">
          <div class="stat-info">
            <h3 class="stat-title">Total Orders</h3>
            <p class="stat-value">1,432</p>
            <div class="stat-change negative">
              <svg class="trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-9.2 9.2M7 7v10h10"></path>
              </svg>
              <span>-2.3%</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
        </div>
        <div class="stat-badges">
          <span class="stat-badge pending">32 Pending</span>
          <span class="stat-badge completed">1,400 Completed</span>
        </div>
      </div>

      <div class="stat-card conversion">
        <div class="stat-content">
          <div class="stat-info">
            <h3 class="stat-title">Conversion Rate</h3>
            <p class="stat-value">3.24%</p>
            <div class="stat-change positive">
              <svg class="trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"></path>
              </svg>
              <span>+0.4%</span>
            </div>
          </div>
          <div class="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
        <div class="stat-circular">
          <div class="circular-progress">
            <svg class="circular-chart" viewBox="0 0 36 36">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="#e5e7eb"
                stroke-width="3"
                fill="none"
              />
              <path class="circle"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="currentColor"
                stroke-width="3"
                stroke-dasharray="32.4, 100"
                fill="none"
              />
            </svg>
            <div class="percentage">32%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'StatsWidget',
  setup() {
    const statsData = ref([])

    onMounted(() => {
      // Simulate loading stats data
      statsData.value = [
        { title: 'Revenue', value: 124593, change: 12.5 },
        { title: 'Users', value: 8426, change: 8.1 },
        { title: 'Orders', value: 1432, change: -2.3 },
        { title: 'Conversion', value: 3.24, change: 0.4 }
      ]
    })

    return {
      statsData
    }
  }
}
</script>

<style scoped>
.stats-widget {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.trend-icon {
  width: 16px;
  height: 16px;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  background: var(--primary-gradient);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.stat-progress {
  margin-top: 1rem;
}

.progress-bar {
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-gradient);
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.stat-chart {
  margin-top: 1rem;
}

.mini-chart {
  width: 100%;
  height: 20px;
  color: var(--primary-color);
}

.stat-badges {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.stat-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-badge.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.stat-badge.completed {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.stat-circular {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.circular-progress {
  position: relative;
  width: 60px;
  height: 60px;
}

.circular-chart {
  width: 100%;
  height: 100%;
  color: var(--primary-color);
}

.circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
