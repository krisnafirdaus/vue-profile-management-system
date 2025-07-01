<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="edit-profile-container">
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
            <h3 class="sidebar-title">Edit Profile</h3>
          </div>
          
          <!-- Main Navigation Links -->
          <NavigationMenu :showInHeader="false" @close-sidebar="closeSidebar" />
          
          <!-- Profile Tabs -->
          <div class="tab-section">
            <h4 class="tab-section-title">Edit Sections</h4>
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
                v-if="form.maritalStatus === 'Married'"
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
        <div class="edit-content-container">
          <v-form ref="formRef" @submit.prevent="handleSave">
            
            <!-- Loading State -->
            <div v-if="loading && !form.firstName" class="loading-container">
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

            <!-- Success Message -->
            <v-alert
              v-if="successMessage"
              type="success"
              variant="tonal"
              class="success-alert"
              closable
              @click:close="successMessage = ''"
            >
              {{ successMessage }}
            </v-alert>

            <!-- Edit Form Content -->
            <div v-if="!loading || form.firstName" class="edit-sections">
              
              <!-- Basic Details Section -->
              <div v-if="currentTab === 'basic'" class="content-section">
                <div class="section-header">
                  <h2 class="section-title">Basic Details</h2>
                  <div class="header-actions">
                    <v-btn
                      variant="outlined"
                      color="grey"
                      to="/profile"
                      :disabled="loading"
                      class="back-button"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back to Profile
                    </v-btn>
                  </div>
                </div>

                <!-- Avatar Section -->
                <div class="avatar-section">
                  <div class="avatar-container">
                    <v-avatar size="120" class="profile-avatar">
                      <v-icon size="60" color="grey-darken-1" v-if="!form.profileImage">mdi-account</v-icon>
                      <v-img
                        v-else
                        :src="form.profileImage"
                        alt="Profile Image"
                      ></v-img>
                    </v-avatar>
                    
                    <!-- Upload Button - Below Avatar -->
                    <v-btn
                      variant="outlined"
                      size="small"
                      color="primary"
                      class="upload-button"
                      @click="triggerFileUpload"
                    >
                      <v-icon start>mdi-camera</v-icon>
                      Change Photo
                    </v-btn>
                    <input
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      style="display: none"
                      @change="onProfileImageChange"
                    >
                  </div>
                  
                  <!-- Editable Form Fields -->
                  <div class="info-grid">
                    <div class="form-field">
                      <label class="field-label">Salutation <span class="required-asterisk">*</span></label>
                      <v-select
                        v-model="form.salutation"
                        :items="['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']"
                        variant="outlined"
                        hide-details="auto"
                        :error-messages="errors.salutation"
                        :disabled="loading"
                        class="custom-input"
                        @blur="validateField('salutation')"
                      ></v-select>
                    </div>
                    
                    <div class="form-field">
                      <label class="field-label">First Name <span class="required-asterisk">*</span></label>
                      <v-text-field
                        v-model="form.firstName"
                        variant="outlined"
                        hide-details="auto"
                        :error-messages="errors.firstName"
                        :disabled="loading"
                        class="custom-input"
                        @blur="validateField('firstName')"
                      ></v-text-field>
                    </div>
                    
                    <div class="form-field">
                      <label class="field-label">Last Name <span class="required-asterisk">*</span></label>
                      <v-text-field
                        v-model="form.lastName"
                        variant="outlined"
                        hide-details="auto"
                        :error-messages="errors.lastName"
                        :disabled="loading"
                        class="custom-input"
                        @blur="validateField('lastName')"
                      ></v-text-field>
                    </div>
                    
                    <div class="form-field">
                      <label class="field-label">Email Address <span class="required-asterisk">*</span></label>
                      <v-text-field
                        v-model="form.email"
                        type="email"
                        variant="outlined"
                        hide-details="auto"
                        :error-messages="errors.email"
                        :disabled="loading"
                        class="custom-input"
                        @blur="validateField('email')"
                      ></v-text-field>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="form-actions">
                      <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        :disabled="!isFormValid"
                        class="update-button"
                        @click="handleSave"
                      >
                        <v-icon start>mdi-content-save</v-icon>
                        Update
                      </v-btn>
                      <v-btn
                        variant="outlined"
                        color="grey"
                        :disabled="loading"
                        class="cancel-button"
                        @click="handleCancel"
                      >
                        <v-icon start>mdi-close</v-icon>
                        Cancel
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Details Section -->
              <div v-if="currentTab === 'additional'" class="content-section">
                <div class="section-header">
                  <h2 class="section-title">Additional Details</h2>
                  <div class="header-actions">
                    <v-btn
                      variant="outlined"
                      color="grey"
                      to="/profile"
                      :disabled="loading"
                      class="back-button"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back to Profile
                    </v-btn>
                  </div>
                </div>

                <div class="form-grid">
                  <div class="form-field full-width">
                    <label class="field-label">Home Address <span class="required-asterisk">*</span></label>
                    <v-textarea
                      v-model="form.homeAddress"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.homeAddress"
                      :disabled="loading"
                      rows="3"
                      class="custom-input"
                      @blur="validateField('homeAddress')"
                    ></v-textarea>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Country <span class="required-asterisk">*</span></label>
                    <v-text-field
                      v-model="form.country"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.country"
                      :disabled="loading"
                      class="custom-input"
                      @blur="validateField('country')"
                    ></v-text-field>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Postal Code <span class="required-asterisk">*</span></label>
                    <v-text-field
                      v-model="form.postalCode"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.postalCode"
                      :disabled="loading"
                      class="custom-input"
                      @blur="validateField('postalCode')"
                    ></v-text-field>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Date of Birth <span class="required-asterisk">*</span></label>
                    <v-text-field
                      v-model="form.dateOfBirth"
                      type="date"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.dateOfBirth"
                      :disabled="loading"
                      :max="maxDate"
                      class="custom-input"
                      @blur="validateField('dateOfBirth')"
                    ></v-text-field>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Gender</label>
                    <v-select
                      v-model="form.gender"
                      :items="['Male', 'Female']"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.gender"
                      :disabled="loading"
                      class="custom-input"
                      @blur="validateField('gender')"
                    ></v-select>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Marital Status</label>
                    <v-select
                      v-model="form.maritalStatus"
                      :items="['Single', 'Married']"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.maritalStatus"
                      :disabled="loading"
                      class="custom-input"
                      @change="onMaritalStatusChange"
                      @blur="validateField('maritalStatus')"
                    ></v-select>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="form-actions">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    :disabled="!isFormValid"
                    class="update-button"
                    @click="handleSave"
                  >
                    <v-icon start>mdi-content-save</v-icon>
                    Update
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="grey"
                    :disabled="loading"
                    class="cancel-button"
                    @click="handleCancel"
                  >
                    <v-icon start>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                </div>
              </div>

              <!-- Spouse Details Section -->
              <div v-if="currentTab === 'spouse' && form.maritalStatus === 'Married'" class="content-section">
                <div class="section-header">
                  <h2 class="section-title">Spouse Details</h2>
                  <div class="header-actions">
                    <v-btn
                      variant="outlined"
                      color="grey"
                      to="/profile"
                      :disabled="loading"
                      class="back-button"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back to Profile
                    </v-btn>
                  </div>
                </div>

                <v-alert 
                  type="info" 
                  variant="tonal" 
                  class="spouse-alert"
                  border="start"
                >
                  <template #prepend>
                    <v-icon>mdi-information</v-icon>
                  </template>
                  Please provide your spouse's details below.
                </v-alert>

                <div class="form-grid">
                  <div class="form-field">
                    <label class="field-label">Spouse Salutation</label>
                    <v-select
                      v-model="form.spouseSalutation"
                      :items="['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.spouseSalutation"
                      :disabled="loading"
                      class="custom-input"
                      @blur="validateField('spouseSalutation')"
                    ></v-select>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Spouse First Name</label>
                    <v-text-field
                      v-model="form.spouseFirstName"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.spouseFirstName"
                      :disabled="loading"
                      class="custom-input"
                      @blur="validateField('spouseFirstName')"
                    ></v-text-field>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Spouse Last Name</label>
                    <v-text-field
                      v-model="form.spouseLastName"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="errors.spouseLastName"
                      :disabled="loading"
                      class="custom-input"
                      @blur="validateField('spouseLastName')"
                    ></v-text-field>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="form-actions">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    :disabled="!isFormValid"
                    class="update-button"
                    @click="handleSave"
                  >
                    <v-icon start>mdi-content-save</v-icon>
                    Update
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="grey"
                    :disabled="loading"
                    class="cancel-button"
                    @click="handleCancel"
                  >
                    <v-icon start>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                </div>
              </div>

              <!-- Preferences Section -->
              <div v-if="currentTab === 'preferences'" class="content-section">
                <div class="section-header">
                  <h2 class="section-title">Personal Preferences</h2>
                  <div class="header-actions">
                    <v-btn
                      variant="outlined"
                      color="grey"
                      to="/profile"
                      :disabled="loading"
                      class="back-button"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back to Profile
                    </v-btn>
                  </div>
                </div>

                <div class="form-grid">
                  <div class="form-field">
                    <label class="field-label">Hobbies and Interests</label>
                    <v-textarea
                      v-model="form.hobbies"
                      variant="outlined"
                      hide-details="auto"
                      :disabled="loading"
                      rows="3"
                      class="custom-input"
                      placeholder="Separate multiple hobbies with commas"
                    ></v-textarea>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Favorite Sports</label>
                    <v-textarea
                      v-model="form.favoriteSports"
                      variant="outlined"
                      hide-details="auto"
                      :disabled="loading"
                      rows="3"
                      class="custom-input"
                      placeholder="Separate multiple sports with commas"
                    ></v-textarea>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Preferred Music Genres</label>
                    <v-textarea
                      v-model="form.preferredMusic"
                      variant="outlined"
                      hide-details="auto"
                      :disabled="loading"
                      rows="3"
                      class="custom-input"
                      placeholder="Separate multiple genres with commas"
                    ></v-textarea>
                  </div>
                  
                  <div class="form-field">
                    <label class="field-label">Preferred Movies/TV Shows</label>
                    <v-textarea
                      v-model="form.preferredMovies"
                      variant="outlined"
                      hide-details="auto"
                      :disabled="loading"
                      rows="3"
                      class="custom-input"
                      placeholder="Separate multiple preferences with commas"
                    ></v-textarea>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="form-actions">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    :disabled="!isFormValid"
                    class="update-button"
                    @click="handleSave"
                  >
                    <v-icon start>mdi-content-save</v-icon>
                    Update
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="grey"
                    :disabled="loading"
                    class="cancel-button"
                    @click="handleCancel"
                  >
                    <v-icon start>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                </div>
              </div>

            </div>
          </v-form>
        </div>
      </div>
    </div>
  </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { profileSchema } from '~/composables/useValidation'

