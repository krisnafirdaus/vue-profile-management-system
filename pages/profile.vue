<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="profile-container">
    <!-- Bokeh Background Circles -->
    <div class="bokeh-background">
      <div class="bokeh-circle circle-1"></div>
      <div class="bokeh-circle circle-2"></div>
      <div class="bokeh-circle circle-3"></div>
      <div class="bokeh-circle circle-4"></div>
      <div class="bokeh-circle circle-5"></div>
      <div class="bokeh-circle circle-6"></div>
      <div class="bokeh-circle circle-7"></div>
      <div class="bokeh-circle circle-8"></div>
    </div>

    <!-- Header with Logo, Navigation, and Hamburger Menu -->
    <div class="header-section">
      <div class="logo-placeholder">
        <span class="logo-text">LOGO</span>
      </div>
      
      <!-- Desktop Navigation -->
      <NavigationMenu :showInHeader="true" />
      
      <div class="hamburger-menu" @click="toggleSidebar">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content-wrapper">
      <!-- Sidebar Navigation -->
      <div class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <h3 class="sidebar-title">My Profile</h3>
          </div>
          
          <!-- Main Navigation Links -->
          <NavigationMenu :showInHeader="false" @close-sidebar="closeSidebar" />
          
          <!-- Profile Tabs -->
          <div class="tab-section">
            <h4 class="tab-section-title">Profile Sections</h4>
            <nav class="sidebar-nav">
              <a 
                href="#" 
                class="nav-item" 
                :class="{ active: currentTab === 'basic' }"
                @click.prevent="setActiveTab('basic')"
              >
                <v-icon class="nav-icon">mdi-account</v-icon>
                Basic Details
              </a>
              
              <a 
                href="#" 
                class="nav-item" 
                :class="{ active: currentTab === 'additional' }"
                @click.prevent="setActiveTab('additional')"
              >
                <v-icon class="nav-icon">mdi-home</v-icon>
                Additional Details
              </a>
              
              <a 
                href="#" 
                class="nav-item" 
                :class="{ active: currentTab === 'spouse' }"
                @click.prevent="setActiveTab('spouse')"
                v-if="profile.maritalStatus === 'Married'"
              >
                <v-icon class="nav-icon">mdi-account-multiple</v-icon>
                Spouse Details
              </a>
              
              <a 
                href="#" 
                class="nav-item" 
                :class="{ active: currentTab === 'preferences' }"
                @click.prevent="setActiveTab('preferences')"
              >
                <v-icon class="nav-icon">mdi-heart</v-icon>
                Preferences
              </a>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-area">
        <div class="profile-content-container">
          
          <!-- Loading State -->
          <div v-if="loading" class="loading-container">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            ></v-progress-circular>
            <p class="loading-text">Loading profile information...</p>
          </div>

          <!-- Error Message -->
          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            class="error-alert"
            closable
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <!-- Profile Content -->
          <div v-if="!loading" class="profile-sections">
            
            <!-- Basic Details Section -->
            <div v-if="currentTab === 'basic'" class="content-section">
              <div class="section-header">
                <h2 class="section-title">Basic Details</h2>
                <v-btn
                  variant="outlined"
                  color="primary"
                  to="/edit-profile"
                  :disabled="loading"
                  class="edit-button"
                >
                  <v-icon start>mdi-pencil</v-icon>
                  Edit Profile
                </v-btn>
              </div>

              <!-- Avatar Section -->
              <div class="avatar-section">
                <v-avatar size="120" class="profile-avatar">
                  <v-icon size="60" color="grey-darken-1" v-if="!profile.profileImage">mdi-account</v-icon>
                  <v-img
                    v-else
                    :src="profile.profileImage"
                    alt="Profile Image"
                  ></v-img>
                </v-avatar>
                <!-- Basic Info Fields - Moved to side of avatar -->
                <div class="info-grid">
                  <div class="info-card">
                    <label class="info-label">Salutation <span class="required-asterisk">*</span></label>
                    <div class="info-value">{{ profile.salutation || 'Not specified' }}</div>
                  </div>
                  
                  <div class="info-card">
                    <label class="info-label">First Name <span class="required-asterisk">*</span></label>
                    <div class="info-value">{{ profile.firstName || 'Not specified' }}</div>
                  </div>
                  
                  <div class="info-card">
                    <label class="info-label">Last Name <span class="required-asterisk">*</span></label>
                    <div class="info-value">{{ profile.lastName || 'Not specified' }}</div>
                  </div>
                  
                  <div class="info-card">
                    <label class="info-label">Email Address <span class="required-asterisk">*</span></label>
                    <div class="info-value">{{ profile.email || 'Not specified' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Details Section -->
            <div v-if="currentTab === 'additional'" class="content-section">
              <div class="section-header">
                <h2 class="section-title">Additional Details</h2>
              </div>

              <div class="info-grid">
                <div class="info-card">
                  <label class="info-label">Home Address</label>
                  <div class="info-value">{{ profile.homeAddress || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Country</label>
                  <div class="info-value">{{ profile.country || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Postal Code</label>
                  <div class="info-value">{{ profile.postalCode || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Date of Birth</label>
                  <div class="info-value">{{ formatDate(profile.dateOfBirth) || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Gender</label>
                  <div class="info-value">{{ profile.gender || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Marital Status</label>
                  <div class="info-value">
                    <v-chip 
                      :color="profile.maritalStatus === 'Married' ? 'pink' : 'blue'"
                      size="small"
                      variant="tonal"
                      v-if="profile.maritalStatus"
                    >
                      {{ profile.maritalStatus }}
                    </v-chip>
                    <span v-else>Not specified</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Spouse Details Section -->
            <div v-if="currentTab === 'spouse' && profile.maritalStatus === 'Married'" class="content-section">
              <div class="section-header">
                <h2 class="section-title">Spouse Details</h2>
              </div>

              <v-alert type="info" variant="tonal" class="spouse-alert">
                <v-icon start>mdi-account-multiple</v-icon>
                Spouse Information
              </v-alert>

              <div class="info-grid">
                <div class="info-card">
                  <label class="info-label">Spouse Salutation</label>
                  <div class="info-value">{{ profile.spouseSalutation || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Spouse First Name</label>
                  <div class="info-value">{{ profile.spouseFirstName || 'Not specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Spouse Last Name</label>
                  <div class="info-value">{{ profile.spouseLastName || 'Not specified' }}</div>
                </div>
              </div>
            </div>

            <!-- Preferences Section -->
            <div v-if="currentTab === 'preferences'" class="content-section">
              <div class="section-header">
                <h2 class="section-title">Personal Preferences</h2>
              </div>

              <div class="info-grid">
                <div class="info-card">
                  <label class="info-label">Hobbies and Interests</label>
                  <div class="info-value">{{ profile.hobbies || 'No hobbies specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Favorite Sport(s)</label>
                  <div class="info-value">{{ profile.favoriteSports || 'No favorite sports specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Preferred Music Genre(s)</label>
                  <div class="info-value">{{ profile.preferredMusic || 'No music preferences specified' }}</div>
                </div>
                
                <div class="info-card">
                  <label class="info-label">Preferred Movie/TV Show(s)</label>
                  <div class="info-value">{{ profile.preferredMovies || 'No movie preferences specified' }}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Disable default layout
definePageMeta({
  layout: false
})

// Meta tags for SEO
useHead({
  title: 'My Profile - myApp',
  meta: [
    { name: 'description', content: 'View your personal profile information in myApp.' },
    { name: 'keywords', content: 'profile, myapp, personal information, user profile' }
  ]
})

// Composables
const api = useApi()
const router = useRouter()

// State
const currentTab = ref('basic')
const loading = ref(false)
const errorMessage = ref('')
const sidebarOpen = ref(false)

const profile = ref({
  profileImage: '',
  salutation: 'Mr.',
  firstName: 'John',
  lastName: 'Doe Jr.',
  email: 'johndoe@myemail.com',
  homeAddress: '123 Main Street, Anytown, State 12345',
  country: 'United States',
  postalCode: '12345',
  dateOfBirth: '1990-01-15',
  gender: 'Male',
  maritalStatus: 'Single',
  spouseSalutation: '',
  spouseFirstName: '',
  spouseLastName: '',
  hobbies: 'Reading, Photography, Hiking',
  favoriteSports: 'Basketball, Swimming',
  preferredMusic: 'Jazz, Classical',
  preferredMovies: 'Sci-Fi, Drama',
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

const getFullName = () => {
  const firstName = profile.value.firstName || ''
  const lastName = profile.value.lastName || ''
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim()
  }
  return 'User'
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const setActiveTab = (tab) => {
  currentTab.value = tab
  // Close sidebar on mobile after selection
  if (window.innerWidth <= 768) {
    sidebarOpen.value = false
  }
}

const closeSidebar = () => {
  if (window.innerWidth <= 768) {
    sidebarOpen.value = false
  }
}

const loadProfile = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const profileData = await api.getProfile()
    
    // Map API data to profile
    Object.keys(profile.value).forEach(key => {
      if (profileData[key] !== undefined) {
        profile.value[key] = profileData[key]
      }
    })
  } catch (error) {
    errorMessage.value = error.message || 'Failed to load profile data'
    console.error('Error loading profile:', error)
  } finally {
    loading.value = false
  }
}

// Load profile data on mount
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
/* Profile Container */
.profile-container {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  overflow-x: hidden;
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

.circle-5 {
  width: 90px;
  height: 90px;
  top: 40%;
  left: 30%;
  animation-delay: -8s;
  animation-duration: 26s;
}

.circle-6 {
  width: 70px;
  height: 70px;
  bottom: 40%;
  left: 20%;
  animation-delay: -12s;
  animation-duration: 24s;
}

.circle-7 {
  width: 110px;
  height: 110px;
  top: 70%;
  right: 30%;
  animation-delay: -3s;
  animation-duration: 32s;
}

.circle-8 {
  width: 85px;
  height: 85px;
  top: 30%;
  right: 40%;
  animation-delay: -18s;
  animation-duration: 27s;
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

/* Header Section */
.header-section {
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

.hamburger-menu {
  width: 30px;
  height: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Main Content Wrapper */
.main-content-wrapper {
  display: flex;
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  position: relative;
  z-index: 10;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  position: fixed;
  left: -280px;
  top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  transition: left 0.3s ease;
  z-index: 999;
}

.sidebar-open {
  left: 0;
}

.sidebar-content {
  padding: 2rem 0;
}

.sidebar-header {
  padding: 0 2rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

/* Main Navigation Links */
/* Tab Section */
.tab-section {
  padding: 0 1rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
}

.tab-section-title {
  color: #999;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.sidebar-title {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item:last-child {
  border-bottom: none;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #333;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: #1976d2;
  font-weight: 600;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #1976d2;
}

.nav-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

/* Content Area */
.content-area {
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.profile-content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Loading Container */
.loading-container {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.loading-text {
  margin-top: 1rem;
  color: #666;
  font-size: 1.1rem;
}

/* Error Alert */
.error-alert {
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

/* Content Sections */
.content-section {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.section-title {
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.edit-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(25, 118, 210, 0.4);
  color: #1976d2;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  text-transform: none;
  letter-spacing: 0.5px;
}

.edit-button:hover {
  background: rgba(25, 118, 210, 0.1);
  border-color: rgba(25, 118, 210, 0.6);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.2);
}

/* Avatar Section */
.avatar-section {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.avatar-section .info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-width: 300px;
}

.profile-avatar {
  border: 3px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.profile-avatar .v-icon {
  opacity: 0.7;
}

.avatar-info {
  flex: 1;
}

.user-name {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.user-email {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

/* Info Grid (for sections other than avatar) */
.content-section > .info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.2);
}

.info-label {
  display: block;
  color: #555;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.info-value {
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  word-break: break-word;
  line-height: 1.4;
}

/* Required Field Asterisk */
.required-asterisk {
  color: #e53e3e;
  font-weight: bold;
  margin-left: 2px;
}

/* Typography Improvements */
.section-title {
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: -0.5px;
}

.sidebar-title {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-name {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-email {
  color: #666;
  font-size: 1rem;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Spouse Alert */
.spouse-alert {
  margin-bottom: 2rem;
  background: rgba(33, 150, 243, 0.1);
  backdrop-filter: blur(10px);
}

/* Responsive Design */
@media (min-width: 769px) {
  .sidebar {
    position: relative;
    left: 0;
    top: 0;
    height: auto;
  }
  
  .content-area {
    margin-left: 50px;
  }
  
  .hamburger-menu {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-section {
    padding: 0 1rem;
  }
  
  .profile-content-container {
    padding: 1rem;
  }
  
  .avatar-section {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    align-items: center;
  }
  
  .avatar-section .info-grid {
    min-width: auto;
    width: 100%;
    max-width: 400px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .edit-button {
    width: 100%;
    max-width: 300px;
  }
  
  .nav-item {
    padding: 1.2rem 2rem;
    font-size: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  .info-card {
    padding: 1.25rem;
  }
  
  .profile-avatar {
    margin-bottom: 1rem;
  }
}

/* Touch-friendly mobile optimizations */
@media (max-width: 768px) and (pointer: coarse) {
  .nav-item {
    min-height: 48px;
    padding: 1.5rem 2rem;
  }
  
  .edit-button {
    min-height: 44px;
    padding: 0.75rem 1.5rem;
  }
  
  .hamburger-menu {
    width: 40px;
    height: 32px;
    padding: 4px;
  }
  
  .hamburger-line {
    height: 4px;
  }
}

/* Landscape mobile optimization */
@media (max-width: 768px) and (orientation: landscape) {
  .avatar-section {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
  }
  
  .profile-avatar {
    margin-bottom: 0;
  }
  
  .avatar-section .info-grid {
    max-width: 300px;
  }
}

/* Overlay for mobile sidebar */
@media (max-width: 768px) {
  .sidebar-open::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
}
</style>