<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="home-container">
        <!-- Bokeh Background -->
        <div class="bokeh-background">
          <div class="bokeh-circle circle-1"></div>
          <div class="bokeh-circle circle-2"></div>
          <div class="bokeh-circle circle-3"></div>
          <div class="bokeh-circle circle-4"></div>
        </div>

        <!-- Header -->
        <div class="home-header">
          <div class="logo-placeholder">
            <span class="logo-text">LOGO</span>
          </div>
          
          <!-- Desktop Navigation -->
          <NavigationMenu :showInHeader="true" />
        </div>

        <!-- Welcome Content -->
        <div class="welcome-content">
          <div class="welcome-card">
            <v-icon size="80" color="primary" class="welcome-icon">mdi-account-heart</v-icon>
            <h1 class="welcome-title">Welcome to myApp</h1>
            <p class="welcome-subtitle">Your Personal Profile Management System</p>
            
            <div class="action-buttons">
              <v-btn
                size="large"
                color="primary"
                to="/profile"
                class="action-btn"
              >
                <v-icon start>mdi-account</v-icon>
                View Profile
              </v-btn>
              
              <v-btn
                size="large"
                variant="outlined"
                color="primary"
                to="/edit-profile"
                class="action-btn"
              >
                <v-icon start>mdi-pencil</v-icon>
                Edit Profile
              </v-btn>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// Disable default layout
definePageMeta({
  layout: false
})

// Meta tags for SEO
useHead({
  title: 'Home - myApp',
  meta: [
    { name: 'description', content: 'Welcome to myApp - Your personal profile management system.' },
    { name: 'keywords', content: 'myapp, profile management, home, dashboard' }
  ]
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

/* Bokeh Background */
.bokeh-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.bokeh-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: float 20s infinite linear;
}

.circle-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 25s;
}

.circle-2 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  animation-delay: -5s;
  animation-duration: 30s;
}

.circle-3 {
  width: 60px;
  height: 60px;
  top: 60%;
  left: 5%;
  animation-delay: -10s;
  animation-duration: 22s;
}

.circle-4 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  right: 10%;
  animation-delay: -15s;
  animation-duration: 28s;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  33% {
    transform: translateY(-30px) rotate(120deg);
    opacity: 0.4;
  }
  66% {
    transform: translateY(-60px) rotate(240deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) rotate(360deg);
    opacity: 0.7;
  }
}

/* Header */
.home-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
  gap: 2rem;
}

.logo-placeholder {
  width: 80px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.logo-text {
  color: white;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Welcome Content */
.welcome-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  margin-top: 80px;
  z-index: 10;
  position: relative;
}

.welcome-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 3rem 2rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.welcome-icon {
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.welcome-title {
  color: #333;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: -1px;
}

.welcome-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  text-transform: none;
  letter-spacing: 0.5px;
  min-height: 48px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (min-width: 600px) {
  .action-buttons {
    flex-direction: row;
    justify-content: center;
  }
  
  .action-btn {
    min-width: 160px;
  }
}

@media (max-width: 768px) {
  .home-header {
    padding: 0 1rem;
  }
  
  .welcome-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
}
</style>
