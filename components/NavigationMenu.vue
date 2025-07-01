<template>
  <div class="navigation-menu">
    <!-- Desktop Navigation (Header) -->
    <div class="desktop-nav" v-if="showInHeader">
      <div class="nav-links">
        <nuxt-link to="/home" class="nav-link" :class="{ active: currentRoute === '/home' }">
          <v-icon class="nav-icon">mdi-home</v-icon>
          Home
        </nuxt-link>
        
        <nuxt-link to="/profile" class="nav-link" :class="{ active: currentRoute === '/profile' }">
          <v-icon class="nav-icon">mdi-account</v-icon>
          My Profile
        </nuxt-link>
        
        <nuxt-link to="/edit-profile" class="nav-link" :class="{ active: currentRoute === '/edit-profile' }">
          <v-icon class="nav-icon">mdi-pencil</v-icon>
          Edit Profile
        </nuxt-link>
        
        <a href="#" class="nav-link logout-link" @click.prevent="handleLogout">
          <v-icon class="nav-icon">mdi-logout</v-icon>
          Logout
        </a>
      </div>
    </div>

    <!-- Mobile/Sidebar Navigation -->
    <div class="sidebar-nav" v-if="!showInHeader">
      <nuxt-link to="/home" class="nav-link" :class="{ active: currentRoute === '/home' }" @click="closeSidebar">
        <v-icon class="nav-icon">mdi-home</v-icon>
        Home
      </nuxt-link>
      
      <nuxt-link to="/profile" class="nav-link" :class="{ active: currentRoute === '/profile' }" @click="closeSidebar">
        <v-icon class="nav-icon">mdi-account</v-icon>
        My Profile
      </nuxt-link>
      
      <nuxt-link to="/edit-profile" class="nav-link" :class="{ active: currentRoute === '/edit-profile' }" @click="closeSidebar">
        <v-icon class="nav-icon">mdi-pencil</v-icon>
        Edit Profile
      </nuxt-link>
      
      <a href="#" class="nav-link logout-link" @click.prevent="handleLogout">
        <v-icon class="nav-icon">mdi-logout</v-icon>
        Logout
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  showInHeader: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close-sidebar', 'logout'])

// Composables
const router = useRouter()
const route = useRoute()

// Computed
const currentRoute = computed(() => route.path)

// Methods
const closeSidebar = () => {
  emit('close-sidebar')
}

const handleLogout = () => {
  // Remove login cookie
  const loggedInCookie = useCookie('loggedIn')
  const userIdCookie = useCookie('userId')
  loggedInCookie.value = null
  userIdCookie.value = null
  
  // Redirect to login
  router.push('/login')
  emit('logout')
}
</script>

<style scoped>
.navigation-menu {
  width: 100%;
}

/* Desktop Navigation (Header) */
.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.desktop-nav .nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.desktop-nav .nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #333;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.desktop-nav .nav-link.active {
  background: rgba(25, 118, 210, 0.15);
  color: #1976d2;
  font-weight: 600;
  border-color: rgba(25, 118, 210, 0.3);
}

.desktop-nav .nav-link.logout-link {
  color: #d32f2f;
  border-color: rgba(211, 47, 47, 0.3);
}

.desktop-nav .nav-link.logout-link:hover {
  background: rgba(211, 47, 47, 0.15);
  color: #d32f2f;
  border-color: rgba(211, 47, 47, 0.4);
}

/* Sidebar Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.sidebar-nav .nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #333;
  transform: translateX(4px);
}

.sidebar-nav .nav-link.active {
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
  font-weight: 600;
}

.sidebar-nav .nav-link.logout-link {
  color: #d32f2f;
}

.sidebar-nav .nav-link.logout-link:hover {
  background: rgba(211, 47, 47, 0.1);
  color: #d32f2f;
}

.nav-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.desktop-nav .nav-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}

@media (min-width: 769px) {
  .sidebar-nav {
    display: none;
  }
}

/* Touch-friendly mobile optimizations */
@media (max-width: 768px) and (pointer: coarse) {
  .sidebar-nav .nav-link {
    min-height: 48px;
    padding: 1.2rem 1rem;
    font-size: 1rem;
  }
  
  .nav-icon {
    font-size: 1.3rem;
  }
}
</style>
