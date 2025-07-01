<template>
  <div>
    <h1>Simple Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="userId" placeholder="User ID" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userId = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt:', { userId: userId.value, password: password.value })
}
</script>
