export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, password } = body

  // In a real application, you would check against a database
  // For demo purposes, we'll accept a few test accounts
  const validAccounts = [
    { userId: 'test', password: 'password' },
    { userId: 'john.doe', password: 'password123' },
    { userId: 'demo', password: 'demo123' }
  ]

  const account = validAccounts.find(acc => acc.userId === userId && acc.password === password)

  if (account) {
    return { 
      success: true, 
      message: 'Login successful',
      data: {
        userId: account.userId,
        lastLogin: new Date().toISOString()
      }
    }
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Your user ID and/or password does not match.'
    })
  }
})