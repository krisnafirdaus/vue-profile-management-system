<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <!-- Welcome Hero Section -->
        <v-card class="elevation-8 mb-6" rounded="lg">
          <v-card-text class="pa-8 text-center bg-gradient">
            <v-avatar size="120" class="mb-4 elevation-4">
              <v-img
                :src="userProfile.profileImage || 'https://via.placeholder.com/120'"
                alt="Profile Image"
              ></v-img>
            </v-avatar>
            
            <h1 class="text-h3 font-weight-bold text-white mb-2">
              Welcome back, {{ getUserName() }}!
            </h1>
            
            <p class="text-h6 text-grey-lighten-2 mb-4">
              Your personal profile dashboard
            </p>
            
            <v-btn
              size="large"
              color="white"
              variant="outlined"
              to="/profile"
              class="mr-4"
            >
              <v-icon start>mdi-account</v-icon>
              View Profile
            </v-btn>
            
            <v-btn
              size="large"
              color="white"
              to="/edit-profile"
            >
              <v-icon start>mdi-pencil</v-icon>
              Edit Profile
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Quick Stats -->
        <v-row class="mb-6">
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-4 text-center pa-4" rounded="lg">
              <v-icon size="48" color="primary" class="mb-2">mdi-account-check</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Profile Status</h3>
              <p class="text-body-2 text-grey-darken-1">
                {{ getProfileCompleteness() }}% Complete
              </p>
              <v-progress-linear
                :model-value="getProfileCompleteness()"
                color="primary"
                height="6"
                rounded
              ></v-progress-linear>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-4 text-center pa-4" rounded="lg">
              <v-icon size="48" color="green" class="mb-2">mdi-shield-check</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Security</h3>
              <p class="text-body-2 text-grey-darken-1">Account Secure</p>
              <v-chip color="green" size="small" variant="tonal">
                <v-icon start>mdi-check</v-icon>
                Verified
              </v-chip>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-4 text-center pa-4" rounded="lg">
              <v-icon size="48" color="orange" class="mb-2">mdi-calendar-clock</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Last Login</h3>
              <p class="text-body-2 text-grey-darken-1">{{ formatLastLogin() }}</p>
              <v-chip color="orange" size="small" variant="tonal">
                <v-icon start>mdi-clock</v-icon>
                Recent
              </v-chip>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-4 text-center pa-4" rounded="lg">
              <v-icon size="48" color="purple" class="mb-2">mdi-heart</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Preferences</h3>
              <p class="text-body-2 text-grey-darken-1">{{ getPreferencesCount() }} Set</p>
              <v-chip color="purple" size="small" variant="tonal">
                <v-icon start>mdi-tune</v-icon>
                Active
              </v-chip>
            </v-card>
          </v-col>
        </v-row>

        <!-- Quick Actions -->
        <v-row class="mb-6">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold mb-4">Quick Actions</h2>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="elevation-4 pa-6" rounded="lg" hover>
              <div class="d-flex align-center">
                <v-icon size="48" color="primary" class="mr-4">mdi-account-edit</v-icon>
                <div class="flex-grow-1">
                  <h3 class="text-h6 font-weight-bold mb-1">Update Profile</h3>
                  <p class="text-body-2 text-grey-darken-1 mb-3">
                    Keep your personal information up to date
                  </p>
                  <v-btn color="primary" variant="outlined" to="/edit-profile">
                    Edit Now
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="elevation-4 pa-6" rounded="lg" hover>
              <div class="d-flex align-center">
                <v-icon size="48" color="green" class="mr-4">mdi-eye</v-icon>
                <div class="flex-grow-1">
                  <h3 class="text-h6 font-weight-bold mb-1">View Profile</h3>
                  <p class="text-body-2 text-grey-darken-1 mb-3">
                    Review your complete profile information
                  </p>
                  <v-btn color="green" variant="outlined" to="/profile">
                    View Details
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Recent Activity -->
        <v-card class="elevation-4" rounded="lg">
          <v-card-title class="pa-6 bg-grey-lighten-4">
            <v-icon class="mr-2">mdi-history</v-icon>
            Recent Activity
          </v-card-title>
          
          <v-card-text class="pa-0">
            <v-list>
              <v-list-item class="py-3">
                <template v-slot:prepend>
                  <v-avatar color="primary" size="40">
                    <v-icon color="white">mdi-login</v-icon>
                  </v-avatar>
                </template>
                
                <v-list-item-title>Logged into account</v-list-item-title>
                <v-list-item-subtitle>{{ formatLastLogin() }}</v-list-item-subtitle>
                
                <template v-slot:append>
                  <v-chip color="green" size="small" variant="tonal">
                    Success
                  </v-chip>
                </template>
              </v-list-item>
              
              <v-divider></v-divider>
              
              <v-list-item class="py-3" v-if="lastProfileUpdate">
                <template v-slot:prepend>
                  <v-avatar color="orange" size="40">
                    <v-icon color="white">mdi-account-edit</v-icon>
                  </v-avatar>
                </template>
                
                <v-list-item-title>Profile updated</v-list-item-title>
                <v-list-item-subtitle>{{ lastProfileUpdate }}</v-list-item-subtitle>
                
                <template v-slot:append>
                  <v-chip color="orange" size="small" variant="tonal">
                    Updated
                  </v-chip>
                </template>
              </v-list-item>
              
              <v-divider v-if="lastProfileUpdate"></v-divider>
              
              <v-list-item class="py-3">
                <template v-slot:prepend>
                  <v-avatar color="blue" size="40">
                    <v-icon color="white">mdi-account-plus</v-icon>
                  </v-avatar>
                </template>
                
                <v-list-item-title>Account created</v-list-item-title>
                <v-list-item-subtitle>Welcome to myApp!</v-list-item-subtitle>
                
                <template v-slot:append>
                  <v-chip color="blue" size="small" variant="tonal">
                    Created
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Meta tags for SEO
useHead({
  title: 'Home - myApp',
  meta: [
    { name: 'description', content: 'Welcome to myApp - Your personal profile management dashboard.' },
    { name: 'keywords', content: 'myapp, dashboard, profile, home, personal information' }
  ]
})