// Disable default layout
definePageMeta({
  layout: false
})

// Meta tags for SEO
useHead({
  title: 'Edit Profile - myApp',
  meta: [
    { name: 'description', content: 'Edit and update your personal profile information in myApp.' },
    { name: 'keywords', content: 'edit profile, update profile, myapp, personal information' }
  ]
})

// Composables
const api = useApi()
const router = useRouter()

// Refs
const formRef = ref()
const fileInput = ref()

// State
const loading = ref(false)
const currentTab = ref('basic')
const errorMessage = ref('')
const successMessage = ref('')
const profileImageFile = ref(null)
const sidebarOpen = ref(false)

const form = ref({
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
  homeAddress: '',
  country: '',
  postalCode: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: 'Single',
  spouseSalutation: '',
  spouseFirstName: '',
  spouseLastName: '',
  hobbies: '',
  favoriteSports: '',
  preferredMusic: '',
  preferredMovies: '',
  profileImage: ''
})

const errors = ref({})

// Computed
const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 17)
  return date.toISOString().split('T')[0]
})

const isFormValid = computed(() => {
  const requiredFields = ['salutation', 'firstName', 'lastName', 'email', 'homeAddress', 'country', 'postalCode', 'dateOfBirth']
  const hasRequiredFields = requiredFields.every(field => form.value[field])
  const hasNoErrors = Object.values(errors.value).every(error => !error)
  
  // Check spouse fields if married
  if (form.value.maritalStatus === 'Married') {
    const spouseFields = ['spouseSalutation', 'spouseFirstName', 'spouseLastName']
    const hasSpouseFields = spouseFields.every(field => form.value[field])
    return hasRequiredFields && hasSpouseFields && hasNoErrors
  }
  
  return hasRequiredFields && hasNoErrors
})

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const setActiveTab = (tab) => {
  currentTab.value = tab
  if (window.innerWidth <= 768) {
    sidebarOpen.value = false
  }
}

