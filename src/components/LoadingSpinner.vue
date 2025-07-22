<template>
  <Transition name="loader-fade" appear>
    <div v-if="visible" class="loading-spinner-overlay">
      <!-- Dynamic gradient background -->
      <div class="gradient-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="gradient-orb orb-4"></div>
      </div>

      <!-- Particle background -->
      <div class="particles-container">
        <div v-for="n in 30" :key="n" class="particle" :style="getParticleStyle(n)"></div>
      </div>

      <!-- Main content container -->
      <div class="loader-content">
        <!-- Animated logo/brand section -->
        <div class="brand-section">
          <div class="logo-container">
            <div class="logo-inner">
              <svg viewBox="0 0 100 100" class="logo-svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#667eea"/>
                    <stop offset="50%" stop-color="#764ba2"/>
                    <stop offset="100%" stop-color="#f093fb"/>
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGradient)" stroke-width="4" opacity="0.8"/>
                <circle cx="50" cy="50" r="25" fill="url(#logoGradient)" opacity="0.6"/>
                <rect x="42" y="35" width="16" height="30" fill="white" rx="2"/>
                <circle cx="50" cy="40" r="3" fill="#667eea"/>
                <rect x="44" y="48" width="12" height="2" fill="#667eea" rx="1"/>
                <rect x="44" y="52" width="8" height="2" fill="#667eea" rx="1"/>
                <rect x="44" y="56" width="10" height="2" fill="#667eea" rx="1"/>
              </svg>
            </div>
            <div class="logo-ring"></div>
            <div class="logo-ring-outer"></div>
          </div>
          <h2 class="brand-name">Agent Bheem</h2>
          <p class="brand-tagline">AI-Powered Intelligence Platform</p>
        </div>

        <!-- Success Animation -->
        <div v-if="showSuccess" class="success-container">
          <div class="success-icon">
            <svg viewBox="0 0 52 52" class="success-svg">
              <circle cx="26" cy="26" r="25" fill="none" class="success-circle"/>
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" class="success-check"/>
            </svg>
          </div>
          <div class="success-ripple"></div>
        </div>

        <!-- Advanced Spinner -->
        <div v-else class="spinner-container">
          <!-- Outer ring -->
          <div class="spinner-ring outer-ring">
            <div class="ring-segment" v-for="n in 12" :key="n" :style="{ '--segment-delay': n * 0.1 + 's' }"></div>
          </div>

          <!-- Middle ring -->
          <div class="spinner-ring middle-ring">
            <div class="ring-dot" v-for="n in 8" :key="n" :style="{ '--dot-angle': n * 45 + 'deg' }"></div>
          </div>

          <!-- Inner core -->
          <div class="spinner-core">
            <div class="core-center">
              <div class="core-pulse"></div>
            </div>
          </div>

          <!-- Orbital dots -->
          <div class="orbital-container">
            <div class="orbital-dot dot-1"></div>
            <div class="orbital-dot dot-2"></div>
            <div class="orbital-dot dot-3"></div>
          </div>
        </div>

        <!-- Enhanced Loading Text -->
        <div class="loading-text">
          <h3 class="loading-title">{{ title }}</h3>
          <p class="loading-subtitle">{{ subtitle }}</p>
        </div>

        <!-- Advanced Progress Indicator -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            <div class="progress-glow"></div>
          </div>
          <div class="progress-steps">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-icon">1</div>
              <span>Auth</span>
            </div>
            <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-icon">2</div>
              <span>Data</span>
            </div>
            <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
              <div class="step-icon">3</div>
              <span>UI</span>
            </div>
            <div class="step" :class="{ active: currentStep >= 4, completed: currentStep > 4 }">
              <div class="step-icon">4</div>
              <span>Ready</span>
            </div>
          </div>
          <div class="progress-message">{{ progressMessages[currentStep - 1] || 'Initializing Agent Bheem AI...' }}</div>
        </div>
      </div>

      <!-- Enhanced Particles -->
      <div class="particles-field">
        <div v-for="n in 50" :key="n" class="particle" :style="getParticleStyle(n)"></div>
      </div>
      
      <!-- Floating Elements -->
      <div class="floating-elements">
        <div class="float-element element-1"></div>
        <div class="float-element element-2"></div>
        <div class="float-element element-3"></div>
        <div class="float-element element-4"></div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'LoadingSpinner',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Loading Agent Bheem AI'
    },
    subtitle: {
      type: String,
      default: 'Initializing Agent Bheem AI workspace...'
    },
    showSuccess: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 4000
    }
  },
  emits: ['hidden'],
  setup(props, { emit }) {
    const currentStep = ref(1)
    const progressPercentage = computed(() => (currentStep.value / 4) * 100)
    
    const progressMessages = [
      'Initializing Agent Bheem AI...',
      'Loading intelligent features...',
      'Preparing AI workspace...',
      'Agent Bheem AI Ready!'
    ]

    const getParticleStyle = () => {
      const size = Math.random() * 4 + 2
      const duration = Math.random() * 10 + 15
      const delay = Math.random() * 5
      const x = Math.random() * 100
      const y = Math.random() * 100
      
      return {
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--delay': `${delay}s`,
        '--start-x': `${x}%`,
        '--start-y': `${y}%`,
        '--end-x': `${Math.random() * 100}%`,
        '--end-y': `${Math.random() * 100}%`,
        opacity: Math.random() * 0.6 + 0.2
      }
    }

    const startProgressAnimation = () => {
      if (!props.visible) return
      
      const stepDuration = props.duration / 4
      let step = 1
      
      const interval = setInterval(() => {
        if (step <= 4 && props.visible && !props.showSuccess) {
          currentStep.value = step
          step++
        } else {
          clearInterval(interval)
        }
      }, stepDuration)
    }

    watch(() => props.visible, (newVal) => {
      if (newVal) {
        currentStep.value = 1
        startProgressAnimation()
      }
    })

    watch(() => props.showSuccess, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          emit('hidden')
        }, 2500)
      }
    })

    return {
      currentStep,
      progressPercentage,
      progressMessages,
      getParticleStyle
    }
  }
}
</script>

