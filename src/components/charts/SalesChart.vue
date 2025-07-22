<template>
  <div class="sales-chart">
    <Line
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref, computed } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default {
  name: 'SalesChart',
  components: {
    Line
  },
  props: {
    period: {
      type: String,
      default: '7days'
    }
  },
  setup(props) {
    const chartRef = ref()

    const salesData = {
      '7days': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [65, 78, 90, 81, 56, 55, 40]
      },
      '30days': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        values: [480, 520, 445, 380]
      },
      '3months': {
        labels: ['Month 1', 'Month 2', 'Month 3'],
        values: [1825, 1950, 1670]
      }
    }

    const chartData = computed(() => {
      const data = salesData[props.period] || salesData['7days']
      return {
        labels: data.labels,
        datasets: [
          {
            label: 'Sales',
            data: data.values,
            fill: true,
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: 'rgb(99, 102, 241)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      }
    })

    const chartOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function(context) {
              return `${context[0].label}`
            },
            label: function(context) {
              return `Sales: $${context.parsed.y.toLocaleString()}`
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
              return '$' + value.toLocaleString()
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
.sales-chart {
  height: 300px;
  padding: 20px;
}
</style>
