export default defineNuxtRouteMiddleware((to, from) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  
  if (process.client) {
    const { isLoggedIn } = useAuth()
    const loggedIn = isLoggedIn()
    
    if (authRequired && !loggedIn) {
      return navigateTo('/login')
    }
    
    // Redirect logged-in users away from auth pages
    if (loggedIn && publicPages.includes(to.path)) {
      return navigateTo('/profile')
    }
  }
})