const closeSidebar = () => {
  if (window.innerWidth <= 768) {
    sidebarOpen.value = false
  }
}

const getFullName = () => {
  const salutation = form.value.salutation || ''
  const firstName = form.value.firstName || ''
  const lastName = form.value.lastName || ''
  return `${salutation} ${firstName} ${lastName}`.trim() || 'User Name'
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const validateField = async (field) => {
  try {
    await profileSchema.validateAt(field, form.value)
    errors.value[field] = ''
  } catch (error) {
    errors.value[field] = error.message
  }
}

const validateForm = async () => {
  try {
    await profileSchema.validate(form.value, { abortEarly: false })
    errors.value = {}
    return true
  } catch (error) {
    const validationErrors = {}
    error.inner?.forEach((err) => {
      if (err.path) {
        validationErrors[err.path] = err.message
      }
    })
    errors.value = validationErrors
    return false
  }
}

const onProfileImageChange = (event) => {
  const target = event.target
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.profileImage = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const onMaritalStatusChange = () => {
  if (form.value.maritalStatus === 'Single') {
    form.value.spouseSalutation = ''
    form.value.spouseFirstName = ''
    form.value.spouseLastName = ''
    // Clear spouse validation errors
    delete errors.value.spouseSalutation
    delete errors.value.spouseFirstName
    delete errors.value.spouseLastName
  }
}

const loadProfile = async () => {
  loading.value = true
  try {
    const profileData = await api.getProfile()
    
    // Map API data to form
    Object.keys(form.value).forEach(key => {
      if (profileData[key] !== undefined) {
        form.value[key] = profileData[key]
      }
    })
  } catch (error) {
    errorMessage.value = error.message || 'Failed to load profile data'
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  const isValid = await validateForm()
  if (!isValid) return

  loading.value = true

  try {
    const response = await api.updateProfile(form.value)
    
    if (response.success) {
      successMessage.value = 'Profile updated successfully!'
      
      setTimeout(() => {
        router.push('/profile')
      }, 1500)
    } else {
      errorMessage.value = response.message || 'Failed to update profile'
    }
  } catch (error) {
    errorMessage.value = error.message || 'Failed to update profile'
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/profile')
}

// Watch for form changes to clear messages
watch(form, () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
  if (successMessage.value) {
    successMessage.value = ''
  }
}, { deep: true })

// Load profile data on mount
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
/* Edit Profile Container */
.edit-profile-container {
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

.edit-content-container {
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Alerts */
.error-alert,
.success-alert {
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
  align-items: flex-start;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.section-title {
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: -0.5px;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  text-transform: none;
  letter-spacing: 0.5px;
  border: 2px solid rgba(108, 117, 125, 0.4);
  color: #6c757d;
}

.back-button:hover {
  background: rgba(108, 117, 125, 0.1);
  border-color: rgba(108, 117, 125, 0.6);
  transform: translateY(-1px);
}

/* Avatar Section */
.avatar-section {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

.upload-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(25, 118, 210, 0.4);
  color: #1976d2;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.avatar-section .info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-width: 300px;
}

.avatar-section .info-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1rem;
  transition: all 0.3s ease;
}

.avatar-section .info-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
}

.avatar-section .info-label {
  display: block;
  color: #666;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.avatar-section .info-value {
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  word-break: break-word;
}

/* Form Actions in Avatar Section */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.update-button,
.cancel-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  text-transform: none;
  letter-spacing: 0.5px;
  flex: 1;
  min-height: 40px;
}

.update-button {
  border: 2px solid rgba(25, 118, 210, 0.4);
  color: #1976d2;
}

.update-button:hover {
  background: rgba(25, 118, 210, 0.1);
  border-color: rgba(25, 118, 210, 0.6);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.2);
}

.cancel-button {
  border: 2px solid rgba(108, 117, 125, 0.4);
  color: #6c757d;
}

.cancel-button:hover {
  background: rgba(108, 117, 125, 0.1);
  border-color: rgba(108, 117, 125, 0.6);
  transform: translateY(-1px);
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.field-label {
  display: block;
  color: #555;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Required Field Asterisk */
.required-asterisk {
  color: #e53e3e;
  font-weight: bold;
  margin-left: 2px;
}

/* Custom Input Styling */
.custom-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-input :deep(.v-field:hover) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.custom-input :deep(.v-field--focused) {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(25, 118, 210, 0.6);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.custom-input :deep(.v-field__outline) {
  display: none;
}

/* Spouse Alert */
.spouse-alert {
  margin-bottom: 2rem;
  background: rgba(33, 150, 243, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(33, 150, 243, 0.2);
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
  
  .edit-content-container {
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
  
  .avatar-container {
    align-items: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .back-button {
    flex: 1;
    max-width: 300px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  .update-button,
  .cancel-button {
    min-height: 44px;
    width: 100%;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-item {
    padding: 1.2rem 2rem;
    font-size: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  .form-field {
    margin-bottom: 0.5rem;
  }
  
  .custom-input {
    margin-bottom: 0.5rem;
  }
}

/* Touch-friendly mobile optimizations */
@media (max-width: 768px) and (pointer: coarse) {
  .nav-item {
    min-height: 48px;
    padding: 1.5rem 2rem;
  }
  
  .back-button,
  .update-button,
  .cancel-button {
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
  
  .upload-button {
    min-height: 40px;
    padding: 0.75rem 1rem;
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
  
  .avatar-container {
    align-items: center;
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