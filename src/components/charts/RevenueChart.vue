<template>
  <div class="revenue-chart">
    <Bar
      :data="chartData"
      :options="chartOptions"
      ref="chartRef"
    />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ref, computed } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'RevenueChart',
  components: {
    Bar
  },
  setup() {
    const chartRef = ref()

    const chartData = computed(() => ({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: 'Expenses',
          data: [8000, 12000, 10000, 15000, 14000, 18000],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }
      ]
    }))

    const chartOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14
            },
            color: '#64748b'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 12
            },
            callback: function(value) {
              return '$' + (value / 1000) + 'k'
            }
          }
        }
      }
    }))

    return {
      chartRef,
      chartData,
      chartOptions
    }
  }
}
</script>

<style scoped>
.revenue-chart {
  height: 350px;
  padding: 20px;
}
</style>
