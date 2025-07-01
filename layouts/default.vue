<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mobile-breakpoint="960"
      :permanent="$vuetify.display.lgAndUp"
    >
      <v-list dense nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          value="home"
          to="/index"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-account"
          title="My Profile"
          value="profile"
          to="/profile"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-account-edit"
          title="Edit Profile"
          value="edit-profile"
          to="/edit-profile"
        ></v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          @click="handleLogout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      app
      clipped-left
      color="primary"
      dark
      elevation="4"
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        :class="{ 'd-none': $vuetify.display.lgAndUp }"
      ></v-app-bar-nav-icon>
      
      <v-toolbar-title class="text-h6 font-weight-bold">
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        myApp
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <!-- User info on larger screens -->
      <div v-if="$vuetify.display.mdAndUp" class="d-flex align-center">
        <v-icon class="mr-2">mdi-account</v-icon>
        <span class="text-body-2">Welcome, {{ currentUser || 'User' }}</span>
      </div>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-4">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const drawer = ref(false)
const currentUser = ref('')
const { logout, getCurrentUser } = useAuth()

const handleLogout = () => {
  logout()
}

onMounted(() => {
  currentUser.value = getCurrentUser() || ''
})
</script>

<style scoped>
.v-app-bar-title {
  font-family: 'Roboto', sans-serif;
}

.v-navigation-drawer {
  background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%);
}

.v-list-item {
  border-radius: 8px;
  margin: 4px 8px;
}

.v-list-item--active {
  background: rgba(25, 118, 210, 0.12);
  color: #1976d2;
}

@media (max-width: 960px) {
  .v-container {
    padding: 8px !important;
  }
}
</style>
