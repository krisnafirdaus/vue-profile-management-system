export default defineNuxtRouteMiddleware((to, from) => {
  // If accessing root path, redirect to login
  if (to.path === '/') {
    return navigateTo('/login')
  }
})
