export const useApi = () => {
  const login = async (userId: string, password: string) => {
    try {
      const response = await $fetch<{ success: boolean; message: string; data?: any }>('/api/login', {
        method: 'POST',
        body: { userId, password }
      })
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userId: string, password: string) => {
    try {
      const response = await $fetch<{ success: boolean; message: string }>('/api/register', {
        method: 'POST',
        body: { userId, password }
      })
      return response
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const getProfile = async () => {
    try {
      const response = await $fetch<{ success: boolean; data: any }>('/api/profile', {
        method: 'GET'
      })
      return response.data
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  }

  const updateProfile = async (profileData: any) => {
    try {
      const response = await $fetch<{ success: boolean; message: string }>('/api/profile', {
        method: 'POST',
        body: profileData
      })
      return response
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  return {
    login,
    register,
    getProfile,
    updateProfile
  }
}
