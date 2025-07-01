<template>
  <v-container fluid fill-height class="register-container">
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

    <!-- Header with Logo -->
    <div class="header-section">
      <div class="logo-placeholder">
        <span class="logo-text">LOGO</span>
      </div>
    </div>

    <!-- Main Content -->
    <v-row align="center" justify="center" class="content-wrapper">
      <v-col cols="12" sm="10" md="6" lg="4" xl="3">
        <!-- Welcome Title -->
        <div class="welcome-section">
          <h1 class="welcome-title">Create Account for <span class="app-name">myApp</span></h1>
        </div>

        <!-- Register Form Container -->
        <div class="register-form-container">
          <v-form @submit.prevent="handleRegister" class="register-form">
            <!-- User ID Field -->
            <div class="form-field">
              <label class="field-label">User ID</label>
              <v-text-field
                v-model="form.userId"
                variant="outlined"
                hide-details="auto"
                :error-messages="errors.userId"
                :disabled="loading"
                class="custom-input"
                @blur="validateField('userId')"
              ></v-text-field>
            </div>

            <!-- Password Field -->
            <div class="form-field">
              <label class="field-label">Password</label>
              <v-text-field
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                hide-details="auto"
                :error-messages="errors.password"
                :disabled="loading"
                class="custom-input"
                @blur="validateField('password')"
              >
                <template #append-inner>
                  <v-icon
                    @click="showPassword = !showPassword"
                    class="password-toggle"
                  >
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>
            </div>

            <!-- Confirm Password Field -->
            <div class="form-field">
              <label class="field-label">Confirm Password</label>
              <v-text-field
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                variant="outlined"
                hide-details="auto"
                :error-messages="errors.confirmPassword"
                :disabled="loading"
                class="custom-input"
                @blur="validateField('confirmPassword')"
              >
                <template #append-inner>
                  <v-icon
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="password-toggle"
                  >
                    {{ showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>
            </div>

            <!-- Register Button -->
            <v-btn
              type="submit"
              block
              :loading="loading"
              :disabled="!isFormValid || loading"
              class="register-button"
            >
              CREATE ACCOUNT
            </v-btn>

            <!-- Login Link -->
            <div class="login-section">
              <span class="login-text">
                Already have an account? 
                <nuxt-link to="/login" class="login-link">Sign in here</nuxt-link>
              </span>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>

    <!-- Error Message Bar -->
    <div v-if="errorMessage" class="error-bar">
      {{ errorMessage }}
    </div>

    <!-- Success Message -->
    <v-snackbar
      v-model="showSuccessMessage"
      color="success"
      timeout="3000"
      location="top"
    >
      {{ successMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { registerSchema } from '~/composables/useValidation'

// Use auth layout for cleaner design
definePageMeta({
  layout: 'auth'
})

// Meta tags for SEO
useHead({
  title: 'Register - myApp',
  meta: [
    { name: 'description', content: 'Create a new myApp account to manage your profile and preferences.' },
    { name: 'keywords', content: 'register, signup, myapp, profile, account creation' }
  ]
})

// Composables
const api = useApi()
const router = useRouter()

// Form state
const formRef = ref()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showSuccessMessage = ref(false)

const form = ref({
  userId: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})

// Validation
const validateField = async (field) => {
  try {
    await registerSchema.validateAt(field, form.value)
    errors.value[field] = ''
  } catch (error) {
    errors.value[field] = error.message
  }
}

const validateForm = async () => {
  try {
    await registerSchema.validate(form.value, { abortEarly: false })
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

const isFormValid = computed(() => {
  return form.value.userId.length >= 3 && 
         form.value.password.length >= 6 && 
         form.value.confirmPassword.length >= 6 &&
         form.value.password === form.value.confirmPassword &&
         Object.values(errors.value).every(error => !error)
})

// Watch for error message to hide success
watch(errorMessage, (newVal) => {
  if (newVal) {
    successMessage.value = ''
    showSuccessMessage.value = false
  }
})

// Watch for success message
watch(successMessage, (newVal) => {
  if (newVal) {
    showSuccessMessage.value = true
    errorMessage.value = ''
  }
})

// Watch for form changes to clear errors
watch(form, () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}, { deep: true })

// Register handler
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  const isValid = await validateForm()
  if (!isValid) return

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Your passwords do not match.'
    return
  }

  loading.value = true

  try {
    const response = await api.register(form.value.userId, form.value.password)
    
    if (response.success) {
      successMessage.value = 'Registration successful! Redirecting to login...'
      
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      errorMessage.value = response.message || 'Registration failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Main Container */
.register-container {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  overflow: hidden;
}

/* Bokeh Background */
.bokeh-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.bokeh-circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(2px);
  animation: float 20s infinite ease-in-out;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 25%;
  right: 20%;
  animation-delay: -5s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 35%;
  left: 25%;
  animation-delay: -10s;
}

.circle-4 {
  width: 250px;
  height: 250px;
  bottom: 15%;
  right: 15%;
  animation-delay: -15s;
}

.circle-5 {
  width: 120px;
  height: 120px;
  top: 55%;
  left: 10%;
  animation-delay: -8s;
}

.circle-6 {
  width: 180px;
  height: 180px;
  top: 65%;
  right: 30%;
  animation-delay: -12s;
}

.circle-7 {
  width: 80px;
  height: 80px;
  top: 35%;
  left: 55%;
  animation-delay: -3s;
}

.circle-8 {
  width: 140px;
  height: 140px;
  bottom: 45%;
  left: 65%;
  animation-delay: -18s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) scale(1);
    opacity: 0.7;
  }
  50% { 
    transform: translateY(-20px) scale(1.05);
    opacity: 0.9;
  }
}

/* Header Section */
.header-section {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.logo-placeholder {
  width: 80px;
  height: 40px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.logo-text {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  letter-spacing: 1px;
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 5;
  min-height: 100vh;
}

/* Welcome Section */
.welcome-section {
  text-align: center;
  margin-bottom: 32px;
}

.welcome-title {
  font-size: 2.25rem;
  font-weight: 400;
  color: #333;
  margin: 0;
  line-height: 1.2;
}

.app-name {
  font-weight: 700;
  color: #333;
}

/* Register Form Container */
.register-form-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Form Fields */
.form-field {
  margin-bottom: 24px;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.custom-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: none;
}

.custom-input :deep(.v-field__outline) {
  --v-field-border-color: #e0e0e0;
  --v-field-border-opacity: 1;
}

.custom-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-color: #333;
  --v-field-border-width: 2px;
}

.password-toggle {
  cursor: pointer;
  color: #666;
}

.password-toggle:hover {
  color: #333;
}

/* Register Button */
.register-button {
  background: #333 !important;
  color: white !important;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
  height: 48px;
  border-radius: 8px;
  margin: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.register-button:hover {
  background: #555 !important;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.register-button:disabled {
  background: #ccc !important;
  color: #999 !important;
}

/* Login Section */
.login-section {
  text-align: center;
  margin-top: 24px;
}

.login-text {
  font-size: 14px;
  color: #666;
}

.login-link {
  color: #333;
  font-weight: 500;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

/* Error Bar */
.error-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #d32f2f;
  color: white;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 1.875rem;
  }
  
  .register-form-container {
    padding: 32px 24px;
    margin: 0 16px;
  }
  
  .header-section {
    top: 16px;
    left: 16px;
  }
  
  .logo-placeholder {
    width: 60px;
    height: 32px;
  }
  
  .logo-text {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 1.625rem;
  }
  
  .register-form-container {
    padding: 24px 20px;
    margin: 0 12px;
  }
  
  .bokeh-circle {
    opacity: 0.5;
  }
}
</style>