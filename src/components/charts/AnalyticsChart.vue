<template>
  <div class="analytics-chart">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
      ref="chartRef"
    />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, computed } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'AnalyticsChart',
  components: {
    Doughnut
  },
  setup() {
    const chartRef = ref()

    const chartData = computed(() => ({
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          data: [55, 35, 10],
          backgroundColor: [
            'rgb(99, 102, 241)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)'
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)'
          ],
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    }))

    const chartOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
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
              return `${context.label}: ${context.parsed}%`
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
.analytics-chart {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
