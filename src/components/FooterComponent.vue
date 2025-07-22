<template>
  <footer class="footer">
    <!-- Animated Background Elements -->
    <div class="footer-bg">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>

    <div class="container">
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section company-section">
          <div class="footer-brand">
            <div class="logo-container">
              <div class="logo-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="currentColor" opacity="0.9"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="logo-pulse"></div>
            </div>
            <div class="brand-content">
              <span class="brand-text">Agent Bheem</span>
              <span class="brand-tagline">Intelligent Dashboard Solutions</span>
            </div>
          </div>
          <p class="footer-description">
            Experience the power of modern data visualization and intelligent analytics. 
            Transform your business insights with our cutting-edge dashboard platform.
          </p>
          
          <!-- Enhanced Social Links -->
          <div class="social-section">
            <h4 class="social-title">Connect With Us</h4>
            <div class="social-links">
              <a href="#" class="social-link facebook" aria-label="Facebook">
                <div class="social-bg"></div>
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-link twitter" aria-label="Twitter">
                <div class="social-bg"></div>
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="social-link linkedin" aria-label="LinkedIn">
                <div class="social-bg"></div>
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="social-link github" aria-label="GitHub">
                <div class="social-bg"></div>
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" class="social-link instagram" aria-label="Instagram">
                <div class="social-bg"></div>
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer-section links-section">
          <h3 class="footer-title">
            <svg class="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Quick Access
          </h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">
              <span class="link-icon">📊</span>
              <span>Dashboard</span>
            </a></li>
            <li><a href="#" class="footer-link">
              <span class="link-icon">📈</span>
              <span>Analytics</span>
            </a></li>
            <li><a href="#" class="footer-link">
              <span class="link-icon">⚙️</span>
              <span>Settings</span>
            </a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="footer-section support-section">
          <h3 class="footer-title">
            <svg class="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Support
          </h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">
              <span class="link-icon">🎯</span>
              <span>Help Center</span>
            </a></li>
            <li><a href="#" class="footer-link">
              <span class="link-icon">📖</span>
              <span>Documentation</span>
            </a></li>
            <li><a href="#" class="footer-link">
              <span class="link-icon">💬</span>
              <span>Contact Support</span>
            </a></li>
          </ul>
        </div>

        <!-- Contact & Stats -->
        <div class="footer-section contact-section">
          <h3 class="footer-title">
            <svg class="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contact
          </h3>
          
          <div class="contact-simple">
            <p class="contact-email">support@agentbheem.com</p>
            <p class="contact-phone">+1 (555) 123-4567</p>
          </div>

          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat-item">
              <div class="stat-number">10K+</div>
              <div class="stat-label">Users</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright-section">
            <p class="copyright">
              <span class="copyright-icon">©</span>
              {{ currentYear }} Agent Bheem. All rights reserved.
            </p>
          </div>
          
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">Privacy</a>
            <a href="#" class="footer-bottom-link">Terms</a>
            <a href="#" class="footer-bottom-link">Support</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'FooterComponent',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #e2e8f0;
  margin-top: auto;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 50%;
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 20%;
  right: 15%;
  animation-delay: 4s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 30%;
  left: 20%;
  animation-delay: 8s;
}

.shape-4 {
  width: 60px;
  height: 60px;
  bottom: 15%;
  right: 25%;
  animation-delay: 12s;
}

.shape-5 {
  width: 90px;
  height: 90px;
  top: 50%;
  left: 50%;
  animation-delay: 16s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
    opacity: 0.5;
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
    opacity: 0.8;
  }
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

/* Footer Content */
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding: 3rem 0 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Company Section */
.company-section {
  padding-right: 2rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo-container {
  position: relative;
  width: 3rem;
  height: 3rem;
}

.logo-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
}

.logo-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.logo-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  animation: pulse 2s infinite;
  z-index: 1;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.brand-content {
  display: flex;
  flex-direction: column;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.25rem;
}

.brand-tagline {
  font-size: 0.875rem;
  color: #8b5cf6;
  font-weight: 500;
}

.footer-description {
  color: #94a3b8;
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

/* Social Section */
.social-section {
  margin-top: 1rem;
}

.social-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.social-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover .social-bg {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.social-link.facebook:hover .social-bg {
  background: linear-gradient(135deg, #1877f2, #42a5f5);
}

.social-link.twitter:hover .social-bg {
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
}

.social-link.linkedin:hover .social-bg {
  background: linear-gradient(135deg, #0077b5, #00a0dc);
}

.social-link.github:hover .social-bg {
  background: linear-gradient(135deg, #333, #666);
}

.social-link.instagram:hover .social-bg {
  background: linear-gradient(135deg, #e1306c, #fd1d1d, #f77737, #fcaf45);
}

.social-link:hover {
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  z-index: 2;
}

/* Footer Titles */
.footer-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6366f1;
}

/* Footer Links */
.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-radius: 8px;
  position: relative;
}

.footer-link:hover {
  color: white;
  transform: translateX(8px);
}

.link-icon {
  font-size: 1rem;
  width: 1.5rem;
  text-align: center;
}

.link-arrow {
  margin-left: auto;
  opacity: 0;
  transition: all 0.3s ease;
  color: #6366f1;
}

.footer-link:hover .link-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* Contact Section */
.contact-simple {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.contact-email,
.contact-phone {
  color: #94a3b8;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.contact-email:hover,
.contact-phone:hover {
  color: #6366f1;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  padding: 1.5rem 0;
  margin-top: 1rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.9rem;
}

.copyright-icon {
  font-size: 1rem;
  color: #6366f1;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-bottom-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
}

.footer-bottom-link:hover {
  color: #6366f1;
}

.footer-bottom-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: width 0.3s ease;
}

.footer-bottom-link:hover::after {
  width: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  .company-section {
    grid-column: 1 / -1;
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0 1.5rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-bottom-links {
    justify-content: center;
  }

  .quick-stats {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 1.5rem 0;
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .quick-stats {
    padding: 1rem 0;
  }

  .container {
    padding: 0 0.75rem;
  }

  .footer-bottom {
    padding: 1rem 0;
  }
}

/* Enhanced animations */
.footer-section {
  animation: fadeInUp 0.8s ease-out;
}

.footer-section:nth-child(1) { animation-delay: 0.1s; }
.footer-section:nth-child(2) { animation-delay: 0.2s; }
.footer-section:nth-child(3) { animation-delay: 0.3s; }
.footer-section:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus states for better accessibility */
.footer-link:focus,
.social-link:focus,
.footer-bottom-link:focus,
.subscribe-btn:focus,
.newsletter-input:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
</style>
