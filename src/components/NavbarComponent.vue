<template>
  <div class="navbar" :class="{ 'navbar-dark': themeStore.isDark }">
    <div class="navbar-glow"></div>
    <div class="container">
      <div class="navbar-content">
        <!-- Logo and Brand -->
        <div class="navbar-brand">
          <div class="logo-icon">
            <div class="logo-animation">
              <img src="@/assets/images/bheemlogo.png" alt="Agent Bheem Logo" class="bheem-logo">
              <div class="logo-pulse"></div>
            </div>
          </div>
          <div class="brand-content">
            <span class="brand-text">Agent Bheem</span>
            <span class="brand-subtitle">AI Assistant for Business Automation!</span>
          </div>
        </div>

        <!-- Navigation Links (Hidden on desktop with sidebar, shown on mobile) -->
        <nav class="navbar-nav" :class="{ 'nav-open': mobileMenuOpen }">
          <a href="#" class="nav-link active" data-tooltip="Home Dashboard">
            <div class="nav-link-bg"></div>
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Dashboard</span>
            <div class="nav-indicator"></div>
          </a>
          <a href="#" class="nav-link" data-tooltip="Analytics & Reports">
            <div class="nav-link-bg"></div>
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Analytics</span>
            <div class="nav-indicator"></div>
          </a>
          <a href="#" class="nav-link" data-tooltip="User Management">
            <div class="nav-link-bg"></div>
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            <span>Users</span>
            <div class="nav-indicator"></div>
          </a>
          <a href="#" class="nav-link" data-tooltip="System Settings">
            <div class="nav-link-bg"></div>
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Settings</span>
            <div class="nav-indicator"></div>
          </a>
        </nav>

        <!-- User Menu -->
        <div class="navbar-user">
          <!-- Theme Toggle -->
          <button @click="themeStore.toggleTheme" class="theme-toggle" data-tooltip="Toggle Theme">
            <div class="theme-toggle-bg"></div>
            <transition name="theme-icon" mode="out-in">
              <svg v-if="!themeStore.isDark" key="light" class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg v-else key="dark" class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </transition>
          </button>

          <!-- Search Button -->
          <button class="search-btn" data-tooltip="Quick Search">
            <div class="search-btn-bg"></div>
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <!-- Notifications -->
          <button class="notification-btn" data-tooltip="Notifications">
            <div class="notification-bg"></div>
            <svg class="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-3.5-3.5a50 50 0 01-1.5-5.5c0-3.314-2.686-6-6-6S3 4.686 3 8c0 2.054.52 4.028 1.5 5.5L1 17h5m9 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="notification-badge">
              <span class="badge-content">3</span>
              <span class="badge-ping"></span>
            </span>
          </button>

          <!-- User Profile Dropdown -->
          <div class="user-dropdown" :class="{ 'dropdown-open': dropdownOpen }">
            <button @click="toggleDropdown" class="user-button">
              <div class="user-button-bg"></div>
              <div class="user-avatar-container">
                <img :src="authStore.user?.avatar" :alt="authStore.getUserName" class="user-avatar" />
                <div class="user-status"></div>
              </div>
              <div class="user-info">
                <span class="user-name">{{ authStore.getUserName }}</span>
                <span class="user-role">{{ authStore.getUserRole }}</span>
              </div>
              <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <div class="dropdown-menu">
              <!-- Dropdown backdrop for click outside -->
              <div v-if="dropdownOpen" class="dropdown-backdrop" @click="closeDropdown"></div>
              
              <div class="dropdown-header">
                <div class="dropdown-user-info">
                  <img :src="authStore.user?.avatar" :alt="authStore.getUserName" class="dropdown-avatar" />
                  <div class="dropdown-user-details">
                    <span class="dropdown-user-name">{{ authStore.getUserName }}</span>
                    <span class="dropdown-user-email">{{ authStore.user?.email || 'user@example.com' }}</span>
                  </div>
                </div>
              </div>
              
              <div class="dropdown-section">
                <a href="#" class="dropdown-item">
                  <div class="dropdown-item-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span>Profile Settings</span>
                  <div class="dropdown-item-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </a>
                
                <a href="#" class="dropdown-item">
                  <div class="dropdown-item-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <span>My Dashboard</span>
                  <div class="dropdown-item-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </a>
                
                <a href="#" class="dropdown-item">
                  <div class="dropdown-item-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <span>Preferences</span>
                  <div class="dropdown-item-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </a>
              </div>
              
              <hr class="dropdown-divider" />
              
              <div class="dropdown-section">
                <button @click="handleLogout" class="dropdown-item logout-item">
                  <div class="dropdown-item-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                  </div>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMobileMenu" class="mobile-menu-btn">
            <div class="mobile-menu-bg"></div>
            <div class="hamburger" :class="{ 'hamburger-active': mobileMenuOpen }">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/theme'

