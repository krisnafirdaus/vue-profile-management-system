import Cookies from 'js-cookie'

export const useAuth = () => {
  const router = useRouter()

  const isLoggedIn = () => {
    if (process.client) {
      return Cookies.get('loggedIn') === 'true'
    }
    return false
  }

  const login = (userId: string, password: string, keepLoggedIn: boolean = false) => {
    // Set cookie with appropriate expiration
    const options = keepLoggedIn 
      ? { expires: 365 } // 1 year
      : {} // Session cookie

    Cookies.set('loggedIn', 'true', options)
    Cookies.set('userId', userId, options)
  }

  const logout = () => {
    Cookies.remove('loggedIn')
    Cookies.remove('userId')
    router.push('/login')
  }

  const getCurrentUser = () => {
    if (process.client) {
      return Cookies.get('userId')
    }
    return null
  }

  return {
    isLoggedIn,
    login,
    logout,
    getCurrentUser
  }
}
