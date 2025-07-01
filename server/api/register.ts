export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, password } = body

  // Basic validation
  if (!userId || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID and password are required'
    })
  }

  if (userId.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID must be at least 3 characters long'
    })
  }

  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 6 characters long'
    })
  }

  // In a real application, you would:
  // 1. Check if userId already exists in database
  // 2. Hash the password
  // 3. Store user in database
  
  // For demo purposes, we'll simulate these checks
  const existingUsers = ['admin', 'test', 'user']
  
  if (existingUsers.includes(userId)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User ID already exists. Please choose a different one.'
    })
  }

  // Simulate successful registration
  return { 
    success: true, 
    message: 'Registration successful! You can now login with your credentials.' 
  }
})