export default {
  name: 'NavbarComponent',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const themeStore = useThemeStore()
    
    const dropdownOpen = ref(false)
    const mobileMenuOpen = ref(false)

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/login')
    }

    // Close dropdown when clicking outside
    const closeDropdown = () => {
      dropdownOpen.value = false
    }

    return {
      authStore,
      themeStore,
      dropdownOpen,
      mobileMenuOpen,
      toggleDropdown,
      toggleMobileMenu,
      handleLogout,
      closeDropdown
    }
  }
}
</script>

<style scoped>
/* Modern Navbar Styling with Dark/Light Mode Support */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
}

.navbar-dark {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.navbar-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  animation: navbar-glow 3s infinite;
}

@keyframes navbar-glow {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

/* Enhanced Logo and Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.logo-icon {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  background: transparent;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  transition: all 0.3s ease;
}

.navbar-dark .logo-icon {
  background: rgba(148, 163, 184, 0.15);
  color: #e2e8f0;
}

.logo-icon:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.25);
}

.logo-animation {
  position: relative;
  width: 2rem;
  height: 2rem;
}

.logo-animation .bheem-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: brightness(1.3) contrast(1.2) drop-shadow(0 2px 8px rgba(0,0,0,0.2));
}

.logo-icon:hover .bheem-logo {
  transform: rotate(15deg) scale(1.15);
  filter: brightness(1.4) contrast(1.3) drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.logo-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: logo-pulse 2s infinite;
}

@keyframes logo-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

.brand-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.navbar-dark .brand-text {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-subtitle {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.navbar-dark .brand-subtitle {
  color: rgba(226, 232, 240, 0.7);
}

/* Enhanced Navigation Links */
.navbar-nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
}

.navbar-dark .nav-link {
  color: rgba(226, 232, 240, 0.85);
}

.nav-link-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.95);
}

.nav-link:hover .nav-link-bg,
.nav-link.active .nav-link-bg {
  opacity: 1;
  transform: scale(1);
}

.nav-link:hover,
.nav-link.active {
  color: white;
  transform: translateY(-2px);
}

.navbar-dark .nav-link:hover,
.navbar-dark .nav-link.active {
  color: #f8fafc;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

.nav-indicator {
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #ffffff, #f0f9ff);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.navbar-dark .nav-indicator {
  background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
}

.nav-link.active .nav-indicator {
  width: 100%;
}

/* Enhanced User Menu */
.navbar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* Theme Toggle */
.theme-toggle {
  position: relative;
  padding: 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.navbar-dark .theme-toggle {
  background: rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

.theme-toggle-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.8);
}

.theme-toggle:hover .theme-toggle-bg {
  opacity: 1;
  transform: scale(1);
}

.theme-toggle:hover {
  transform: translateY(-2px);
}

.theme-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

/* Search Button */
.search-btn {
  position: relative;
  padding: 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.navbar-dark .search-btn {
  background: rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

.search-btn-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.8);
}

.search-btn:hover .search-btn-bg {
  opacity: 1;
  transform: scale(1);
}

.search-btn:hover {
  transform: translateY(-2px);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  z-index: 1;
}

/* Enhanced Notifications */
.notification-btn {
  position: relative;
  padding: 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.navbar-dark .notification-btn {
  background: rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

.notification-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.8);
}

.notification-btn:hover .notification-bg {
  opacity: 1;
  transform: scale(1);
}

.notification-btn:hover {
  transform: translateY(-2px);
}

.notification-icon {
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  z-index: 1;
}

.notification-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
  z-index: 2;
}