<style scoped>
/* Overlay and transitions */
.loading-spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.loader-fade-enter-active, .loader-fade-leave-active {
  transition: opacity 0.6s ease-in-out;
}

.loader-fade-enter-from, .loader-fade-leave-to {
  opacity: 0;
}

/* Dynamic gradient background */
.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%);
  top: 50%;
  right: -200px;
  animation-delay: 2s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.4) 0%, transparent 70%);
  bottom: -175px;
  left: 50%;
  animation-delay: 4s;
}

.orb-4 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  top: 20%;
  left: 20%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

/* Particles */
.particles-container, .particles-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  left: var(--start-x);
  top: var(--start-y);
  animation: particleMove var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes particleMove {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(
      calc(var(--end-x) - var(--start-x)),
      calc(var(--end-y) - var(--start-y))
    ) scale(0);
    opacity: 0;
  }
}

/* Main content */
.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  max-width: 500px;
  padding: 40px;
}

/* Brand section */
.brand-section {
  margin-bottom: 40px;
}

.logo-container {
  position: relative;
  margin-bottom: 20px;
}

.logo-inner {
  width: 120px;
  height: 120px;
  position: relative;
  z-index: 3;
}

.logo-svg {
  width: 100%;
  height: 100%;
  animation: logoGlow 3s ease-in-out infinite;
}

.logo-ring, .logo-ring-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.logo-ring {
  width: 140px;
  height: 140px;
  animation: ringRotate 8s linear infinite;
}

.logo-ring-outer {
  width: 160px;
  height: 160px;
  animation: ringRotate 12s linear infinite reverse;
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5)); }
  50% { filter: drop-shadow(0 0 20px rgba(118, 75, 162, 0.8)); }
}

@keyframes ringRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: titleGlow 2s ease-in-out infinite alternate;
}

.brand-tagline {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 300;
}

@keyframes titleGlow {
  from { text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
  to { text-shadow: 0 2px 20px rgba(255, 255, 255, 0.4); }
}

/* Success animation */
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.success-icon {
  position: relative;
  width: 100px;
  height: 100px;
}

.success-svg {
  width: 100%;
  height: 100%;
}

.success-circle {
  stroke: #4ade80;
  stroke-width: 2;
  stroke-dasharray: 157;
  stroke-dashoffset: 157;
  animation: successCircle 1.2s ease-in-out forwards;
}

.success-check {
  stroke: #4ade80;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: successCheck 0.8s ease-in-out 0.4s forwards;
}

@keyframes successCircle {
  to { stroke-dashoffset: 0; }
}

@keyframes successCheck {
  to { stroke-dashoffset: 0; }
}

.success-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border: 2px solid #4ade80;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: successRipple 1.5s ease-out infinite;
}

@keyframes successRipple {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

/* Spinner */
.spinner-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
}

.spinner-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.outer-ring {
  width: 120px;
  height: 120px;
  animation: outerRotate 3s linear infinite;
}

.ring-segment {
  position: absolute;
  width: 6px;
  height: 20px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
  border-radius: 3px;
  transform-origin: 3px 60px;
  animation: segmentPulse 2s ease-in-out infinite;
  animation-delay: var(--segment-delay);
}

