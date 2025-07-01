<template>
  <v-app>
    <!-- Main Content Only - No Sidebar or App Bar -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
// Empty layout for pages that handle their own navigation
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
</style>