// Composables
const api = useApi()
const { getCurrentUser } = useAuth()

// State
const loading = ref(false)
const lastProfileUpdate = ref('')

const userProfile = ref({
  profileImage: '',
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
  homeAddress: '',
  country: '',
  postalCode: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  spouseSalutation: '',
  spouseFirstName: '',
  spouseLastName: '',
  hobbies: '',
  favoriteSports: '',
  preferredMusic: '',
  preferredMovies: '',
})

// Methods
const getUserName = () => {
  if (userProfile.value.firstName && userProfile.value.lastName) {
    return `${userProfile.value.firstName} ${userProfile.value.lastName}`
  }
  return getCurrentUser() || 'User'
}

const getProfileCompleteness = () => {
  const requiredFields = [
    'salutation', 'firstName', 'lastName', 'email', 
    'homeAddress', 'country', 'postalCode', 'dateOfBirth'
  ]
  
  const completedFields = requiredFields.filter(field => {
    const value = userProfile.value[field]
    return value && value.toString().trim() !== ''
  })
  
  return Math.round((completedFields.length / requiredFields.length) * 100)
}

const getPreferencesCount = () => {
  const preferenceFields = ['hobbies', 'favoriteSports', 'preferredMusic', 'preferredMovies']
  return preferenceFields.filter(field => {
    const value = userProfile.value[field]
    return value && value.toString().trim() !== ''
  }).length
}

const formatLastLogin = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadProfile = async () => {
  loading.value = true
  
  try {
    const profileData = await api.getProfile()
    
    // Map API data to userProfile
    Object.keys(userProfile.value).forEach(key => {
      if (profileData[key] !== undefined) {
        userProfile.value[key] = profileData[key]
      }
    })
    
    // Set mock last update time
    lastProfileUpdate.value = 'Recently'
  } catch (error) {
    console.error('Error loading profile:', error)
  } finally {
    loading.value = false
  }
}

// Load profile data on mount
onMounted(() => {
  // Redirect to login page as default landing page
  navigateTo('/login')
})
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.v-card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease-in-out;
}

.v-card[hover]:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .bg-gradient .v-btn {
    display: block;
    width: 100%;
    margin: 8px 0 !important;
  }
}

/* Animation for stats cards */
.v-progress-linear {
  animation: loadProgress 2s ease-in-out;
}

@keyframes loadProgress {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(1);
  }
}

/* Icon animations */
.v-icon {
  transition: transform 0.3s ease;
}

.v-card:hover .v-icon {
  transform: scale(1.1);
}
</style>