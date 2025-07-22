# Vue.js Dashboard Project

## Installation Instructions

### Prerequisites
Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/)

### Step 1: Install Vue CLI globally
```bash
npm install -g @vue/cli
```

### Step 2: Create Vue.js project (Alternative method if you want to start fresh)
```bash
vue create dashboard-app
cd dashboard-app
```

### Step 3: Install dependencies for this project
```bash
npm install
```

### Step 4: Install additional dependencies for modern styling
```bash
npm install vue-router@4 pinia @heroicons/vue
```

### Step 5: Run the development server
```bash
npm run serve
```

## Project Structure
- `/src/components` - Reusable Vue components
- `/src/views` - Page components (Login, Dashboard)
- `/src/router` - Vue Router configuration
- `/src/store` - Pinia store for state management
- `/src/assets` - Static assets (CSS, images)

## Features
- Responsive Login Page with modern design
- Protected Dashboard with Navbar and Footer
- State management with Pinia
- Vue Router for navigation
- Modern CSS with Flexbox/Grid
- Mobile-first responsive design