.badge-content {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.badge-ping {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ef4444;
  border-radius: 9999px;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Enhanced User Dropdown */
.user-dropdown {
  position: relative;
  z-index: 101;
}

.user-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.navbar-dark .user-button {
  background: rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

.user-button-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.95);
}

.user-button:hover .user-button-bg {
  opacity: 1;
  transform: scale(1);
}

.user-button:hover {
  transform: translateY(-2px);
}

.user-avatar-container {
  position: relative;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.navbar-dark .user-avatar {
  border: 2px solid rgba(148, 163, 184, 0.3);
}

.user-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 2px solid white;
  border-radius: 50%;
  z-index: 2;
}

.navbar-dark .user-status {
  border: 2px solid #1e293b;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  position: relative;
  z-index: 1;
}

.user-name {
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.2;
}

.user-role {
  font-size: 0.75rem;
  opacity: 0.8;
  font-weight: 500;
}

.dropdown-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.dropdown-open .dropdown-icon {
  transform: rotate(180deg);
}

/* Enhanced Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10000;
  overflow: hidden;
}

.navbar-dark .dropdown-menu {
  background: #334155;
  border: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.dropdown-open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.dropdown-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: transparent;
}

.dropdown-header {
  padding: 1.5rem 1rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar-dark .dropdown-header {
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.dropdown-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.navbar-dark .dropdown-avatar {
  border: 2px solid rgba(148, 163, 184, 0.2);
}

.dropdown-user-details {
  display: flex;
  flex-direction: column;
}

.dropdown-user-name {
  font-weight: 700;
  font-size: 0.875rem;
  color: #1f2937;
  line-height: 1.2;
}

.navbar-dark .dropdown-user-name {
  color: #f8fafc;
}

.dropdown-user-email {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.navbar-dark .dropdown-user-email {
  color: #94a3b8;
}

.dropdown-section {
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #374151;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.navbar-dark .dropdown-item {
  color: #e2e8f0;
}

.dropdown-item:hover {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  transform: translateX(2px);
}

.navbar-dark .dropdown-item:hover {
  background: linear-gradient(135deg, #475569 0%, #64748b 100%);
}

.dropdown-item-icon {
  width: 1.25rem;
  height: 1.25rem;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.dropdown-item:hover .dropdown-item-icon {
  opacity: 1;
  transform: scale(1.1);
}

.dropdown-item-arrow {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  margin-left: auto;
  transition: all 0.2s ease;
}

.dropdown-item:hover .dropdown-item-arrow {
  opacity: 1;
  transform: translateX(2px);
}

.logout-item {
  color: #dc2626 !important;
}

.navbar-dark .logout-item {
  color: #f87171 !important;
}

.logout-item:hover {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%) !important;
}

.navbar-dark .logout-item:hover {
  background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%) !important;
}

.dropdown-divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin: 0.5rem 0;
}

.navbar-dark .dropdown-divider {
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

/* Mobile Menu Toggle */
.mobile-menu-btn {
  position: relative;
  display: none;
  padding: 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.navbar-dark .mobile-menu-btn {
  background: rgba(148, 163, 184, 0.1);
}

.mobile-menu-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: scale(0.8);
}

.mobile-menu-btn:hover .mobile-menu-bg {
  opacity: 1;
  transform: scale(1);
}

.hamburger {
  width: 1.5rem;
  height: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.navbar-dark .hamburger-line {
  background: #e2e8f0;
}

.hamburger-active .hamburger-line:nth-child(1) {
  transform: translateY(0.4rem) rotate(45deg);
}

.hamburger-active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.hamburger-active .hamburger-line:nth-child(3) {
  transform: translateY(-0.4rem) rotate(-45deg);
}

/* Tooltips */
[data-tooltip] {
  position: relative;
}

[data-tooltip]:hover::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 100;
  opacity: 0;
  animation: tooltip-fade-in 0.2s ease forwards;
}

@keyframes tooltip-fade-in {
  from { opacity: 0; transform: translateX(-50%) translateY(5px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .navbar-nav {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    padding: 1.5rem;
    gap: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .navbar-dark .navbar-nav {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }

  .nav-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
  }

  .user-info {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-btn,
  .theme-toggle {
    display: none;
  }

  .brand-subtitle {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .navbar-content {
    padding: 0.75rem 0;
  }

  .brand-text {
    font-size: 1.25rem;
  }

  .user-dropdown {
    order: -1;
  }

  .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .logo-animation {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>
