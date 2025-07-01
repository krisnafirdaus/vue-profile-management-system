<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style>