.ring-segment:nth-child(1) { transform: rotate(0deg); }
.ring-segment:nth-child(2) { transform: rotate(30deg); }
.ring-segment:nth-child(3) { transform: rotate(60deg); }
.ring-segment:nth-child(4) { transform: rotate(90deg); }
.ring-segment:nth-child(5) { transform: rotate(120deg); }
.ring-segment:nth-child(6) { transform: rotate(150deg); }
.ring-segment:nth-child(7) { transform: rotate(180deg); }
.ring-segment:nth-child(8) { transform: rotate(210deg); }
.ring-segment:nth-child(9) { transform: rotate(240deg); }
.ring-segment:nth-child(10) { transform: rotate(270deg); }
.ring-segment:nth-child(11) { transform: rotate(300deg); }
.ring-segment:nth-child(12) { transform: rotate(330deg); }

.middle-ring {
  width: 80px;
  height: 80px;
  animation: middleRotate 2s linear infinite reverse;
}

.ring-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transform-origin: 40px 40px;
  transform: rotate(var(--dot-angle)) translateX(32px);
  animation: dotPulse 1.5s ease-in-out infinite;
}

.spinner-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
}

.core-center {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5));
  border-radius: 50%;
  position: relative;
}

.core-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: corePulse 1s ease-in-out infinite;
}

@keyframes outerRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes middleRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg); }
}

@keyframes segmentPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.5; transform: rotate(var(--dot-angle)) translateX(32px) scale(1); }
  50% { opacity: 1; transform: rotate(var(--dot-angle)) translateX(32px) scale(1.3); }
}

@keyframes corePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
}

/* Orbital dots */
.orbital-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
}

.orbital-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.dot-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbit1 4s linear infinite;
}

.dot-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation: orbit2 4s linear infinite;
}

.dot-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbit3 4s linear infinite;
}

@keyframes orbit1 {
  from { transform: translateX(-50%) rotate(0deg) translateX(80px) rotate(0deg); }
  to { transform: translateX(-50%) rotate(360deg) translateX(80px) rotate(-360deg); }
}

@keyframes orbit2 {
  from { transform: translateY(-50%) rotate(120deg) translateX(80px) rotate(-120deg); }
  to { transform: translateY(-50%) rotate(480deg) translateX(80px) rotate(-480deg); }
}

@keyframes orbit3 {
  from { transform: translateX(-50%) rotate(240deg) translateX(80px) rotate(-240deg); }
  to { transform: translateX(-50%) rotate(600deg) translateX(80px) rotate(-600deg); }
}

/* Loading text */
.loading-text {
  margin-bottom: 40px;
}

.loading-title {
  font-size: 2rem;
  font-weight: 600;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.loading-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 300;
}

/* Progress indicator */
.progress-container {
  width: 100%;
  max-width: 400px;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22d3ee, #a855f7);
  border-radius: 4px;
  transition: width 0.5s ease;
  position: relative;
}

.progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressGlow 2s ease-in-out infinite;
}

@keyframes progressGlow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.step.active {
  opacity: 1;
  transform: scale(1.1);
}

.step.completed {
  opacity: 0.8;
}

.step-icon {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.step.active .step-icon {
  border-color: #4ade80;
  background: #4ade80;
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
}

.step.completed .step-icon {
  border-color: #22d3ee;
  background: #22d3ee;
}

.step span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.progress-message {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 400;
  animation: messageGlow 2s ease-in-out infinite;
}

@keyframes messageGlow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

/* Floating elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.float-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: floatMove 8s ease-in-out infinite;
}

.element-1 {
  width: 60px;
  height: 60px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  width: 40px;
  height: 40px;
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.element-3 {
  width: 80px;
  height: 80px;
  bottom: 15%;
  left: 20%;
  animation-delay: 4s;
}

.element-4 {
  width: 50px;
  height: 50px;
  bottom: 25%;
  right: 10%;
  animation-delay: 6s;
}

@keyframes floatMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -20px) scale(1.1); }
  50% { transform: translate(-15px, -40px) scale(0.9); }
  75% { transform: translate(-25px, 15px) scale(1.05); }
}

/* Responsive design */
@media (max-width: 768px) {
  .loader-content {
    padding: 20px;
    max-width: 90%;
  }
  
  .brand-name {
    font-size: 2rem;
  }
  
  .loading-title {
    font-size: 1.5rem;
  }
  
  .spinner-container {
    width: 100px;
    height: 100px;
  }
  
  .progress-steps {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .step-icon {
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
  
  .progress-bar {
    height: 6px;
  }
  
  .orb-1, .orb-2, .orb-3, .orb-4 {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 480px) {
  .brand-name {
    font-size: 1.8rem;
  }
  
  .loading-title {
    font-size: 1.3rem;
  }
  
  .progress-container {
    max-width: 300px;
  }
  
  .progress-bar {
    height: 4px;
  }
}
</style>
