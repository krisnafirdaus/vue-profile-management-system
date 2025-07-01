import * as yup from 'yup'

// Login form validation schema
export const loginSchema = yup.object({
  userId: yup.string().required('User ID is required').min(3, 'User ID must be at least 3 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  keepLoggedIn: yup.boolean()
})

// Register form validation schema
export const registerSchema = yup.object({
  userId: yup.string().required('User ID is required').min(3, 'User ID must be at least 3 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .test('passwords-match', 'Your passwords do not match.', function(value) {
      return this.parent.password === value
    })
})

// Profile form validation schema
export const profileSchema = yup.object({
  salutation: yup.string().required('Salutation is required'),
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().required('Email address is required').email('Please enter a valid email address'),
  homeAddress: yup.string().required('Home address is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required'),
  dateOfBirth: yup.date()
    .required('Date of birth is required')
    .test('age', 'You must be at least 17 years old', function(value) {
      if (!value) return false
      const today = new Date()
      const birthDate = new Date(value)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 17
      }
      return age >= 17
    }),
  gender: yup.string().oneOf(['Male', 'Female'], 'Please select a valid gender'),
  maritalStatus: yup.string().oneOf(['Single', 'Married'], 'Please select a valid marital status'),
  spouseSalutation: yup.string().when('maritalStatus', {
    is: 'Married',
    then: schema => schema.required('Spouse salutation is required when married'),
    otherwise: schema => schema.notRequired()
  }),
  spouseFirstName: yup.string().when('maritalStatus', {
    is: 'Married',
    then: schema => schema.required('Spouse first name is required when married'),
    otherwise: schema => schema.notRequired()
  }),
  spouseLastName: yup.string().when('maritalStatus', {
    is: 'Married',
    then: schema => schema.required('Spouse last name is required when married'),
    otherwise: schema => schema.notRequired()
  }),
  hobbies: yup.string(),
  favoriteSports: yup.string(),
  preferredMusic: yup.string(),
  preferredMovies: yup.string()
})

export type LoginForm = yup.InferType<typeof loginSchema>
export type RegisterForm = yup.InferType<typeof registerSchema>
export type ProfileForm = yup.InferType<typeof profileSchema>
